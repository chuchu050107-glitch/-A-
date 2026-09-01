(function () {

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;
const statusEl = () => document.getElementById("pyStatus");

function setStatus(state, text) {
  const el = statusEl();
  if (!el) return;
  el.dataset.state = state;
  el.textContent = text;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`โหลดสคริปต์ไม่สำเร็จ: ${src}`));
    document.head.appendChild(s);
  });
}

/** Streams from Pyodide arrive as raw bytes; a decoder kept across calls survives split characters. */
const decoder = new TextDecoder("utf-8");

/** Set by runPython for the duration of one run, so the stream handlers know where to write. */
let sink = null;

function getPyodide() {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    setStatus("loading", "Python: กำลังโหลด…");
    await loadScript(PYODIDE_URL + "pyodide.js");
    const pyodide = await globalThis.loadPyodide({ indexURL: PYODIDE_URL });

    pyodide.setStdout({
      write(buf) {
        sink?.write(decoder.decode(buf, { stream: true }), "out");
        return buf.length;
      },
    });
    pyodide.setStderr({
      write(buf) {
        sink?.write(decoder.decode(buf, { stream: true }), "err");
        return buf.length;
      },
    });
    pyodide.setStdin({
      autoEOF: false,
      stdin() {
        const line = sink?.readLine();
        return line === null || line === undefined ? null : line + "\n";
      },
    });

    // Python buffers stdin and may read ahead of what input() actually consumes, which puts the
    // echoed value in the wrong place. Replacing input() itself keeps prompt, echo and consumption
    // in lockstep — and lets the echoed line be styled differently from program output.
    pyodide.registerJsModule("_webio", {
      readline: () => sink?.readLine() ?? null,
      echo: (text) => sink?.write(text, "in"),
    });
    pyodide.runPython(`
import builtins, sys, _webio

def _web_input(prompt=""):
    line = _webio.readline()
    if line is None:
        raise EOFError("EOF when reading a line")
    sys.stdout.write(str(prompt))
    sys.stdout.flush()
    _webio.echo(line + "\\n")
    return line

builtins.input = _web_input
`);

    setStatus("ready", "Python: พร้อมใช้งาน");
    return pyodide;
  })().catch((err) => {
    setStatus("error", "Python: โหลดไม่สำเร็จ");
    pyodidePromise = null;
    throw err;
  });

  return pyodidePromise;
}

/**
 * Runs `code` with a fresh global namespace so variables never leak between runs.
 * `onWrite(text, kind)` receives output as it is produced; kind is "out" | "err" | "in".
 */
async function runPython(code, { stdin = "", files = null, onWrite } = {}) {
  const pyodide = await getPyodide();

  const pending = stdin.length ? stdin.replace(/\r\n/g, "\n").split("\n") : [];
  if (pending.length && pending[pending.length - 1] === "") pending.pop();

  sink = {
    write: onWrite,
    readLine: () => (pending.length ? pending.shift() : null),
  };

  if (files) {
    for (const [name, content] of Object.entries(files)) {
      pyodide.FS.writeFile(name, content, { encoding: "utf8" });
    }
  }

  const ns = pyodide.globals.get("dict")();
  ns.set("__name__", "__main__");

  try {
    await pyodide.runPythonAsync(code, { globals: ns });
  } catch (err) {
    onWrite(formatError(err), "err");
  } finally {
    ns.destroy();
    sink = null;
  }
}

function formatError(err) {
  const raw = String(err.message || err);
  if (/EOFError/.test(raw)) {
    return (
      "\nEOFError: โปรแกรมเรียก input() แต่ไม่มีข้อมูลนำเข้าเหลือแล้ว\n" +
      "→ พิมพ์ค่าที่ต้องการป้อนลงในช่อง “ข้อมูลนำเข้า (stdin)” บรรทัดละ 1 ค่า แล้วกดรันใหม่\n"
    );
  }
  const idx = raw.indexOf("Traceback (most recent call last)");
  const trace = idx >= 0 ? raw.slice(idx) : raw;
  return "\n" + cleanTraceback(trace);
}

/**
 * Pyodide's tracebacks are padded with frames from its own loader, which mean nothing to a
 * beginner. Drop those frames and label the remaining ones as lines of the student's own code.
 */
function cleanTraceback(trace) {
  const lines = trace.split("\n");
  const kept = [];
  let skipping = false;

  for (const line of lines) {
    const frame = line.match(/^\s*File "([^"]*)", line (\d+)(?:, in (.*))?/);
    if (frame) {
      const [, file, lineNo, fn] = frame;
      skipping = file !== "<exec>";
      if (skipping) continue;
      kept.push(
        fn && fn !== "<module>"
          ? `  โค้ดของคุณ บรรทัดที่ ${lineNo} (ในฟังก์ชัน ${fn})`
          : `  โค้ดของคุณ บรรทัดที่ ${lineNo}`
      );
      continue;
    }
    // Source echo and caret lines belong to the frame above them.
    if (skipping && /^\s/.test(line)) continue;
    skipping = false;
    kept.push(line);
  }
  return kept.join("\n");
}

window.PyRunner = { getPyodide, runPython };
})();
