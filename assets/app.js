(function () {

const lessons = window.LESSONS;
const { runPython, getPyodide } = window.PyRunner;

const $ = (sel) => document.querySelector(sel);
const main = $("#main");
const store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
    catch { return fallback; }
  },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } },
  remove(key) { try { localStorage.removeItem(key); } catch { /* private mode */ } },
};

/* ------------------------------------------------------------------ theme */

const savedTheme = store.get("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
else if (matchMedia("(prefers-color-scheme: dark)").matches) document.documentElement.dataset.theme = "dark";

$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("theme", next);
});

/* --------------------------------------------------------------- sidebar */

const sidebar = $("#sidebar");
const scrim = $("#scrim");

function closeNav() {
  sidebar.classList.remove("open");
  scrim.hidden = true;
  $("#navToggle").setAttribute("aria-expanded", "false");
}
$("#navToggle").addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  scrim.hidden = !open;
  $("#navToggle").setAttribute("aria-expanded", String(open));
});
scrim.addEventListener("click", closeNav);

$("#chapterList").innerHTML = lessons
  .map((l) => `<li><a href="#/lesson/${l.id}" data-id="${l.id}"><span class="num">${l.no}</span><span>${l.title}</span></a></li>`)
  .join("");

function markActive(id) {
  document.querySelectorAll("#chapterList a").forEach((a) => {
    a.classList.toggle("active", a.dataset.id === id);
  });
  // ไฮไลต์ลิงก์ท้ายเมนู และให้ "สอบมิดเทอม" สว่างค้างไว้ขณะอยู่ในหน้าย่อยของข้อสอบ
  const hash = location.hash || "#/";
  document.querySelectorAll(".side-link").forEach((a) => {
    const href = a.getAttribute("href");
    const onExam = hash.startsWith("#/exam") && href === "#/exam";
    // #/exam/choice/3 ก็ยังถือว่าอยู่ในลิงก์ย่อย #/exam/choice
    const onSub = href !== "#/exam" && hash.startsWith(href);
    a.classList.toggle("active", href === hash || onExam || onSub);
  });
}

/* -------------------------------------------------------------- progress */

const completedKey = "completed";
function completed() {
  return new Set(JSON.parse(store.get(completedKey, "[]")));
}
function markCompleted(lessonId) {
  const set = completed();
  if (set.has(lessonId)) return;
  set.add(lessonId);
  store.set(completedKey, JSON.stringify([...set]));
  renderProgress();
}
function renderProgress() {
  const pct = Math.round((completed().size / lessons.length) * 100);
  $("#progressBar").style.width = pct + "%";
  $("#progressText").textContent = pct + "%";
}
renderProgress();

/* ------------------------------------------------------------ playground */

let pgSeq = 0;

/**
 * Builds an editor + output panel and wires up the run button.
 * `key` makes edits persistent across reloads; omit it for throwaway panels.
 */
function createPlayground({ key, title = "ตัวอย่างโค้ด", code = "", stdin = "", files = null, lessonId = null }) {
  const uid = `pg${++pgSeq}`;
  const storeKey = key ? `code:${key}` : null;
  const needsStdin = /\binput\s*\(/.test(code) || stdin.length > 0;

  const wrap = document.createElement("div");
  wrap.className = "pg";
  wrap.innerHTML = `
    <div class="pg-head">
      <span class="pg-title">${escapeHtml(title)}</span>
      <button class="btn primary" data-act="run">▶ รัน</button>
      <button class="btn" data-act="clear">ล้างผล</button>
      ${storeKey ? '<button class="btn" data-act="reset">รีเซ็ตโค้ด</button>' : ""}
    </div>
    <div class="pg-body">
      <div class="pg-left">
        <div class="editor-host" id="${uid}"></div>
      </div>
      <div class="pg-right">
        ${needsStdin ? `
          <div class="io-label">ข้อมูลนำเข้า (stdin) — บรรทัดละ 1 ค่า</div>
          <textarea class="stdin-box" spellcheck="false">${escapeHtml(stdin)}</textarea>` : ""}
        <div class="io-label">ผลลัพธ์</div>
        <pre class="output"></pre>
      </div>
    </div>`;

  const host = wrap.querySelector(".editor-host");
  const output = wrap.querySelector(".output");
  const stdinBox = wrap.querySelector(".stdin-box");
  const runBtn = wrap.querySelector('[data-act="run"]');

  const initial = (storeKey && store.get(storeKey)) ?? code;
  const editor = createEditor(host, initial);

  // CodeMirror can only lay itself out once it has a size on screen, and it is built here before
  // `wrap` is attached. Without a re-measure it renders as a single blank line. rAF alone is not
  // enough: it never fires while the tab is hidden, so a page opened in a background tab would
  // stay broken. The timer covers that case; <details> and tab-visibility are handled separately.
  requestAnimationFrame(() => editor.refresh());
  setTimeout(() => editor.refresh(), 0);
  wrap._editor = editor;

  const persist = () => storeKey && store.set(storeKey, editor.getValue());
  editor.onChange(persist);

  const append = (text, kind) => {
    const span = document.createElement("span");
    if (kind === "err") span.className = "o-err";
    else if (kind === "in") span.className = "o-in";
    span.textContent = text;
    output.appendChild(span);
    output.scrollTop = output.scrollHeight;
  };

  async function run() {
    output.textContent = "";
    runBtn.disabled = true;
    runBtn.textContent = "กำลังรัน…";
    const started = performance.now();
    try {
      await runPython(editor.getValue(), {
        stdin: stdinBox ? stdinBox.value : "",
        files,
        onWrite: append,
      });
      if (lessonId) markCompleted(lessonId);
    } catch (err) {
      append(`\nโหลด Python ไม่สำเร็จ: ${err.message}\n→ ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง\n`, "err");
    } finally {
      const ms = Math.round(performance.now() - started);
      append(`\n[จบการทำงาน · ${ms} ms]\n`, "meta-done");
      output.lastChild.className = "o-meta";
      runBtn.disabled = false;
      runBtn.textContent = "▶ รัน";
    }
  }

  runBtn.addEventListener("click", run);
  wrap.querySelector('[data-act="clear"]').addEventListener("click", () => { output.textContent = ""; });
  wrap.querySelector('[data-act="reset"]')?.addEventListener("click", () => {
    editor.setValue(code);
    store.remove(storeKey);
    if (stdinBox) stdinBox.value = stdin;
    output.textContent = "";
  });
  editor.onRunShortcut(run);

  return wrap;
}

/** CodeMirror when the CDN is reachable, a Tab-aware textarea when it is not. */
function createEditor(host, value) {
  if (globalThis.CodeMirror) {
    const cm = CodeMirror(host, {
      value,
      mode: "python",
      theme: "material-darker",
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      autoCloseBrackets: true,
      viewportMargin: Infinity,
    });
    return {
      getValue: () => cm.getValue(),
      setValue: (v) => { cm.setValue(v); cm.refresh(); },
      refresh: () => cm.refresh(),
      onChange: (fn) => cm.on("change", fn),
      onRunShortcut: (fn) => cm.setOption("extraKeys", {
        "Ctrl-Enter": fn,
        "Cmd-Enter": fn,
        Tab: (c) => c.execCommand("indentMore"),
        "Shift-Tab": (c) => c.execCommand("indentLess"),
      }),
    };
  }

  const ta = document.createElement("textarea");
  ta.className = "fallback-editor";
  ta.spellcheck = false;
  ta.value = value;
  host.appendChild(ta);
  ta.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const { selectionStart: s, selectionEnd: t } = ta;
    ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(t);
    ta.selectionStart = ta.selectionEnd = s + 4;
  });
  return {
    getValue: () => ta.value,
    setValue: (v) => { ta.value = v; },
    refresh: () => {},
    onChange: (fn) => ta.addEventListener("input", fn),
    onRunShortcut: (fn) => ta.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); fn(); }
    }),
  };
}

/** An editor built inside a collapsed <details> has no size yet, so re-measure it when it opens. */
function wireDetailsRefresh(root) {
  root.querySelectorAll("details.hint").forEach((d) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      d.querySelectorAll(".pg").forEach((pg) => pg._editor && pg._editor.refresh());
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* ----------------------------------------------------------------- views */

function renderHome() {
  markActive(null);
  main.innerHTML = `
    <h1>เรียน Python จากวิชา 618240</h1>
    <p class="lede">โครงสร้างข้อมูลและอัลกอริทึม — บทเรียน 7 บท
    พร้อมโค้ดตัวอย่างที่<strong>แก้ไขและกดรันได้จริงในหน้าเว็บ</strong> ไม่ต้องติดตั้ง Python</p>

    <div class="note">
      <strong>ที่มาของเนื้อหา</strong> — บทที่ 4-7 ใช้โค้ดที่<strong>คัดจากเอกสารบรรยายโดยตรง</strong>
      ส่วนบทที่ 1-3 เป็นเนื้อหาที่เรียบเรียงขึ้นเองให้ครอบคลุมหัวข้อเดียวกับบรรยาย 1-3
      เวลาทบทวนก่อนสอบให้ยึดเอกสารบรรยายของอาจารย์เป็นหลักเสมอ
    </div>

    <h2>บทเรียน</h2>
    <div class="card-grid">
      ${lessons.map((l) => `
        <a class="card" href="#/lesson/${l.id}">
          <span class="card-no">บทที่ ${l.no}</span>
          <h3>${l.title}</h3>
          <p>${l.summary}</p>
        </a>`).join("")}
    </div>

    <h2>วิธีใช้งาน</h2>
    <ul>
      <li>ทุกกล่องโค้ดแก้ไขได้ กด <strong>▶ รัน</strong> หรือ <code>Ctrl+Enter</code> เพื่อดูผลลัพธ์</li>
      <li>โค้ดที่ใช้ <code>input()</code> จะมีช่อง <strong>ข้อมูลนำเข้า (stdin)</strong> ให้พิมพ์ค่าล่วงหน้า บรรทัดละ 1 ค่า</li>
      <li>โค้ดที่แก้จะถูกจำไว้ในเบราว์เซอร์ กด <strong>รีเซ็ตโค้ด</strong> เพื่อกลับเป็นตัวอย่างเดิม</li>
      <li>อยากลองโค้ดอิสระ ไปที่ <a href="#/playground">Playground</a></li>
      <li>เรียนครบแล้วลองทำ <a href="#/exam">สอบมิดเทอม</a> — ปรนัย 18 ข้อพร้อมเฉลยรายข้อ และอัตนัย 3 ข้อ</li>
    </ul>

    <div class="note warn">
      <strong>ข้อควรระวัง:</strong> Python ทำงานบนหน้าเว็บนี้โดยตรง ถ้าเขียนลูปไม่รู้จบ
      (เช่น <code>while True:</code> ที่ไม่มี <code>break</code>) หน้าเว็บจะค้าง ต้องรีเฟรชหน้าใหม่
    </div>`;
}

function renderLesson(id) {
  const idx = lessons.findIndex((l) => l.id === id);
  if (idx === -1) return renderNotFound();
  const lesson = lessons[idx];
  markActive(id);

  main.innerHTML = `
    <span class="card-no">บทที่ ${lesson.no}</span>
    <h1>${lesson.title}</h1>
    <p class="lede">${lesson.summary}</p>
    <div class="goals">
      <h3>ผลลัพธ์การเรียนรู้</h3>
      <ul>${lesson.goals.map((g) => `<li>${g}</li>`).join("")}</ul>
    </div>
    <div id="sections"></div>
    <h2>แบบฝึกหัดท้ายบท</h2>
    <div id="exercises"></div>
    <nav class="chapter-nav">
      ${idx > 0 ? `<a href="#/lesson/${lessons[idx - 1].id}"><small>← บทก่อนหน้า</small>${lessons[idx - 1].title}</a>` : "<span></span>"}
      ${idx < lessons.length - 1 ? `<a class="next" href="#/lesson/${lessons[idx + 1].id}"><small>บทถัดไป →</small>${lessons[idx + 1].title}</a>` : "<span></span>"}
    </nav>`;

  const sectionsEl = $("#sections");
  lesson.sections.forEach((sec, si) => {
    const block = document.createElement("section");
    block.innerHTML = `<h2>${sec.heading}</h2>${sec.body || ""}`;
    sectionsEl.appendChild(block);
    (sec.examples || []).forEach((ex, ei) => {
      block.appendChild(createPlayground({
        key: `${lesson.id}.${si}.${ei}`,
        title: ex.title,
        code: ex.code,
        stdin: ex.stdin || "",
        files: ex.files || null,
        lessonId: lesson.id,
      }));
    });
  });

  const exEl = $("#exercises");
  lesson.exercises.forEach((ex, i) => {
    const box = document.createElement("div");
    box.className = "exercise";
    box.innerHTML = `<h3>ข้อ ${i + 1}. ${ex.prompt}</h3>`;
    box.appendChild(createPlayground({
      key: `${lesson.id}.ex.${i}`,
      title: "เขียนคำตอบของคุณ",
      code: ex.starter,
      stdin: ex.stdin || "",
      files: ex.files || null,
      lessonId: lesson.id,
    }));
    if (ex.solution) {
      const hint = document.createElement("details");
      hint.className = "hint";
      hint.innerHTML = `<summary>ดูเฉลย</summary><pre>${escapeHtml(ex.solution)}</pre>`;
      box.appendChild(hint);
    }
    exEl.appendChild(box);
  });

  wireDetailsRefresh(main);
}

function renderPlayground() {
  markActive(null);
  main.innerHTML = `
    <h1>Playground</h1>
    <p class="lede">พื้นที่เขียนโค้ด Python อิสระ โค้ดจะถูกจำไว้ในเบราว์เซอร์</p>
    <div id="pgHost"></div>`;
  $("#pgHost").appendChild(createPlayground({
    key: "free",
    title: "โค้ดของคุณ",
    code: `# เขียนโค้ด Python อะไรก็ได้ตรงนี้ แล้วกด ▶ รัน (หรือ Ctrl+Enter)\n\nname = input("คุณชื่ออะไร: ")\nprint("สวัสดี", name)\n\nfor i in range(1, 6):\n    print(i, "x 7 =", i * 7)\n`,
    stdin: "สมชาย",
  }));
}

/**
 * คำตอบปรนัยที่เลือกไว้ แยกเก็บรายบท และเก็บนอกฟังก์ชัน render
 * เพื่อไม่ให้หายเมื่อสลับไปบทอื่นหรือไปหน้าอัตนัยแล้วกลับมา
 */
const examState = { picked: {}, graded: {} };

function examTotalChoices() {
  return window.EXAM.choicesByChapter.reduce((sum, c) => sum + c.questions.length, 0);
}

function examHeader(active) {
  const { written } = window.EXAM;
  return `
    <span class="card-no">ข้อสอบ</span>
    <h1>สอบมิดเทอม</h1>
    <p class="lede">ครอบคลุมเนื้อหาบทที่ 1-7 แบ่งเป็นปรนัยบทละ 20 ข้อ (รวม ${examTotalChoices()} ข้อ)
    และอัตนัย ${written.length} ข้อ</p>
    <p class="note warn"><strong>ข้อควรทราบ</strong> — ข้อสอบชุดนี้ยัง<strong>ไม่ได้ปรับให้ตรงกับโค้ดในเอกสารบรรยาย</strong>
    บางข้อในบทที่ 4-7 อ้างอิงโค้ดคนละแบบกับที่อาจารย์สอน (เช่น Bubble Sort และ Merge Sort)
    ใช้ฝึกความเข้าใจได้ แต่อย่ายึดเป็นคำตอบของวิชานี้ ให้เทียบกับ<a href="#/lesson/sorting">บทเรียนบทที่ 4-7</a> ซึ่งแก้ให้ตรงสไลด์แล้ว</p>
    <div class="tabs">
      <a class="tab ${active === "choice" ? "is-active" : ""}" href="#/exam/choice">
        ส่วนที่ 1 · ปรนัย <span class="tab-count">${examTotalChoices()} ข้อ</span>
      </a>
      <a class="tab ${active === "written" ? "is-active" : ""}" href="#/exam/written">
        ส่วนที่ 2 · อัตนัย <span class="tab-count">${written.length} ข้อ</span>
      </a>
    </div>`;
}

/** แถบเลือกบทของข้อปรนัย พร้อมจุดบอกว่าบทไหนตรวจไปแล้ว */
function examChapterNav(activeCh) {
  return `<div class="ch-nav">${window.EXAM.choicesByChapter.map((c) => `
    <a class="ch-pill ${c.ch === activeCh ? "is-active" : ""} ${examState.graded[c.ch] ? "is-done" : ""}"
       href="#/exam/choice/${c.ch}" title="${escapeHtml(c.title)}">บทที่ ${c.ch}</a>`).join("")}</div>`;
}

function renderExamChoice(chParam) {
  markActive(null);
  const groups = window.EXAM.choicesByChapter;
  const group = groups.find((g) => String(g.ch) === String(chParam)) || groups[0];
  const choices = group.questions;
  const ch = group.ch;

  if (!examState.picked[ch] || examState.picked[ch].length !== choices.length) {
    examState.picked[ch] = new Array(choices.length).fill(null);
    examState.graded[ch] = false;
  }

  const idx = groups.indexOf(group);
  const prev = groups[idx - 1];
  const next = groups[idx + 1];

  main.innerHTML = `
    ${examHeader("choice")}
    ${examChapterNav(ch)}
    <h2 class="ch-title">บทที่ ${ch} — ${escapeHtml(group.title)}
      <span class="tab-count">${choices.length} ข้อ</span></h2>
    <div class="note">
      เลือกคำตอบให้ครบแล้วกด <strong>ตรวจคำตอบ</strong> เพื่อดูคะแนนและคำอธิบายรายข้อ
      แต่ละบทตรวจแยกกัน และคำตอบที่เลือกไว้จะไม่หายเมื่อสลับไปบทอื่น
    </div>
    <div id="mcqList"></div>
    <div class="exam-bar">
      <button id="gradeBtn" class="btn primary">ตรวจคำตอบบทที่ ${ch}</button>
      <button id="resetExamBtn" class="btn">เริ่มทำบทนี้ใหม่</button>
      <span id="scoreBox" class="score-box"></span>
    </div>
    <nav class="chapter-nav">
      ${prev ? `<a href="#/exam/choice/${prev.ch}"><small>← ปรนัยบทก่อนหน้า</small>บทที่ ${prev.ch} ${escapeHtml(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a class="next" href="#/exam/choice/${next.ch}"><small>ปรนัยบทถัดไป →</small>บทที่ ${next.ch} ${escapeHtml(next.title)}</a>` : "<span></span>"}
    </nav>`;

  const mcqEl = $("#mcqList");
  const picked = examState.picked[ch];

  choices.forEach((q, qi) => {
    const card = document.createElement("div");
    card.className = "mcq";
    card.innerHTML = `
      <div class="mcq-head">
        <span class="mcq-no">ข้อ ${qi + 1}</span>
        <span class="tag lv-${q.level}">${q.level}</span>
      </div>
      <div class="mcq-q">${q.q}</div>
      <div class="mcq-options">
        ${q.options.map((opt, oi) => `
          <button class="opt" data-oi="${oi}">
            <span class="opt-key">${"กขคง"[oi]}</span>
            <span class="opt-text">${opt}</span>
          </button>`).join("")}
      </div>
      <div class="mcq-why" hidden><strong>เฉลย:</strong> ${q.why}</div>`;

    card.querySelectorAll(".opt").forEach((btn) => {
      if (Number(btn.dataset.oi) === picked[qi]) btn.classList.add("picked");
      btn.addEventListener("click", () => {
        if (examState.graded[ch]) return;
        picked[qi] = Number(btn.dataset.oi);
        card.querySelectorAll(".opt").forEach((b) => b.classList.toggle("picked", b === btn));
      });
    });
    mcqEl.appendChild(card);
  });

  function grade() {
    examState.graded[ch] = true;
    let score = 0;
    [...mcqEl.children].forEach((card, qi) => {
      const q = choices[qi];
      const correct = picked[qi] === q.answer;
      if (correct) score++;
      card.querySelectorAll(".opt").forEach((btn) => {
        const oi = Number(btn.dataset.oi);
        if (oi === q.answer) btn.classList.add("correct");
        else if (oi === picked[qi]) btn.classList.add("wrong");
      });
      card.classList.add(correct ? "is-correct" : "is-wrong");
      card.querySelector(".mcq-why").hidden = false;
    });
    const pct = Math.round((score / choices.length) * 100);
    $("#scoreBox").textContent = `ได้ ${score} / ${choices.length} คะแนน (${pct}%)`;
    $("#scoreBox").dataset.pass = pct >= 50 ? "yes" : "no";
    $("#gradeBtn").disabled = true;
  }

  $("#gradeBtn").addEventListener("click", () => {
    grade();
    // อัปเดตจุดบอกสถานะบนแถบเลือกบท
    $(".ch-nav a.is-active").classList.add("is-done");
  });
  $("#resetExamBtn").addEventListener("click", () => {
    examState.picked[ch] = null;
    examState.graded[ch] = false;
    renderExamChoice(ch);
  });

  // กลับมาบทนี้หลังตรวจไปแล้ว ให้แสดงผลการตรวจเดิมทันที
  if (examState.graded[ch]) grade();
}

function renderExamWritten() {
  markActive(null);
  const { written } = window.EXAM;

  main.innerHTML = `
    ${examHeader("written")}
    <div class="note">
      เขียนคำตอบในกล่องแล้วกด <strong>▶ รัน</strong> เพื่อตรวจสอบด้วยตัวเองก่อน
      แล้วจึงกด <strong>ดูเฉลย</strong> — เฉลยทุกข้ออิงโค้ดจากเอกสารบรรยาย และกดรันดูผลลัพธ์ได้
      <br>ข้อที่ติดป้าย <span class="tag extra">เพิ่มเติมเพื่อออก</span>
      คือโจทย์ที่เพิ่มเข้ามาจากเนื้อหาบทที่ 4-7
    </div>
    <div id="writtenList"></div>`;

  const wEl = $("#writtenList");
  written.forEach((item, wi) => {
    const box = document.createElement("div");
    box.className = "written";
    box.innerHTML = `
      <div class="mcq-head">
        <span class="mcq-no">${escapeHtml(item.title)}</span>
        ${item.extra ? `<span class="tag extra">เพิ่มเติมเพื่อออก</span>` : ""}
        <span class="tag">บทที่ ${item.ch}</span>
      </div>
      ${item.prompt}`;
    if (item.extra) box.classList.add("is-extra");

    if (item.type === "code") {
      box.appendChild(createPlayground({
        key: `exam.w${wi}`,
        title: "เขียนคำตอบของคุณ",
        code: item.starter,
      }));
      const sol = document.createElement("details");
      sol.className = "hint";
      sol.innerHTML = `<summary>ดูเฉลย</summary>`;
      const solBody = document.createElement("div");
      solBody.innerHTML = item.note ? `<p class="note">${item.note}</p>` : "";
      sol.appendChild(createPlayground({ title: "เฉลย (กดรันดูผลลัพธ์ได้)", code: item.solution }));
      sol.appendChild(solBody);
      box.appendChild(sol);
    } else {
      // ข้อ "ตอบผลการรัน" — ให้เขียนคำตอบก่อน แล้วค่อยเปิดเฉลยพร้อมโค้ดที่รันได้
      box.insertAdjacentHTML("beforeend", `
        <pre class="exam-code">${escapeHtml(item.code)}</pre>
        <div class="io-label">เขียนผลการรันที่คุณคิดว่าจะได้</div>
        <textarea class="answer-box" spellcheck="false" placeholder="พิมพ์ผลลัพธ์ที่คาดว่าจะแสดงออกมา บรรทัดต่อบรรทัด"></textarea>`);
      const answerBox = box.querySelector(".answer-box");
      const aKey = `exam.answer.${wi}`;
      answerBox.value = store.get(aKey, "");
      answerBox.addEventListener("input", () => store.set(aKey, answerBox.value));

      const sol = document.createElement("details");
      sol.className = "hint";
      sol.innerHTML = `<summary>ดูเฉลย</summary>
        <p><strong>ผลลัพธ์ที่ถูกต้อง</strong></p>
        <pre>${escapeHtml(item.expected)}</pre>
        ${item.explain}
        <p><strong>ลองรันดูเองเพื่อยืนยัน</strong></p>`;
      sol.appendChild(createPlayground({ title: "โค้ดในโจทย์", code: item.code }));
      box.appendChild(sol);
    }
    wEl.appendChild(box);
  });

  wireDetailsRefresh(main);
}

function renderCheatsheet() {
  markActive(null);
  main.innerHTML = `
    <h1>สรุปคำสั่งที่ใช้บ่อย</h1>
    <p class="lede">รวมไวยากรณ์หลักจากทั้ง 7 บท ไว้เปิดดูเร็ว ๆ ระหว่างทำแบบฝึกหัด</p>

    <h2>ชนิดข้อมูลและตัวแปร</h2>
    <table class="tbl">
      <tr><th>คำสั่ง</th><th>ความหมาย</th></tr>
      <tr><td><code>type(x)</code></td><td>ดูชนิดข้อมูลของ <code>x</code></td></tr>
      <tr><td><code>int(s)</code> <code>float(s)</code> <code>str(n)</code></td><td>แปลงชนิดข้อมูล</td></tr>
      <tr><td><code>eval(input())</code></td><td>รับค่าจากผู้ใช้แล้วแปลงเป็นตัวเลข</td></tr>
      <tr><td><code>abs()</code> <code>round()</code> <code>len()</code></td><td>ค่าสัมบูรณ์ / ปัดเศษ / ความยาว</td></tr>
    </table>

    <h2>สตริง</h2>
    <table class="tbl">
      <tr><th>คำสั่ง</th><th>ความหมาย</th></tr>
      <tr><td><code>s[0]</code> <code>s[-1]</code></td><td>อักษรตัวแรก / ตัวสุดท้าย</td></tr>
      <tr><td><code>s[m:n]</code></td><td>ตัดช่วง ตั้งแต่ <code>m</code> ถึง <code>n-1</code></td></tr>
      <tr><td><code>s.upper()</code> <code>s.lower()</code></td><td>ตัวพิมพ์ใหญ่ / เล็ก</td></tr>
      <tr><td><code>s.strip()</code> <code>s.split()</code></td><td>ตัดช่องว่าง / แยกเป็น list</td></tr>
      <tr><td><code>s.count('p')</code> <code>s.capitalize()</code></td><td>นับตัวอักษร / ขึ้นต้นด้วยตัวใหญ่</td></tr>
    </table>

    <h2>โครงสร้างควบคุม</h2>
    <table class="tbl">
      <tr><th>รูปแบบ</th><th>ความหมาย</th></tr>
      <tr><td><code>if / elif / else</code></td><td>เลือกทางเดินของโปรแกรม</td></tr>
      <tr><td><code>while &lt;เงื่อนไข&gt;:</code></td><td>วนซ้ำจนเงื่อนไขเป็นเท็จ</td></tr>
      <tr><td><code>for i in range(n):</code></td><td>วนซ้ำ <code>n</code> รอบ (0 ถึง n-1)</td></tr>
      <tr><td><code>break</code> / <code>continue</code></td><td>ออกจากลูป / ข้ามไปรอบถัดไป</td></tr>
    </table>

    <h2>List</h2>
    <table class="tbl">
      <tr><th>คำสั่ง</th><th>ความหมาย</th></tr>
      <tr><td><code>a.append(x)</code></td><td>เพิ่มสมาชิกท้าย list</td></tr>
      <tr><td><code>a.pop()</code> <code>a.remove(x)</code></td><td>เอาตัวท้ายออก / เอาค่า x ออก</td></tr>
      <tr><td><code>min(a)</code> <code>max(a)</code> <code>sum(a)</code></td><td>ค่าน้อยสุด / มากสุด / ผลรวม</td></tr>
      <tr><td><code>len(a)</code> <code>a[i]</code></td><td>จำนวนสมาชิก / สมาชิกตำแหน่ง i</td></tr>
    </table>

    <h2>ฟังก์ชันและคลาส</h2>
    <table class="tbl">
      <tr><th>รูปแบบ</th><th>ความหมาย</th></tr>
      <tr><td><code>def f(a, b): return a + b</code></td><td>สร้างฟังก์ชันรับ 2 ค่า คืน 1 ค่า</td></tr>
      <tr><td><code>return x, y</code></td><td>คืนค่าหลายค่าพร้อมกัน</td></tr>
      <tr><td><code>global x</code></td><td>ขอใช้ตัวแปร global ในฟังก์ชัน</td></tr>
      <tr><td><code>class C:</code> + <code>def __init__(self, ...)</code></td><td>สร้างคลาสและ constructor</td></tr>
      <tr><td><code>if __name__ == '__main__':</code></td><td>โค้ดส่วนเริ่มต้นโปรแกรม</td></tr>
    </table>

    <h2>อัลกอริทึมในวิชานี้</h2>
    <table class="tbl">
      <tr><th>อัลกอริทึม</th><th>ความเร็ว</th><th>แนวคิด</th></tr>
      <tr><td>Bubble Sort</td><td>O(n²)</td><td>เทียบคู่ติดกัน สลับถ้าผิดลำดับ</td></tr>
      <tr><td>Selection Sort</td><td>O(n²)</td><td>หาตัวเล็กสุดมาไว้หน้า</td></tr>
      <tr><td>Insertion Sort</td><td>O(n²)</td><td>แทรกไพ่ใบใหม่ในมือที่เรียงแล้ว</td></tr>
      <tr><td>Merge Sort</td><td>O(n log n)</td><td>แบ่งครึ่ง เรียงแต่ละครึ่ง แล้วรวม</td></tr>
    </table>`;
}

function renderNotFound() {
  markActive(null);
  main.innerHTML = `<h1>ไม่พบหน้านี้</h1><p><a href="#/">กลับไปหน้าแรก</a></p>`;
}

/* ---------------------------------------------------------------- router */

function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [, section, param, sub] = hash.split("/");

  if (section === "lesson" && param) renderLesson(param);
  else if (section === "exam") {
    if (param === "written") renderExamWritten();
    else renderExamChoice(sub);
  }
  else if (section === "playground") renderPlayground();
  else if (section === "cheatsheet") renderCheatsheet();
  else if (!section) renderHome();
  else renderNotFound();

  closeNav();
  main.scrollTop = 0;
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();

// Editors built while the tab was hidden could not measure themselves; fix them once it is shown.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) return;
  document.querySelectorAll(".pg").forEach((pg) => pg._editor && pg._editor.refresh());
});

// Warm up the interpreter while the reader is still reading, so the first Run feels instant.
if (window.requestIdleCallback) requestIdleCallback(() => getPyodide().catch(() => {}), { timeout: 4000 });
else setTimeout(() => getPyodide().catch(() => {}), 2500);

})();
