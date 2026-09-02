/**
 * เนื้อหาบทเรียนวิชา 618240
 * บทที่ 4-7 โค้ดคัดจากเอกสารบรรยายของอาจารย์โดยตรง
 * บทที่ 1-3 เรียบเรียงขึ้นเองให้ครอบคลุมหัวข้อเดียวกับบรรยาย 1-3
 * โค้ดตัวอย่างเขียนด้วย String.raw เพื่อให้ backslash ใน Python (เช่น \n) คงอยู่ตามเดิม
 *
 * โหลดเป็นสคริปต์ธรรมดา (ไม่ใช่ ES module) เพื่อให้เปิดไฟล์ index.html
 * จากเครื่องโดยตรงด้วย file:// ได้โดยไม่ติดข้อจำกัด CORS
 */
(function () {

const STUDENTS_CSV = `ID,Name,Age,Score
1,Alice,20,85
2,Bob,22,91
3,Charlie,21,88
`;

const GRADES_CSV = `Last name,First name,SSN,Test1,Test2,Final
Alfalfa,Aloysius,123-45-6789,40,90,49
Elephant,Ima,456-71-9012,45,47,77
Airpump,Andrew,223-45-6789,49,50,83
Franklin,Benny,234-56-2890,50,73,66
Gerty,Gramma,567-89-0123,41,80,44
`;

const lessons = [
  /* ================================================================ บทที่ 1 */
  {
    id: "basics",
    no: 1,
    title: "พื้นฐานภาษา Python",
    summary: "ชนิดข้อมูล ตัวแปร โอเปอเรเตอร์ การแสดงผล การรับค่า และการจัดการสตริง",
    goals: [
      "บอกชนิดข้อมูลพื้นฐานของ Python และตรวจสอบชนิดด้วย <code>type()</code> ได้",
      "สร้างตัวแปร เขียนนิพจน์ และแปลงชนิดข้อมูลได้",
      "ใช้ <code>print()</code> แสดงผล และ <code>input()</code> รับค่าจากผู้ใช้ได้",
      "อ้างอิงตัวอักษร ตัดช่วง (slice) และใช้ฟังก์ชันของสตริงได้",
    ],
    sections: [
      {
        heading: "1.1 ชนิดข้อมูล (Data Types)",
        body: `
          <p>Python มีชนิดข้อมูลในตัวหลายแบบ สิ่งที่ต้องจำคือชนิดไหน <em>แก้ค่าภายในได้</em>
          (mutable) และชนิดไหนแก้ไม่ได้ (immutable)</p>
          <table class="tbl">
            <tr><th>ชื่อชนิด</th><th>เขียนใน Python</th><th>แก้ค่าได้</th><th>ตัวอย่าง</th></tr>
            <tr><td>Boolean</td><td><code>bool</code></td><td>ไม่ได้</td><td><code>True</code>, <code>False</code></td></tr>
            <tr><td>จำนวนเต็ม</td><td><code>int</code></td><td>ไม่ได้</td><td><code>50</code>, <code>200</code></td></tr>
            <tr><td>จำนวนจริง</td><td><code>float</code></td><td>ไม่ได้</td><td><code>3.14</code>, <code>5.4e6</code></td></tr>
            <tr><td>จำนวนเชิงซ้อน</td><td><code>complex</code></td><td>ไม่ได้</td><td><code>4j</code>, <code>2 + 8j</code></td></tr>
            <tr><td>ข้อความ</td><td><code>str</code></td><td>ไม่ได้</td><td><code>'test'</code>, <code>"home"</code></td></tr>
            <tr><td>รายการ</td><td><code>list</code></td><td><strong>ได้</strong></td><td><code>['blink', 'twice']</code></td></tr>
            <tr><td>ทูเพิล</td><td><code>tuple</code></td><td>ไม่ได้</td><td><code>(1, 3, 5)</code></td></tr>
            <tr><td>พจนานุกรม</td><td><code>dict</code></td><td><strong>ได้</strong></td><td><code>{'cat': 'persia'}</code></td></tr>
            <tr><td>เซต</td><td><code>set</code></td><td><strong>ได้</strong></td><td><code>set([3, 5, 7])</code></td></tr>
          </table>
          <p>ใช้ <code>type()</code> เพื่อดูว่าตัวแปรเป็นชนิดอะไร</p>`,
        examples: [
          {
            title: "ตรวจสอบชนิดข้อมูลด้วย type()",
            code: String.raw`print(type('Hello World'))
print(type(50))
print(type(3.14))
print(type(True))
print(type([1, 2, 3]))
print(type((1, 3, 5)))

# isinstance ใช้ถามว่า "ใช่ชนิดนี้หรือไม่" คืนค่า True/False
print(isinstance(7, int))
print(isinstance(7, str))`,
          },
        ],
      },
      {
        heading: "1.2 ตัวแปร (Variables)",
        body: `
          <p>ตัวแปรเก็บค่าโดยใช้เครื่องหมาย <code>=</code> เรียกว่าการ <em>ป้อนค่า</em> (assignment)
          Python ไม่ต้องประกาศชนิดตัวแปร ตัวภาษาจะกำหนดชนิดให้เองจากค่าที่ป้อน</p>
          <p><strong>กฎการตั้งชื่อตัวแปร</strong></p>
          <ul>
            <li>ตัวพิมพ์เล็ก-ใหญ่ถือว่าต่างกัน (case sensitive) — <code>bob</code> กับ <code>Bob</code> คนละตัว</li>
            <li>ขึ้นต้นด้วยตัวเลขไม่ได้ — <code>2x</code> ผิด, <code>x2</code> ถูก</li>
            <li>ใช้ตัวอักษร ตัวเลข และ <code>_</code> ได้</li>
          </ul>
          <p>ในทางเทคนิค ตัวแปรคือ <em>reference</em> ที่ชี้ไปยัง object ไม่ใช่ตัวกล่องเก็บค่าเอง</p>`,
        examples: [
          {
            title: "การกำหนดค่าและแก้ค่าตัวแปร",
            code: String.raw`x = 34 - 23            # นี่คือคอมเมนต์
y = "Hello"            # อีกอันหนึ่ง
z = 3.45

x = x + 1
y = y + " World"       # การต่อสตริง

# ป้อนค่าเดียวให้หลายตัวแปรพร้อมกัน
two = deux = song = 2

print(x)
print(y)
print(z)
print(two, deux, song)`,
          },
        ],
      },
      {
        heading: "1.3 โอเปอเรเตอร์และนิพจน์ (Operators & Expressions)",
        body: `
          <table class="tbl">
            <tr><th>กลุ่ม</th><th>โอเปอเรเตอร์</th></tr>
            <tr><td>คำนวณ (Arithmetic)</td><td><code>+ - * / // % **</code></td></tr>
            <tr><td>เปรียบเทียบ (Comparison)</td><td><code>== != &lt; &gt; &lt;= &gt;=</code></td></tr>
            <tr><td>ป้อนค่า (Assignment)</td><td><code>= += -= *= /= //= %= **=</code></td></tr>
            <tr><td>ตรรกะ (Logical)</td><td><code>and or not</code></td></tr>
            <tr><td>บิต (Bitwise)</td><td><code>&amp; | ^ ~ &lt;&lt; &gt;&gt;</code></td></tr>
            <tr><td>สมาชิก (Membership)</td><td><code>in</code>, <code>not in</code></td></tr>
            <tr><td>เอกลักษณ์ (Identity)</td><td><code>is</code>, <code>is not</code></td></tr>
          </table>
          <p class="note"><strong>จุดที่มักพลาด:</strong> <code>/</code> คือการหารแบบทศนิยม (<code>9/2</code> ได้ <code>4.5</code>)
          ส่วน <code>//</code> คือหารเอาจำนวนเต็ม (<code>9//2</code> ได้ <code>4</code>) และ <code>%</code> คือเศษที่เหลือ</p>`,
        examples: [
          {
            title: "การคำนวณ int และ float",
            code: String.raw`print(9 + 2)      # 11
print(9 - 2)      # 7
print(9 * 2)      # 18
print(9 / 2)      # 4.5   หารได้ทศนิยม
print(9 // 2)     # 4     หารปัดเศษทิ้ง
print(9 % 2)      # 1     เศษที่เหลือ
print(3 ** 2)     # 9     ยกกำลัง

print(9.1 + 2.0)
print(-10 / 2)`,
          },
          {
            title: "นิพจน์และค่าทางตรรกะ",
            code: String.raw`x = 1.2
z = 8
y = (x * z) + 10
print(y)

c = 8 ** 2
print(c)

a = True
b = False
print(a and b)
print(a or b)
print(a == b)
print(a != b)
print(not a)`,
          },
        ],
      },
      {
        heading: "1.4 การแปลงชนิดข้อมูล (Type Conversion)",
        body: `
          <p>การแปลงชนิดมี 2 แบบ คือ <strong>อัตโนมัติ</strong> (implicit เช่น <code>5.5 + 2</code>
          Python เลื่อน <code>2</code> เป็น float ให้เอง) และ <strong>สั่งเอง</strong> (explicit ด้วยฟังก์ชัน)</p>`,
        examples: [
          {
            title: "แปลงชนิดข้อมูลด้วยฟังก์ชัน",
            code: String.raw`value = 65
print(hex(value))     # '0x41'  เลขฐาน 16
print(bin(value))     # '0b1000001'  เลขฐาน 2
print(chr(value))     # 'A'     รหัส -> ตัวอักษร
print(ord('A'))       # 65      ตัวอักษร -> รหัส

print(5.5 + 2)        # implicit: int ถูกเลื่อนเป็น float
print(bool(1))
print(bool(0.0))
print(float(22 // 5))
print(int(4.5))       # ปัดเศษทิ้ง ไม่ใช่ปัดขึ้น

# abs / round
print(abs(-9.0))
print(round(6.7))
print(round(6.3))`,
          },
        ],
      },
      {
        heading: "1.5 การแสดงผลด้วย print()",
        body: `
          <p><code>print()</code> จะขึ้นบรรทัดใหม่ให้อัตโนมัติหลังแสดงผลเสร็จ
          ถ้าไม่ต้องการให้ขึ้นบรรทัดใหม่ ต้องกำหนดพารามิเตอร์ <code>end=</code></p>
          <p>รูปแบบการแสดงค่าตัวแปรทำได้ 2 แบบ</p>
          <ul>
            <li><code>print("x:", x, "y:", y)</code> — คั่นด้วยเครื่องหมายจุลภาค Python เติมช่องว่างให้</li>
            <li><code>print("x:{0} y:{1}".format(x, y))</code> — ใส่ค่าลงตำแหน่งที่ระบุ</li>
          </ul>`,
        examples: [
          {
            title: "รูปแบบต่าง ๆ ของ print",
            code: String.raw`x = abs(-9.0)
y = abs(8.9)
z = int(8.9)

print("x:{0} y:{1} z:{2}".format(x, y, z))
print("x:", x, " ", "y:", y, " z:", z)

# end= กำหนดว่าให้ปิดท้ายด้วยอะไรแทนการขึ้นบรรทัดใหม่
name = "Mark"
print("my name is", end=" ")
print(name)

print(name, end="@")
print("gmail.com")

# จัดคอลัมน์ให้ตรงกันด้วย format
print("{0:<15s}{1:<15s}".format("summary", "Months"))
print("{0:^15d}{1:^15s}".format(15, "February"))`,
          },
        ],
      },
      {
        heading: "1.6 การรับค่าจากผู้ใช้ด้วย input()",
        body: `
          <p><code>input()</code> คืนค่าที่ผู้ใช้พิมพ์มาเป็น <strong>สตริงเสมอ</strong>
          ถ้าต้องการนำไปคำนวณต้องแปลงเป็นตัวเลขก่อนด้วย <code>int()</code>, <code>float()</code> หรือ <code>eval()</code></p>
          <div class="note"><strong>วิธีใช้บนเว็บนี้:</strong> พิมพ์ค่าที่ต้องการป้อนลงในช่อง
          “ข้อมูลนำเข้า (stdin)” ทางขวา บรรทัดละ 1 ค่า เรียงตามลำดับที่โปรแกรมถาม แล้วจึงกดรัน</div>`,
        examples: [
          {
            title: "รับข้อความและรับตัวเลข",
            code: String.raw`country = input("Where are you from ? ")
print("You are from", country)

a = input("Enter radius: ")
b = 3.14 * eval(a) ** 2
print("Area is", b)`,
            stdin: "Thailand\n5",
          },
        ],
      },
      {
        heading: "1.7 สตริง: การอ้างอิงตัวอักษรและการตัดช่วง (Slice)",
        body: `
          <p>สตริงคือชุดของตัวอักษรที่เก็บเป็นรหัส Unicode อ้างอิงทีละตัวได้ 2 ทิศทาง</p>
          <ul>
            <li>ซ้ายไปขวา เริ่มนับจาก <code>0</code> — <code>name[0]</code> คือตัวแรก</li>
            <li>ขวาไปซ้าย เริ่มนับจาก <code>-1</code> — <code>name[-1]</code> คือตัวสุดท้าย</li>
          </ul>
          <p>การตัดช่วงใช้รูปแบบ <code>name[m:n]</code> โดย <code>m</code> คือตำแหน่งเริ่ม
          และ <strong><code>n-1</code> คือตำแหน่งสุดท้าย</strong> (ไม่รวมตัวที่ <code>n</code>)
          ถ้าละ <code>m</code> ไว้จะหมายถึงเริ่มที่ 0 ถ้าละ <code>n</code> ไว้จะหมายถึงจนจบสตริง</p>`,
        examples: [
          {
            title: "อ้างอิงตัวอักษรในสตริง",
            code: String.raw`name = "My name"
print(name)
print(len(name))

# นับจากซ้าย  M=0 y=1 (ช่องว่าง)=2 n=3 a=4 m=5 e=6
print(name[0])
print(name[6])

# นับจากขวา  e=-1 m=-2 a=-3 n=-4 (ช่องว่าง)=-5 y=-6 M=-7
print(name[-7])
print(name[-1])`,
          },
          {
            title: "การตัดช่วงสตริง (slice)",
            code: String.raw`name = "Mark"

print(name[1:2])     # a      ตำแหน่ง 1 ถึง 2-1
print(name[0:1])     # M
print(name[0:4])     # Mark
print(name[0:3])     # Mar

# ละตัวเลขไว้ได้
print(name[:4])      # Mark   ละ m -> เริ่มที่ 0
print(name[1:])      # ark    ละ n -> จนจบ
print(name[:-1])     # Mar    ตัดตัวสุดท้ายทิ้ง

# ใช้เลขติดลบก็ได้ แต่ยังอ่านจากซ้ายไปขวา
print(name[-4:-1])   # Mar
print(name[-4:])     # Mark`,
          },
          {
            title: "การต่อและการทำซ้ำสตริง",
            code: String.raw`a = "I am "
b = "Tom"
c = a + b
print(c)

x_str = "xxx"
print(x_str * 3)

ystr = ("cha-" * 2) + "cha"
print(ystr)`,
          },
        ],
      },
      {
        heading: "1.8 ฟังก์ชันของสตริง",
        body: `
          <table class="tbl">
            <tr><th>ฟังก์ชัน</th><th>ตัวอย่าง (S = "happy")</th><th>ผลลัพธ์</th><th>คำอธิบาย</th></tr>
            <tr><td><code>len</code></td><td><code>len(S)</code></td><td><code>5</code></td><td>ขนาดสตริง</td></tr>
            <tr><td><code>upper</code></td><td><code>S.upper()</code></td><td><code>"HAPPY"</code></td><td>เป็นตัวพิมพ์ใหญ่</td></tr>
            <tr><td><code>lower</code></td><td><code>S.lower()</code></td><td><code>"happy"</code></td><td>เป็นตัวพิมพ์เล็ก</td></tr>
            <tr><td><code>count</code></td><td><code>S.count('p')</code></td><td><code>2</code></td><td>นับจำนวนที่พบ</td></tr>
            <tr><td><code>capitalize</code></td><td><code>"mark".capitalize()</code></td><td><code>"Mark"</code></td><td>ตัวแรกเป็นตัวใหญ่</td></tr>
            <tr><td><code>title</code></td><td><code>"mark thorn".title()</code></td><td><code>"Mark Thorn"</code></td><td>ตัวแรกของทุกคำเป็นตัวใหญ่</td></tr>
            <tr><td><code>rstrip</code></td><td><code>"mark   ".rstrip()</code></td><td><code>"mark"</code></td><td>ตัดช่องว่างท้ายออก</td></tr>
          </table>
          <p>ฟังก์ชันของสตริงคืนค่าเป็นสตริง จึงนำมา <strong>ต่อกันเป็นลูกโซ่</strong> (chained method)
          ในบรรทัดเดียวได้</p>`,
        examples: [
          {
            title: "ฟังก์ชันสตริงและการเชื่อมเป็นลูกโซ่",
            code: String.raw`S = "happy"
print(len(S))
print(S.upper())
print(S.count('p'))
print("mark".capitalize())
print("mark thorn".title())

# เขียนแยกทีละขั้น
T = "eXit   "
b = T.upper()
c = b.rstrip()
print("[" + c + "]")

# เขียนเป็นลูกโซ่ ได้ผลเหมือนกัน
d = T.upper().rstrip()
print("[" + d + "]")`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "รับรัศมีวงกลมจากผู้ใช้ แล้วแสดงพื้นที่วงกลม (πr²) โดยใช้ π = 3.14159",
        starter: String.raw`r = input("Enter radius: ")
# เขียนโค้ดคำนวณและแสดงผลตรงนี้
`,
        stdin: "5",
        solution: String.raw`r = input("Enter radius: ")
r = float(r)
area = 3.14159 * r ** 2
print("Area is {0:.2f}".format(area))`,
      },
      {
        prompt: "รับชื่อเต็มจากผู้ใช้ แล้วแสดงตัวอักษรตัวแรก ตัวสุดท้าย และชื่อแบบตัวพิมพ์ใหญ่ทั้งหมด",
        starter: String.raw`name = input("Enter your name: ")
# เขียนโค้ดตรงนี้
`,
        stdin: "somchai",
        solution: String.raw`name = input("Enter your name: ")
print("ตัวแรก:", name[0])
print("ตัวสุดท้าย:", name[-1])
print("พิมพ์ใหญ่:", name.upper())`,
      },
    ],
  },

  /* ================================================================ บทที่ 2 */
  {
    id: "control-flow",
    no: 2,
    title: "โครงสร้างควบคุมและ List",
    summary: "การจัดย่อหน้า, if/elif/else, การวนซ้ำด้วย while และ for, และการใช้งาน list",
    goals: [
      "อธิบายการจัดระดับคำสั่งด้วยย่อหน้า (indent) ของ Python ได้",
      "สร้างทางเลือกของโปรแกรมด้วย <code>if</code> / <code>elif</code> / <code>else</code> ได้",
      "วนซ้ำด้วย <code>while</code> และ <code>for</code> พร้อมใช้ <code>break</code> ได้",
      "สร้างและจัดการข้อมูลใน <code>list</code> ได้",
    ],
    sections: [
      {
        heading: "2.1 การจัดระดับคำสั่งด้วยย่อหน้า (Indent)",
        body: `
          <p>Python ต่างจากภาษา C ตรงที่</p>
          <ul>
            <li><strong>ไม่ใช้</strong> <code>;</code> ปิดท้ายคำสั่ง — ใช้การขึ้นบรรทัดใหม่แทน</li>
            <li><strong>ไม่ใช้</strong> <code>{ }</code> จัดกลุ่มคำสั่ง — ใช้ <strong>ย่อหน้า (indent)</strong> แทน</li>
            <li>คำสั่งระดับบนสุดต้องชิดขอบซ้าย ไม่มีช่องว่างนำหน้า</li>
            <li>คำสั่งที่อยู่ใต้ <code>if</code>, <code>while</code>, <code>for</code>, <code>def</code>
            ต้องเว้น 1 ระดับ (กด TAB หรือ 4 ช่องว่าง)</li>
          </ul>
          <p class="note warn"><strong>สำคัญ:</strong> ย่อหน้าไม่ตรงกัน = โปรแกรมพัง
          ลองแก้ย่อหน้าในตัวอย่างข้างล่างให้ผิดดู แล้วกดรัน จะเห็น <code>IndentationError</code></p>`,
        examples: [
          {
            title: "ระดับย่อหน้าที่ถูกต้อง",
            code: String.raw`celsius = 45

if celsius >= 40:
    print("Over Heat")          # 1 ระดับ อยู่ใน if
    print("ปิดเครื่องด่วน")      # 1 ระดับ อยู่ใน if เหมือนกัน

print("จบโปรแกรม")               # ระดับบนสุด อยู่นอก if`,
          },
        ],
      },
      {
        heading: "2.2 if / else และ if / elif / else",
        body: `
          <p>รูปแบบพื้นฐาน</p>
          <p>เงื่อนไขที่เขียนหลัง <code>if</code> ต้องคืนค่าเป็น <code>True</code> หรือ <code>False</code>
          และคำสั่ง <code>pass</code> คือ “สั่งให้ไม่ทำอะไร” ใช้เมื่อยังไม่อยากเขียนโค้ดในบล็อกนั้น</p>
          <p>เมื่อต้องการทางเลือกมากกว่า 2 ทาง ใช้ <code>elif</code> ต่อกันได้ไม่จำกัด
          Python จะตรวจเงื่อนไขจากบนลงล่าง เจอข้อไหนจริงข้อแรกก็ทำข้อนั้นแล้วออกจากโครงสร้างทันที</p>`,
        examples: [
          {
            title: "if / else สองทางเลือก",
            code: String.raw`interest_rate = 12

if interest_rate >= 10:
    print("Too High")
else:
    print("Still high")

# pass คือไม่ทำอะไรเลย
celsius = 20
if celsius >= 40:
    print("Over Heat")
else:
    pass

print("ตรวจสอบเสร็จ")`,
          },
          {
            title: "if / elif / else หลายทางเลือก",
            code: String.raw`temperature = 30

if temperature < 0:
    remark = "freezing"
elif temperature < 30:
    remark = "warm"
else:
    remark = "hot"

print(remark)`,
          },
          {
            title: "ตัดเกรดจากคะแนน (รับค่าจากผู้ใช้)",
            code: String.raw`score = eval(input("Enter score: "))

if score >= 80:
    grade = 'A'
elif score >= 70:
    grade = 'B'
elif score >= 60:
    grade = 'C'
elif score >= 50:
    grade = 'D'
else:
    grade = 'F'

print("My grade is", grade)`,
            stdin: "81",
          },
        ],
      },
      {
        heading: "2.3 การวนซ้ำแบบ while",
        body: `
          <p>ใช้ <code>while</code> เมื่อ <strong>ไม่รู้จำนวนรอบล่วงหน้า</strong>
          โปรแกรมจะตรวจเงื่อนไขก่อนทุกรอบ ถ้าเป็นจริงจึงทำงานในบล็อก ถ้าเป็นเท็จก็ออกจากลูป</p>
          <p class="note warn">อย่าลืมเขียนคำสั่งที่ทำให้เงื่อนไขเป็นเท็จสักวัน (เช่น <code>count += 1</code>)
          ไม่งั้นจะได้ลูปไม่รู้จบ และหน้าเว็บนี้จะค้างจนต้องรีเฟรช</p>`,
        examples: [
          {
            title: "นับ 1 ถึง 5",
            code: String.raw`count = 1
while count <= 5:
    print(count)
    count += 1

print("จบลูปแล้ว count =", count)`,
          },
          {
            title: "วนไปเรื่อย ๆ แล้วออกด้วย break",
            code: String.raw`while True:
    stuff = input("[type q to quit]: ")
    if stuff == "q":
        break
    print(stuff.capitalize())

print("bye")`,
            stdin: "hello\npython\nq",
          },
          {
            title: "หาค่าน้อยที่สุดจากค่าที่ผู้ใช้ป้อน",
            code: String.raw`num_list = []

while True:
    s = input("Enter number or 'q' to quit: ")
    if s.isdigit():
        num_list.append(eval(s))
    else:
        break

if len(num_list) > 0:
    print("Minimum number is", min(num_list))
    print("Maximum number is", max(num_list))
else:
    print("ไม่ได้ป้อนตัวเลขเลย")`,
            stdin: "45\n12\n78\n3\nq",
          },
        ],
      },
      {
        heading: "2.4 การวนซ้ำแบบ for และ range()",
        body: `
          <p>ใช้ <code>for</code> เมื่อ <strong>รู้จำนวนรอบ</strong> หรือต้องการวนไปทีละสมาชิกของ list</p>
          <table class="tbl">
            <tr><th>รูปแบบ</th><th>ได้ค่าอะไรบ้าง</th></tr>
            <tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td></tr>
            <tr><td><code>range(2, 6)</code></td><td>2, 3, 4, 5</td></tr>
            <tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8</td></tr>
            <tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1 (นับถอยหลัง)</td></tr>
          </table>`,
        examples: [
          {
            title: "for กับ range",
            code: String.raw`for i in range(5):
    print("i =", i)

print("---")

for i in range(2, 6):
    print(i, end=" ")
print()

print("---")

# นับถอยหลัง
for i in range(5, 0, -1):
    print(i, end=" ")
print()`,
          },
          {
            title: "for วนไปทีละสมาชิกของ list",
            code: String.raw`fruits = ["apple", "banana", "cherry"]

for f in fruits:
    print(f, "มี", len(f), "ตัวอักษร")

print("---")

# ถ้าต้องการเลขตำแหน่งด้วย ใช้ range(len(...))
for i in range(len(fruits)):
    print(i, ":", fruits[i])`,
          },
          {
            title: "หาตัวเลขคู่ตัวแรกที่พบ",
            code: String.raw`my_list = [1, 3, 5, 9, 13, "One", 2, 3.33, 12.5]

i = 0
found = False
while i < len(my_list):
    x = my_list[i]
    i += 1
    if not isinstance(x, int):
        continue                 # ข้ามตัวที่ไม่ใช่จำนวนเต็ม
    if x % 2 == 0:
        found = True
        print("พบเลขคู่ตัวแรกคือ", x, "ที่ตำแหน่ง", i - 1)
        break

if not found:
    print("ไม่พบเลขคู่")`,
          },
        ],
      },
      {
        heading: "2.5 ข้อมูลแบบ List",
        body: `
          <p><code>list</code> เก็บข้อมูลหลายค่าไว้ในตัวแปรเดียว เข้าถึงด้วยเลขตำแหน่งเริ่มจาก 0
          และเป็นชนิดข้อมูลที่ <strong>แก้ค่าภายในได้</strong> ต่างจากสตริง</p>
          <table class="tbl">
            <tr><th>คำสั่ง</th><th>ความหมาย</th></tr>
            <tr><td><code>a.append(x)</code></td><td>เพิ่ม <code>x</code> ต่อท้าย</td></tr>
            <tr><td><code>a.insert(i, x)</code></td><td>แทรก <code>x</code> ที่ตำแหน่ง <code>i</code></td></tr>
            <tr><td><code>a.pop()</code></td><td>เอาตัวท้ายออกและคืนค่านั้น</td></tr>
            <tr><td><code>a.remove(x)</code></td><td>ลบค่า <code>x</code> ตัวแรกที่เจอ</td></tr>
            <tr><td><code>len(a)</code>, <code>min(a)</code>, <code>max(a)</code>, <code>sum(a)</code></td><td>ขนาด / น้อยสุด / มากสุด / ผลรวม</td></tr>
          </table>`,
        examples: [
          {
            title: "การใช้งาน list",
            code: String.raw`a = [8, 7, 2, 1]
print(a, "ขนาด", len(a))

a.append(10)
print("หลัง append:", a)

a.insert(0, 99)
print("หลัง insert:", a)

last = a.pop()
print("pop ได้", last, "เหลือ", a)

a.remove(99)
print("หลัง remove:", a)

print("min =", min(a), " max =", max(a), " sum =", sum(a))

# list แก้ค่าภายในได้ (mutable)
a[0] = 100
print("หลังแก้ a[0]:", a)

# slice ใช้ได้เหมือนสตริง
print("3 ตัวแรก:", a[:3])`,
          },
          {
            title: "list ซ้อน list (ข้อมูล 2 มิติ)",
            code: String.raw`students = [
    ["Mark", 75, 82],
    ["Tim", 67, 74],
    ["Amy", 78, 90],
]

for row in students:
    name = row[0]
    total = row[1] + row[2]
    print("{0:<8s} รวม {1:3d} คะแนน".format(name, total))`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "เขียนโปรแกรมแสดงสูตรคูณแม่ 7 ตั้งแต่ 7×1 ถึง 7×12",
        starter: String.raw`# ใช้ for และ range
`,
        solution: String.raw`for i in range(1, 13):
    print("7 x {0} = {1}".format(i, 7 * i))`,
      },
      {
        prompt: "รับตัวเลข 5 ตัวจากผู้ใช้ทีละตัว เก็บลง list แล้วแสดงผลรวมและค่าเฉลี่ย",
        starter: String.raw`nums = []
# เขียนโค้ดตรงนี้
`,
        stdin: "10\n20\n30\n40\n50",
        solution: String.raw`nums = []
for i in range(5):
    s = input("Enter number: ")
    nums.append(float(s))

total = sum(nums)
print("ผลรวม =", total)
print("ค่าเฉลี่ย =", total / len(nums))`,
      },
    ],
  },

  /* ================================================================ บทที่ 3 */
  {
    id: "functions",
    no: 3,
    title: "ฟังก์ชัน โมดูล และไฟล์ CSV",
    summary: "สร้างฟังก์ชันของตัวเอง ส่งค่าเข้า คืนค่าออก ขอบเขตตัวแปร การใช้โมดูล และการอ่านไฟล์ CSV",
    goals: [
      "อธิบายประโยชน์ของฟังก์ชันและสร้างฟังก์ชันด้วย <code>def</code> ได้",
      "ส่งพารามิเตอร์เข้าฟังก์ชันและคืนค่าออกมาหลายค่าได้",
      "แยกความต่างระหว่างตัวแปร local กับ global ได้",
      "เรียกใช้โมดูลมาตรฐาน และอ่านข้อมูลจากไฟล์ CSV ได้",
    ],
    sections: [
      {
        heading: "3.1 ทำไมต้องใช้ฟังก์ชัน",
        body: `
          <ul>
            <li>แยกปัญหาใหญ่เป็นส่วนย่อย แล้วแก้ทีละส่วน</li>
            <li>เขียนและอ่านโปรแกรมง่ายขึ้น เพราะจัดเป็นกลุ่มก้อน</li>
            <li>ลดความซ้ำซ้อนของโค้ด โค้ดที่เหมือนกันรวมเป็นฟังก์ชันเดียว</li>
          </ul>
          <p>รูปแบบ: <code>def ชื่อฟังก์ชัน(พารามิเตอร์):</code> ตามด้วยคำสั่งที่เว้น 1 TAB
          และคืนค่าด้วย <code>return</code></p>
          <p>ผู้เรียกเรียกว่า <em>caller</em> ฟังก์ชันที่ถูกเรียกเรียกว่า <em>callee</em></p>`,
        examples: [
          {
            title: "ฟังก์ชันรับ 1 ค่า",
            code: String.raw`def triple(x):
    val = x * x * x
    return val

x = 2.0
y = triple(x)
print(y)`,
          },
          {
            title: "ฟังก์ชันรับ 2 ค่าขึ้นไป",
            code: String.raw`def area(w, h):
    r = w * h
    return r

a = 3.0
b = 2.0
print(area(a, b))
print(area(10, 4))`,
          },
          {
            title: "ฟังก์ชันที่ไม่รับค่าและไม่คืนค่า",
            code: String.raw`def show():
    print("{0:<15s}{1:<15s}".format("summary", "Months"))
    print("{0:^15d}{1:^15s}".format(15, "February"))

def main():
    show()

main()`,
          },
        ],
      },
      {
        heading: "3.2 ฟังก์ชันสำเร็จรูป (Built-in Functions)",
        body: `
          <p>Python เตรียมฟังก์ชันไว้ให้แล้วจำนวนมาก เช่น <code>print</code>, <code>len</code>,
          <code>chr</code>, <code>ord</code> และมีโมดูล <code>math</code> สำหรับคณิตศาสตร์</p>
          <table class="tbl">
            <tr><th>ฟังก์ชัน</th><th>รับ</th><th>คืน</th><th>ตัวอย่าง</th></tr>
            <tr><td><code>chr</code></td><td>ตัวเลข</td><td>ตัวอักษร</td><td><code>chr(65)</code> ได้ <code>'A'</code></td></tr>
            <tr><td><code>ord</code></td><td>ตัวอักษร</td><td>ตัวเลข</td><td><code>ord('A')</code> ได้ <code>65</code></td></tr>
            <tr><td><code>math.sqrt</code></td><td>ตัวเลข</td><td>รากที่สอง</td><td><code>math.sqrt(4.0)</code> ได้ <code>2.0</code></td></tr>
            <tr><td><code>math.cos</code></td><td>เรเดียน</td><td>ค่า cos</td><td><code>math.cos(3.14)</code></td></tr>
          </table>`,
        examples: [
          {
            title: "ใช้งานโมดูล math",
            code: String.raw`import math

print(math.sqrt(4.0))
print(math.pi)
print(round(math.cos(math.pi), 4))
print(math.floor(3.9), math.ceil(3.1))

print(chr(65), ord('A'))`,
          },
        ],
      },
      {
        heading: "3.3 การคืนค่าหลายค่า",
        body: `
          <p>Python คืนค่าได้มากกว่า 1 ค่า โดยคั่นด้วยเครื่องหมายจุลภาค
          และฝั่งผู้เรียกก็รับหลายตัวแปรคั่นด้วยจุลภาคเช่นกัน</p>`,
        examples: [
          {
            title: "คืนค่า 2 ค่า",
            code: String.raw`def find_max_min(a):
    max_num = max(a)
    min_num = min(a)
    return max_num, min_num

def main():
    a = [3, 4, 5, 1, 2]
    max_x, min_x = find_max_min(a)
    print("max :", max_x, " min :", min_x)

main()`,
          },
          {
            title: "ฟังก์ชันคืนค่าเป็น bool",
            code: String.raw`def isVowel(word):
    word = word.upper()
    vowels = ('A', 'E', 'I', 'O', 'U')
    for v in vowels:
        if v in word:
            return True
    return False

print("Are there vowel:", isVowel("Test"))
print("Are there vowel:", isVowel("xyz"))`,
          },
          {
            title: "ฟังก์ชันคืนค่าเป็น List",
            code: String.raw`def get_num():
    s = input("Enter 5 numbers: ")
    s_list = s.split()               # แยกด้วยช่องว่าง ได้ list ของสตริง
    print("ยังเป็นสตริง:", s_list)
    s_list = list(map(eval, s_list)) # แปลงทุกตัวเป็นตัวเลข
    print("แปลงแล้ว:", s_list)
    return s_list

def main():
    num_lst = get_num()
    print("ผลรวม =", sum(num_lst))

main()`,
            stdin: "5 6 7 3 9",
          },
        ],
      },
      {
        heading: "3.4 ขอบเขตของตัวแปร (Scope)",
        body: `
          <p>ตัวแปรที่สร้างในฟังก์ชันเป็น <strong>local</strong> ใช้ได้เฉพาะในฟังก์ชันนั้น
          ตัวแปรที่สร้างนอกฟังก์ชันเป็น <strong>global</strong> อ่านได้จากทุกฟังก์ชัน</p>
          <p class="note"><strong>กฎสำคัญ:</strong> ถ้าต้องการ <em>แก้ค่า</em> ตัวแปร global
          ในฟังก์ชัน ต้องประกาศ <code>global &lt;ชื่อตัวแปร&gt;</code> ก่อน
          ถ้าไม่ประกาศ Python จะสร้างตัวแปร local ชื่อเดียวกันขึ้นมาใหม่แทน</p>`,
        examples: [
          {
            title: "ตัวแปร global ที่ประกาศขอใช้อย่างถูกต้อง",
            code: String.raw`x = 0

def add_x():
    global x
    x += 2

def print_x():
    global x
    print("(print_x) x :", x)

def main():
    global x
    x = 1
    x += 2
    add_x()
    print_x()
    print("(main) var x is", x)

main()`,
          },
          {
            title: "ลืมประกาศ global → เกิด Error",
            code: String.raw`x = 0

def main():
    x += 2          # อ่าน x ก่อนกำหนดค่า -> Python คิดว่า x เป็น local
    print(x)

main()

# แก้ได้โดยเพิ่ม  global x  เป็นบรรทัดแรกในฟังก์ชัน`,
          },
          {
            title: "ตัวแปร local เข้าถึงข้ามฟังก์ชันไม่ได้",
            code: String.raw`def main():
    y = 1               # y เป็น local ของ main
    access()

def access():
    print(y)            # NameError เพราะมองไม่เห็น y ของ main

main()`,
          },
        ],
      },
      {
        heading: "3.5 โมดูล (Library Modules)",
        body: `
          <p>โมดูลคือกลุ่มฟังก์ชันสำเร็จรูปที่นำมาใช้ซ้ำได้ นำเข้าได้ 2 แบบ</p>
          <ul>
            <li><code>import random</code> แล้วเรียก <code>random.randint(3, 9)</code></li>
            <li><code>from random import randint</code> แล้วเรียก <code>randint(3, 9)</code> ได้เลย</li>
          </ul>
          <table class="tbl">
            <tr><th>โมดูล</th><th>ใช้ทำอะไร</th></tr>
            <tr><td><code>os</code></td><td>ลบและเปลี่ยนชื่อไฟล์</td></tr>
            <tr><td><code>os.path</code></td><td>ตรวจสอบว่ามีไฟล์อยู่หรือไม่</td></tr>
            <tr><td><code>pickle</code></td><td>เก็บ object เช่น list, dict ลงไฟล์</td></tr>
            <tr><td><code>random</code></td><td>สร้างตัวเลขสุ่ม</td></tr>
            <tr><td><code>csv</code></td><td>อ่าน/เขียนไฟล์ CSV</td></tr>
            <tr><td><code>tkinter</code>, <code>turtle</code></td><td>สร้าง GUI และวาดกราฟิก</td></tr>
          </table>
          <p><code>if __name__ == '__main__':</code> คือการบอกว่า “ให้รันโค้ดส่วนนี้เฉพาะตอนที่ไฟล์นี้
          ถูกสั่งรันโดยตรง” ถ้าถูก import ไปใช้จากไฟล์อื่นจะไม่รัน</p>`,
        examples: [
          {
            title: "สุ่มตัวเลขด้วยโมดูล random",
            code: String.raw`import random

def gen_num_int(n, begin, end):
    rand_list = []
    for i in range(n):
        rand_list.append(random.randint(begin, end))
    return rand_list

if __name__ == '__main__':
    ranlist = gen_num_int(10, 0, 5)
    print(ranlist)
    print("มากสุด =", max(ranlist), " น้อยสุด =", min(ranlist))`,
          },
        ],
      },
      {
        heading: "3.6 ไฟล์ CSV (Comma-Separated Values)",
        body: `
          <p>CSV คือไฟล์ข้อความที่แต่ละค่าในหนึ่งบรรทัดคั่นด้วยเครื่องหมายจุลภาค
          เปิดด้วย Excel ได้ และเป็นรูปแบบมาตรฐานสำหรับแลกเปลี่ยนข้อมูลตาราง</p>
          <p>ตัวอย่างข้างล่างนี้เตรียมไฟล์ <code>students.csv</code> ไว้ให้แล้ว มีเนื้อหาดังนี้</p>
          <pre style="background:var(--surface-2);padding:12px;border-radius:8px;overflow-x:auto;font-family:var(--mono);font-size:13px">ID,Name,Age,Score
1,Alice,20,85
2,Bob,22,91
3,Charlie,21,88</pre>
          <p class="note"><code>csv.reader</code> ให้ข้อมูลแต่ละแถวเป็น list
          ส่วน <code>csv.DictReader</code> ให้เป็น dict ที่อ้างด้วยชื่อคอลัมน์ — สะดวกกว่าเมื่อมีหลายคอลัมน์</p>`,
        examples: [
          {
            title: "อ่าน CSV ทั้งไฟล์ด้วย csv.reader",
            code: String.raw`import csv

def readCSV(filename):
    infile = open(filename, 'r')
    mylist = []
    csv_obj = csv.reader(infile)
    for row in csv_obj:
        mylist.append(row)
    infile.close()
    return mylist

if __name__ == '__main__':
    my_list = readCSV("students.csv")
    for row in my_list:
        print(row)`,
            files: { "students.csv": STUDENTS_CSV },
          },
          {
            title: "เลือกอ่านเฉพาะบางคอลัมน์ด้วย DictReader",
            code: String.raw`import csv

def readColCSV(filename, column):
    values = []
    with open(filename, "r", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            values.append(row[column])
    return values

if __name__ == '__main__':
    names = readColCSV("students.csv", "Name")
    print("ชื่อ  :", names)

    scores = readColCSV("students.csv", "Score")
    print("คะแนน:", scores, "<- ยังเป็นสตริง คำนวณไม่ได้")

    scores = list(map(int, scores))
    print("แปลงแล้ว:", scores, " เฉลี่ย =", sum(scores) / len(scores))`,
            files: { "students.csv": STUDENTS_CSV },
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "เขียนฟังก์ชัน grading(score) ที่รับคะแนนแล้วคืนเกรด A-F จากนั้นเรียกใช้กับคะแนนที่ผู้ใช้ป้อน",
        starter: String.raw`def grading(score):
    # เขียนโค้ดตรงนี้
    pass

s = eval(input("Enter score: "))
print("Your grade is", grading(s))
`,
        stdin: "72",
        solution: String.raw`def grading(score):
    if score >= 80:
        return 'A'
    elif score >= 70:
        return 'B'
    elif score >= 60:
        return 'C'
    elif score >= 50:
        return 'D'
    else:
        return 'F'

s = eval(input("Enter score: "))
print("Your grade is", grading(s))`,
      },
      {
        prompt: "เขียนฟังก์ชันที่อ่าน students.csv แล้วคืนชื่อของนักศึกษาที่ได้คะแนนสูงสุด",
        starter: String.raw`import csv

def topStudent(filename):
    # เขียนโค้ดตรงนี้
    pass

print(topStudent("students.csv"))
`,
        files: { "students.csv": STUDENTS_CSV },
        solution: String.raw`import csv

def topStudent(filename):
    best_name = ""
    best_score = -1
    with open(filename, "r", newline="") as file:
        for row in csv.DictReader(file):
            score = int(row["Score"])
            if score > best_score:
                best_score = score
                best_name = row["Name"]
    return best_name, best_score

print(topStudent("students.csv"))`,
      },
    ],
  },

  /* ================================================================ บทที่ 4 */
  {
    id: "sorting",
    no: 4,
    title: "อัลกอริทึมการเรียงลำดับข้อมูล",
    summary: "Bubble Sort, Selection Sort, Insertion Sort และการเรียงข้อมูลแบบ record ตามเอกสารบรรยาย 4",
    goals: [
      "อธิบาย และใช้งานอัลกอริทึมการเรียงข้อมูลแบบ Bubble Sort ได้",
      "อธิบาย และใช้งานอัลกอริทึมการเรียงข้อมูลแบบ Selection Sort ได้",
      "อธิบาย และใช้งานอัลกอริทึมการเรียงข้อมูลแบบ Insertion Sort ได้",
      "เรียงข้อมูลแบบ record โดยเลือกคอลัมน์ที่ใช้เป็นกุญแจได้",
    ],
    sections: [
      {
        heading: "4.1 ทำไมต้องศึกษาอัลกอริทึมการเรียงลำดับข้อมูล",
        body: `
          <p>ในการประมวลผลข้อมูลเรามักพบปัญหา เช่น ต้องการเรียงลำดับข้อมูลตามรหัส
          เรียงลำดับมูลค่าสินค้า หรือเรียงคะแนนสอบเข้ามหาวิทยาลัยของผู้สมัคร</p>
          <p>ข้อมูลที่นำมาเรียงเรียกว่า <b>กุญแจ (key)</b> เนื่องจากข้อมูลหนึ่งชุดมักมีหลายส่วนเกี่ยวข้องกัน
          เช่น นักศึกษา 1 คน ประกอบด้วยชื่อ นามสกุล คะแนนเฉลี่ย ข้อมูลผู้ปกครอง วิชาที่ลงทะเบียน
          ข้อมูลหนึ่งแถวแบบนี้เรียกว่า <b>record (ระเบียน)</b> และเราเลือกคอลัมน์ไหนเป็นกุญแจก็ได้
          แต่ต้องเชื่อมกุญแจกับข้อมูลเดิมของแถวนั้นไว้ด้วยเสมอ</p>
          <div class="note">ทุกอัลกอริทึมในบทนี้ต้องใช้การสลับค่าสมาชิกใน list
          อาจารย์แยกเป็นฟังก์ชัน <code>swap</code> ไว้ใช้ร่วมกัน</div>`,
        examples: [
          {
            title: "ฟังก์ชัน swap ตามเอกสารบรรยาย",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


if __name__ == '__main__':
    data = [8, 7, 2, 1]
    print("ก่อนสลับ :", data)
    swap(data, 0, 3)
    print("หลังสลับ :", data)`,
          },
        ],
      },

      {
        heading: "4.2 Bubble Sort",
        body: `
          <p><b>แนวคิดพื้นฐาน</b> เปรียบเทียบกุญแจสองตัวที่ติดกัน แล้วสลับถ้าลำดับไม่ถูกต้อง
          ข้อดีคือสร้างได้ง่ายแต่ทำงานช้า</p>
          <div class="note warn">
            <b>สังเกตให้ดี</b> โค้ดในเอกสารบรรยายวนตัวแปร <code>j</code> <b>ถอยหลัง</b>
            จาก <code>N-1</code> ลงมาถึง <code>1</code> และเทียบ <code>a[j] &lt; a[j-1]</code>
            จึงเป็นการดัน<b>ค่าน้อยขึ้นไปด้านหน้า</b> ไม่ใช่ดันค่ามากไปด้านท้ายแบบที่เห็นในตำราทั่วไป
            เวลาไล่โค้ดตอนสอบต้องระวังจุดนี้
          </div>`,
        examples: [
          {
            title: "Bubble Sort Algorithm in Python",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def bubbleSort(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] < a[j - 1]:
                a = swap(a, j, j - 1)
    return a


if __name__ == '__main__':
    data = [8, 7, 2, 1]
    data_sorted = bubbleSort(data, len(data))
    print(data_sorted)`,
          },
          {
            title: "ดูการทำงานทีละรอบของลูปนอก",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def bubbleSortShow(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] < a[j - 1]:
                a = swap(a, j, j - 1)
        print("จบรอบ i =", i, ":", a)
    return a


if __name__ == '__main__':
    data = [5, 1, 4, 2]
    bubbleSortShow(data, len(data))`,
          },
        ],
      },

      {
        heading: "4.3 Selection Sort",
        body: `
          <p><b>แนวคิดพื้นฐาน</b> ในการทำงานแต่ละรอบ หาค่าที่เล็กที่สุด
          แล้วนำมาสลับกับตำแหน่งที่เริ่มต้นในรอบนั้น ซึ่งเพิ่มขึ้นครั้งละ 1
          ทำซ้ำไปเรื่อย ๆ ตั้งแต่แถวที่ 0 ถึงแถวที่ N−1</p>
          <p>ข้อดีคือสร้างได้ง่าย ข้อเสียคือความเร็วในการทำงานประมาณ Bubble Sort
          สังเกตว่าอาจารย์ตั้งชื่อตัวแปรที่เก็บ<b>ตำแหน่ง</b>ของค่าน้อยที่สุดว่า <code>min</code></p>`,
        examples: [
          {
            title: "Selection Sort Algorithm in Python",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def selectionSort(a, N):
    for i in range(0, N - 1):
        min = i
        for j in range(i + 1, N):
            if a[j] < a[min]:
                min = j
        swap(a, min, i)
    return a


if __name__ == '__main__':
    key = [8, 7, 2, 1]
    key_sorted = selectionSort(key, len(key))
    print(key_sorted)`,
          },
        ],
      },

      {
        heading: "4.4 Insertion Sort",
        body: `
          <p><b>แนวคิดพื้นฐาน</b> คล้ายกับการเรียงไพ่ที่ถือในมือ โดยเริ่มหยิบไพ่จากโต๊ะมาครั้งละใบ
          แล้วนำมาใส่ในลำดับที่ถูกต้องในมือ แต่ละรอบอาเรย์จะถูกแบ่งเป็นสองส่วน
          ส่วนซ้ายคือไพ่ที่เรียงแล้ว (sorted) ส่วนขวาคือที่ยังไม่เรียง (unsorted)</p>
          <p>ตัวแปร <code>key</code> เก็บค่าที่กำลังจะหาตำแหน่งแทรก ต้องเก็บไว้ก่อน
          เพราะระหว่างเลื่อนสมาชิกตัวอื่นไปทางขวา ช่องเดิมของมันจะถูกเขียนทับ</p>
          <p><b>ข้อดี</b> ถ้ากุญแจถูกเรียงมาจนใกล้ถูกต้องแล้ว จำนวนครั้งการทำงานคือ N
          <b>ข้อเสีย</b> ใน worst case และ average case เป็น N × N จึงไม่ดีกว่า Bubble และ Selection</p>`,
        examples: [
          {
            title: "Insertion Sort in Python",
            code: String.raw`def insertionSort(a, n):
    for i in range(1, n):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        # Insert key
        a[j + 1] = key


if __name__ == '__main__':
    key = [8, 7, 2, 1]
    insertionSort(key, len(key))
    print(key)`,
          },
          {
            title: "เปรียบเทียบจำนวนรอบการทำงานของทั้งสามวิธี",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def bubbleCount(a, N):
    c = 0
    for i in range(N):
        for j in range(N - 1, 0, -1):
            c += 1
            if a[j] < a[j - 1]:
                a = swap(a, j, j - 1)
    return c


def selectionCount(a, N):
    c = 0
    for i in range(0, N - 1):
        min = i
        for j in range(i + 1, N):
            c += 1
            if a[j] < a[min]:
                min = j
        swap(a, min, i)
    return c


def insertionCount(a, n):
    c = 0
    for i in range(1, n):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            c += 1
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return c


if __name__ == '__main__':
    data = [5, 3, 8, 1, 9, 2, 7, 4]
    print("Bubble    :", bubbleCount(list(data), len(data)), "รอบ")
    print("Selection :", selectionCount(list(data), len(data)), "รอบ")
    print("Insertion :", insertionCount(list(data), len(data)), "รอบ")

    sorted_data = [1, 2, 3, 4, 5, 6, 7, 8]
    print()
    print("ถ้าข้อมูลเรียงมาแล้ว")
    print("Bubble    :", bubbleCount(list(sorted_data), len(sorted_data)), "รอบ")
    print("Insertion :", insertionCount(list(sorted_data), len(sorted_data)), "รอบ")`,
          },
        ],
      },

      {
        heading: "4.5 การเรียงข้อมูลในรูปแบบ record",
        body: `
          <p>ข้อมูลจริงมักเก็บเป็น record หรือหลายแถวประกอบกัน โดยแต่ละแถวมีหลายคอลัมน์
          เช่น ข้อมูลผลการสอบของนักศึกษาที่ประกอบด้วย ชื่อ SSN Test1 Test2 Final</p>
          <p>ถ้าคัดเฉพาะกุญแจออกมาเรียง ข้อมูลในแต่ละแถวจะ<b>ไม่ย้ายตาม</b>
          จึงต้องแก้ฟังก์ชัน <code>insertionSort</code> ให้ย้ายทั้งแถว
          โดยเทียบที่คอลัมน์ที่เลือกไว้ ได้เป็นฟังก์ชัน <code>insertionSortRec</code></p>`,
        examples: [
          {
            title: "คัดเฉพาะกุญแจมาเรียง — แถวไม่ย้ายตาม",
            code: String.raw`def insertionSort(a, n):
    for i in range(1, n):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        # Insert key
        a[j + 1] = key


if __name__ == '__main__':
    data = [['Mark', "123-65-6789", 75, 78, 82],
            ['Tim',  "123-65-5723", 67, 45, 74],
            ['Amy',  "123-65-4542", 78, 65, 90],
            ['Berk', "123-65-8278", 81, 74, 68]]
    key_column = 4
    key = []
    for i in range(len(data)):
        key.append(data[i][key_column])
    insertionSort(key, len(key))
    print(key)

    print("แต่ข้อมูลเดิมยังไม่ถูกเรียง")
    for row in data:
        print(row)`,
          },
          {
            title: "insertionSortRec — เรียง record ด้วยกุญแจที่เป็น column",
            code: String.raw`def insertionSortRec(r, n, key_col):
    for i in range(1, n):
        key_rec = r[i]
        j = i - 1
        while j >= 0 and r[j][key_col] > key_rec[key_col]:
            r[j + 1] = r[j]
            j -= 1
        # Insert key
        r[j + 1] = key_rec


if __name__ == '__main__':
    data = [['Mark', "123-65-6789", 75, 78, 82],
            ['Tim',  "123-65-5723", 67, 45, 74],
            ['Amy',  "123-65-4542", 78, 65, 90],
            ['Berk', "123-65-8278", 81, 74, 68]]
    key_column = 4
    insertionSortRec(data, len(data), key_column)
    for row in data:
        print(row)`,
          },
        ],
      },

      {
        heading: "4.6 การเรียง records ที่อ่านจากไฟล์ CSV",
        body: `
          <p>ข้อมูลนักศึกษาเก็บในไฟล์ CSV โดยแต่ละแถวประกอบด้วย 6 คอลัมน์
          ใช้ฟังก์ชัน <code>readRecordToList()</code> อ่านไฟล์แล้วคืนค่าเป็น List ซ้อน List
          จากนั้นส่งต่อให้ <code>insertionSortRec</code> เรียงตามคอลัมน์ที่ต้องการได้ทันที</p>
          <div class="note"><code>next(infile)</code> คือการอ่านบรรทัดแรก (หัวตาราง) ทิ้งไป
          ก่อนจะให้ <code>csv.reader</code> อ่านข้อมูลจริง</div>`,
        examples: [
          {
            title: "readRecordToList แล้วเรียงด้วยคอลัมน์ที่ 5",
            files: { "grades_short.csv": GRADES_CSV },
            code: String.raw`import csv


def readRecordToList(filename):
    infile = open(filename, 'r')
    mylist = []
    heading = next(infile)
    csv_obj = csv.reader(infile)
    for row in csv_obj:
        mylist.append(row)
    infile.close()
    return mylist


def insertionSortRec(r, n, key_col):
    for i in range(1, n):
        key_rec = r[i]
        j = i - 1
        while j >= 0 and r[j][key_col] > key_rec[key_col]:
            r[j + 1] = r[j]
            j -= 1
        # Insert key
        r[j + 1] = key_rec


if __name__ == '__main__':
    file_name = "grades_short.csv"
    data_list = readRecordToList(file_name)
    for row in data_list:
        print(row)
    print()

    key_column = 5
    insertionSortRec(data_list, len(data_list), key_column)
    for row in data_list:
        print(row)`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "แก้ bubbleSort ของอาจารย์ให้เรียงจากมากไปน้อย โดยแก้เงื่อนไขเปรียบเทียบจุดเดียว",
        starter: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def bubbleSortDesc(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            # แก้เงื่อนไขบรรทัดถัดไปให้เรียงมากไปน้อย
            if a[j] < a[j - 1]:
                a = swap(a, j, j - 1)
    return a


if __name__ == '__main__':
    print(bubbleSortDesc([8, 7, 2, 1], 4))`,
        solution: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def bubbleSortDesc(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] > a[j - 1]:      # กลับเครื่องหมายจาก < เป็น >
                a = swap(a, j, j - 1)
    return a


if __name__ == '__main__':
    print(bubbleSortDesc([8, 7, 2, 1], 4))`,
      },
      {
        prompt: "เขียน selectionSortRec(r, n, key_col) ที่เรียง record ตามคอลัมน์ที่ระบุ โดยดัดแปลงจาก selectionSort ของอาจารย์",
        starter: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def selectionSortRec(r, n, key_col):
    # เขียนโค้ดตรงนี้
    pass


if __name__ == '__main__':
    data = [['Mark', 75], ['Tim', 92], ['Amy', 68], ['Berk', 88]]
    selectionSortRec(data, len(data), 1)
    for row in data:
        print(row)`,
        solution: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def selectionSortRec(r, n, key_col):
    for i in range(0, n - 1):
        min = i
        for j in range(i + 1, n):
            if r[j][key_col] < r[min][key_col]:
                min = j
        swap(r, min, i)
    return r


if __name__ == '__main__':
    data = [['Mark', 75], ['Tim', 92], ['Amy', 68], ['Berk', 88]]
    selectionSortRec(data, len(data), 1)
    for row in data:
        print(row)`,
      },
    ],
  },

  /* ================================================================ บทที่ 5 */
  {
    id: "recursion",
    no: 5,
    title: "Recursive functions และ Merge Sort",
    summary: "ฟังก์ชันเรียกตัวเอง แนวคิด Divide and Conquer, Merge Sort และ Quick Sort ตามเอกสารบรรยาย 5",
    goals: [
      "อธิบายการทำงานของฟังก์ชันเรียกตัวเองได้",
      "แยกแยะการทำงานตอน<b>เรียก</b> กับตอน<b>คืนค่า</b> ของฟังก์ชันเรียกตัวเองได้",
      "อธิบาย และใช้งานอัลกอริทึมการเรียงข้อมูลแบบ Merge Sort ได้",
      "เปรียบเทียบ Merge Sort กับ Quick Sort ได้",
    ],
    sections: [
      {
        heading: "5.1 ฟังก์ชันเรียกตัวเอง (Recursive function)",
        body: `
          <p>เมื่อฟังก์ชันทำการเรียกใช้งานตัวเอง เราเรียกว่า <b>ฟังก์ชันเรียกตัวเอง</b>
          ฟังก์ชัน <code>message</code> ต่อไปนี้เรียกตัวเองโดยส่งค่า <code>times</code> ที่ลดลงทีละ 1 ลงไป</p>
          <p>ถ้าเรียก <code>message(3)</code> จะเรียกตัวเองทั้งหมด <b>4 ครั้ง</b> คือ times = 3, 2, 1 และ 0</p>`,
        examples: [
          {
            title: "ตัวอย่างพื้นฐาน — เรียกตัวเองจนกว่า times จะเป็น 0",
            code: String.raw`def message(times):
    print("message is called, times = ", times)
    if times > 0:
        message(times - 1)


if __name__ == '__main__':
    message(3)`,
          },
        ],
      },

      {
        heading: "5.2 การเรียก กับ การคืนค่า แสดงผลแยกกันอย่างไร",
        body: `
          <p>ถ้าเพิ่มคำสั่ง <code>print</code> อีกบรรทัด<b>หลัง</b>การเรียกตัวเอง
          จะเห็นว่าโปรแกรมแสดงผลสองชุดแยกกัน</p>
          <ul>
            <li>บรรทัดที่อยู่<b>ก่อน</b>การเรียกตัวเอง ทำงานตอน<b>ขาไป</b> นับ 3 → 0</li>
            <li>บรรทัดที่อยู่<b>หลัง</b>การเรียกตัวเอง ทำงานตอน<b>ขากลับ</b> คือหลังจากการเรียกที่ลึกที่สุดจบแล้ว
            ลำดับจึงกลับด้านเป็น 0 → 3</li>
          </ul>
          <div class="note warn">ข้อนี้ออกสอบบ่อยที่สุดในบทนี้ ให้ไล่ทีละบรรทัดด้วยมือให้ชิน</div>`,
        examples: [
          {
            title: "เห็นลำดับขาไปและขากลับของการเรียก",
            code: String.raw`def message(times):
    print("message is called, times = ", times)
    if times > 0:
        message(times - 1)
    # -----
    print("message return with ", times)


if __name__ == '__main__':
    message(3)`,
          },
          {
            title: "ลองเปลี่ยนเป็น message(1) เพื่อดูให้ชัด",
            code: String.raw`def message(times):
    print("message is called, times = ", times)
    if times > 0:
        message(times - 1)
    print("message return with ", times)


if __name__ == '__main__':
    message(1)`,
          },
        ],
      },

      {
        heading: "5.3 แนวคิดแบ่งแยกและเอาชนะ (Divide and Conquer)",
        body: `
          <ol>
            <li><b>Base Case</b> — solve the problem directly if it is small enough</li>
            <li><b>Divide</b> — divide the problem into two or more similar and smaller subproblems</li>
            <li><b>Recursively solve</b> the subproblems</li>
            <li><b>Combine</b> solutions to the subproblems</li>
          </ol>
          <p>Merge Sort ใช้แนวคิดนี้โดยแบ่งปัญหาเป็นอย่างละครึ่งทุกรอบ แล้วใช้การเรียกตัวเอง</p>
          <pre>MERGE-SORT A[0 . . N-1], Left, Right
1. If N = 1, done.
2. m = N/2
3. Merge-Sort( A, Left, m )
4. Merge-Sort( A, m + 1, Right )
5. "Merge" the 2 sorted lists.</pre>`,
        examples: [],
      },

      {
        heading: "5.4 ฟังก์ชัน merge — รวมเลข 2 กองเข้าด้วยกัน",
        body: `
          <p>หัวใจของ Merge Sort คือการรวมข้อมูลที่เรียงแล้ว 2 ชุดเข้าด้วยกัน
          โดยทั้งสองชุดอยู่ใน list <code>A</code> เดียวกัน แบ่งด้วยดัชนี</p>
          <ul>
            <li>ครึ่งแรก เริ่มจาก <code>p</code> ถึง <code>q</code></li>
            <li>ครึ่งหลัง เริ่มจาก <code>q + 1</code> ถึง <code>r</code></li>
          </ul>
          <div class="note warn"><b>สำคัญมาก</b> ฟังก์ชัน <code>merge</code> ของอาจารย์
          <b>เขียนผลลัพธ์กลับลงใน A ตัวเดิม</b> และ<b>ไม่คืนค่า</b> list ใหม่
          ต่างจากตัวอย่าง merge ที่มักเห็นทั่วไปซึ่งรับ left, right แล้ว return list ใหม่</div>
          <p>เวลาที่ใช้รวมข้อมูล n ตัวคือ Θ(n) หรือเป็นเชิงเส้น</p>`,
        examples: [
          {
            title: "merge(A, p, q, r) ตามเอกสารบรรยาย",
            code: String.raw`def merge(A, p, q, r):
    # If A is a list, slicing creates a copy.
    if type(A) is list:
        left = A[p: q+1]
        right = A[q+1: r+1]
    # Otherwise a is a np.array, so create a copy with list().
    else:
        left = list(A[p: q+1])
        right = list(A[q+1: r+1])

    i = 0     # index into left sublist/subarray
    j = 0     # index into right sublist/subarray
    k = p     # index into a[p: r+1]

    # Combine the two sorted sublists by inserting into A
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            A[k] = left[i]
            i += 1
        else:
            A[k] = right[j]
            j += 1
        k += 1

    # After going through the left or right sublist, copy the
    # remainder of the other to the end of the list/array.
    if i < len(left):     # copy remainder of left
        A[k: r+1] = left[i:]
    if j < len(right):    # copy remainder of right
        A[k: r+1] = right[j:]


if __name__ == '__main__':
    A = [2, 3, 7, 8, 5, 6, 8, 9]
    p = 0
    q = 3
    r = 7
    merge(A, p, q, r)
    print(A)`,
          },
        ],
      },

      {
        heading: "5.5 Merge Sort เต็มรูปแบบ",
        body: `
          <p><code>merge_sort</code> กำหนดค่าตั้งต้นให้ <code>p = 0</code> และ <code>r = None</code>
          เมื่อเรียกครั้งแรกจึงเขียนแค่ <code>merge_sort(A)</code> ได้เลย
          ถ้า <code>r</code> เป็น <code>None</code> ฟังก์ชันจะตั้งให้เป็น <code>len(A) - 1</code> ให้เอง</p>
          <p>base case คือ <code>p >= r</code> ซึ่งหมายถึงเหลือสมาชิก 0 หรือ 1 ตัว ถือว่าเรียงแล้ว</p>`,
        examples: [
          {
            title: "merge_sort(A, p=0, r=None) ตามเอกสารบรรยาย",
            code: String.raw`def merge(A, p, q, r):
    if type(A) is list:
        left = A[p: q+1]
        right = A[q+1: r+1]
    else:
        left = list(A[p: q+1])
        right = list(A[q+1: r+1])

    i = 0
    j = 0
    k = p

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            A[k] = left[i]
            i += 1
        else:
            A[k] = right[j]
            j += 1
        k += 1

    if i < len(left):
        A[k: r+1] = left[i:]
    if j < len(right):
        A[k: r+1] = right[j:]


def merge_sort(A, p=0, r=None):
    """Sort the elements in the sublist/subarray a[p:r+1]."""
    if r is None:
        r = len(A) - 1
    if p >= r:                 # 0 or 1 element?
        return
    q = (p + r) // 2           # midpoint of A[p: r]
    merge_sort(A, p, q)        # recursively sort A[p: q]
    merge_sort(A, q + 1, r)    # recursively sort A[q+1: r]
    merge(A, p, q, r)          # merge A[p: q] and A[q+1: r] into A[p: r]


if __name__ == '__main__':
    A = [8, 3, 2, 9, 7, 1, 5, 4]
    merge_sort(A)
    print(A)`,
          },
          {
            title: "ดูการแบ่งและการรวมทีละขั้น",
            code: String.raw`def merge(A, p, q, r):
    left = A[p: q+1]
    right = A[q+1: r+1]
    i = 0
    j = 0
    k = p
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            A[k] = left[i]
            i += 1
        else:
            A[k] = right[j]
            j += 1
        k += 1
    if i < len(left):
        A[k: r+1] = left[i:]
    if j < len(right):
        A[k: r+1] = right[j:]
    print("   รวม A[{0}..{1}] ได้ {2}".format(p, r, A[p:r+1]))


def merge_sort(A, p=0, r=None, depth=0):
    if r is None:
        r = len(A) - 1
    if p >= r:
        return
    q = (p + r) // 2
    print("  " * depth + "แบ่ง A[{0}..{1}] ที่ q = {2}".format(p, r, q))
    merge_sort(A, p, q, depth + 1)
    merge_sort(A, q + 1, r, depth + 1)
    merge(A, p, q, r)


if __name__ == '__main__':
    A = [8, 3, 2, 9, 7, 1, 5, 4]
    merge_sort(A)
    print()
    print("ผลลัพธ์:", A)`,
          },
        ],
      },

      {
        heading: "5.6 Quick Sort",
        body: `
          <p><b>1. แบ่งแยก (Divide)</b></p>
          <ul>
            <li>เลือกกุญแจ <code>p</code> เป็นจุดแบ่ง (pivot) เช่นตัวแรก</li>
            <li>แบ่งกุญแจที่เหลือโดยใช้กุญแจ p ที่เลือกมา
            ส่วนแรกประกอบด้วยกุญแจทั้งหมดที่<b>น้อยกว่า</b> p
            ส่วนที่สองประกอบด้วยกุญแจทั้งหมดที่<b>มากกว่าหรือเท่ากับ</b> p</li>
          </ul>
          <p><b>2. เรียกตัวเอง</b> เรียงส่วนแรกและส่วนที่สอง
          <b>3.</b> เมื่อเรียกตัวเองจนสุดแล้วทำการรวมทั้งสองส่วน
          ในกรณีนี้การรวม<b>ไม่เสียเวลา</b>เหมือน merge sort</p>
          <pre>Quick-Sort(A, left, right)
  if left >= right  return
  else
      middle &lt;- Partition(A, left, right)
      Quick-Sort(A, left, middle - 1)
      Quick-Sort(A, middle + 1, right)
  end if</pre>`,
        examples: [
          {
            title: "Quick Sort เขียนเป็นภาษา Python",
            code: String.raw`def partition(A, left, right):
    pivot = A[left]
    i = left + 1
    for j in range(left + 1, right + 1):
        if A[j] < pivot:
            A[i], A[j] = A[j], A[i]
            i += 1
    A[left], A[i - 1] = A[i - 1], A[left]
    return i - 1


def quickSort(A, left=0, right=None):
    if right is None:
        right = len(A) - 1
    if left >= right:
        return
    middle = partition(A, left, right)
    quickSort(A, left, middle - 1)
    quickSort(A, middle + 1, right)


if __name__ == '__main__':
    A = [8, 3, 2, 9, 7, 1, 5, 4]
    quickSort(A)
    print(A)`,
          },
        ],
      },

      {
        heading: "5.7 เปรียบเทียบ Merge Sort กับ Quick Sort",
        body: `
          <table class="tbl">
            <tr><th>หัวข้อ</th><th>Merge Sort</th><th>Quick Sort</th></tr>
            <tr><td>งานส่วนใหญ่อยู่ที่</td><td>ตอน merge</td><td>ตอน partition</td></tr>
            <tr><td>การแบ่งข้อมูล</td><td>ครึ่งพอดี n/2</td><td>สัดส่วนใดก็ได้ ไม่จำเป็นต้องครึ่ง</td></tr>
            <tr><td>Average case</td><td>n log n</td><td>n log n</td></tr>
            <tr><td>Worst case</td><td>O(n log n)</td><td>O(n²)</td></tr>
            <tr><td>หน่วยความจำเพิ่ม</td><td>More (not in-place)</td><td>Less (in-place)</td></tr>
            <tr><td>Stability</td><td>Stable</td><td>Not stable</td></tr>
            <tr><td>เหมาะกับ</td><td>Linked Lists</td><td>Arrays</td></tr>
            <tr><td>ขนาดข้อมูล</td><td>ทำงานดีกับทุกขนาด</td><td>ทำงานดีกับข้อมูลขนาดเล็ก</td></tr>
          </table>
          <p><b>Stable vs Unstable Sorting</b> พิจารณาจากการจัดการตัวเลขที่เหมือนกัน
          Stable Sort คือลำดับของตัวเลขที่เหมือนกันยังคงเหมือนเดิม
          ตัวที่อยู่ลำดับสูงกว่าก่อนเรียง จะยังอยู่สูงกว่าหลังเรียง</p>
          <p>ทั้ง Merge Sort และ Quick Sort มีประสิทธิภาพดีกว่า Insertion Sort</p>`,
        examples: [
          {
            title: "วัดความเร็วจริง — Merge Sort เทียบ Bubble Sort",
            code: String.raw`import random
import time


def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a


def bubbleSort(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] < a[j - 1]:
                a = swap(a, j, j - 1)
    return a


def merge(A, p, q, r):
    left = A[p: q+1]
    right = A[q+1: r+1]
    i = 0
    j = 0
    k = p
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            A[k] = left[i]
            i += 1
        else:
            A[k] = right[j]
            j += 1
        k += 1
    if i < len(left):
        A[k: r+1] = left[i:]
    if j < len(right):
        A[k: r+1] = right[j:]


def merge_sort(A, p=0, r=None):
    if r is None:
        r = len(A) - 1
    if p >= r:
        return
    q = (p + r) // 2
    merge_sort(A, p, q)
    merge_sort(A, q + 1, r)
    merge(A, p, q, r)


if __name__ == '__main__':
    random.seed(1)
    data = [random.randint(0, 9999) for _ in range(600)]

    a1 = list(data)
    t0 = time.time()
    bubbleSort(a1, len(a1))
    t_bubble = time.time() - t0

    a2 = list(data)
    t0 = time.time()
    merge_sort(a2)
    t_merge = time.time() - t0

    print("ข้อมูล", len(data), "ตัว")
    print("Bubble Sort : {0:.4f} วินาที".format(t_bubble))
    print("Merge Sort  : {0:.4f} วินาที".format(t_merge))
    print("ผลลัพธ์ตรงกัน :", a1 == a2)`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "เขียนฟังก์ชันเรียกตัวเอง sumTo(n) ที่คืนผลรวม 1 + 2 + ... + n โดยไม่ใช้ลูป",
        starter: String.raw`def sumTo(n):
    # base case แล้วเรียกตัวเองด้วยค่าที่เล็กลง
    pass


if __name__ == '__main__':
    print(sumTo(5))
    print(sumTo(100))`,
        solution: String.raw`def sumTo(n):
    if n == 0:
        return 0
    return n + sumTo(n - 1)


if __name__ == '__main__':
    print(sumTo(5))
    print(sumTo(100))`,
      },
      {
        prompt: "ดัดแปลง merge ของอาจารย์ให้เรียงจากมากไปน้อย โดยแก้เงื่อนไขเปรียบเทียบจุดเดียว (โครง merge_sort ไม่ต้องแก้)",
        starter: String.raw`def merge(A, p, q, r):
    left = A[p: q+1]
    right = A[q+1: r+1]
    i = 0
    j = 0
    k = p
    while i < len(left) and j < len(right):
        # แก้บรรทัดถัดไปให้เรียงจากมากไปน้อย
        if left[i] <= right[j]:
            A[k] = left[i]
            i += 1
        else:
            A[k] = right[j]
            j += 1
        k += 1
    if i < len(left):
        A[k: r+1] = left[i:]
    if j < len(right):
        A[k: r+1] = right[j:]


def merge_sort(A, p=0, r=None):
    if r is None:
        r = len(A) - 1
    if p >= r:
        return
    q = (p + r) // 2
    merge_sort(A, p, q)
    merge_sort(A, q + 1, r)
    merge(A, p, q, r)


if __name__ == '__main__':
    A = [8, 3, 2, 9, 7, 1, 5, 4]
    merge_sort(A)
    print(A)`,
        solution: String.raw`def merge(A, p, q, r):
    left = A[p: q+1]
    right = A[q+1: r+1]
    i = 0
    j = 0
    k = p
    while i < len(left) and j < len(right):
        if left[i] >= right[j]:      # กลับเครื่องหมายจาก <= เป็น >=
            A[k] = left[i]
            i += 1
        else:
            A[k] = right[j]
            j += 1
        k += 1
    if i < len(left):
        A[k: r+1] = left[i:]
    if j < len(right):
        A[k: r+1] = right[j:]


def merge_sort(A, p=0, r=None):
    if r is None:
        r = len(A) - 1
    if p >= r:
        return
    q = (p + r) // 2
    merge_sort(A, p, q)
    merge_sort(A, q + 1, r)
    merge(A, p, q, r)


if __name__ == '__main__':
    A = [8, 3, 2, 9, 7, 1, 5, 4]
    merge_sort(A)
    print(A)`,
      },
    ],
  },

  /* ================================================================ บทที่ 6 */
  {
    id: "class-stack",
    no: 6,
    title: "Class and Objects, ADT และ Stack",
    summary: "คลาสและวัตถุ constructor ข้อมูลเชิงนามธรรม (ADT) และโครงสร้างข้อมูล Stack ตามเอกสารบรรยาย 6",
    goals: [
      "อธิบายแนวคิดของคลาส และวัตถุได้",
      "ใช้งานคลาส และวัตถุ เพื่อสร้างโครงสร้างข้อมูลพื้นฐานได้",
      "อธิบาย และใช้งานโครงสร้างข้อมูลแบบ Stack ได้",
    ],
    sections: [
      {
        heading: "6.1 คลาส และวัตถุ (Class and Objects)",
        body: `
          <p><b>คลาส</b> คือแบบหรือแม่พิมพ์ของวัตถุ หรือชนิดข้อมูลใหม่
          <b>วัตถุ (object)</b> สร้างมาจากคลาส คือตัวแปรที่เรากำหนดเองที่สร้างจากคลาส
          อาจเรียกว่าเป็น <b>instance</b></p>
          <p class="note">การออกแบบ class = ข้อมูล (ตัวแปร) + เมท็อด (ฟังก์ชัน)<br>
          วัตถุหรืออ็อบเจกต์ = ข้อมูล (ตัวแปร) + พฤติกรรม (ฟังก์ชัน)</p>
          <p><code>self</code> ต้องเป็นค่าพารามิเตอร์<b>ตัวแรกเสมอ</b>ในการประกาศฟังก์ชันในคลาส
          เป็นการระบุวัตถุตัวปัจจุบันที่กำลังทำงานอยู่ เหมือน <code>this</code> ในภาษา Java
          และการอ่านตัวแปรหรือ field ในคลาสต้องใช้ <code>self</code> เสมอ</p>
          <p>การเรียกใช้งานเมท็อดในวัตถุทำได้ 2 วิธี คือ
          <code>object.method(parameters)</code> และ <code>Class.method(object, parameters)</code></p>`,
        examples: [
          {
            title: "ตัวอย่าง 1-2 — คลาส birds และการเรียกเมท็อด 2 วิธี",
            code: String.raw`class birds():
    name = 'eagle'

    def fly(self):
        if self.name == 'eagle':
            print("I am an ", self.name, " and I can fly")


if __name__ == '__main__':
    eagle = birds()
    eagle.fly()
    #
    birds.fly(eagle)`,
          },
          {
            title: "ตัวอย่าง 3-4 — คลาส house ที่มีตัวแปรและหลายเมท็อด",
            code: String.raw`class house():
    w = 0.0
    h = 0.0
    area = 0.0

    def area(self):
        self.area = self.w * self.h

    def set(self, x, y):
        self.w = x
        self.h = y

    def show(self):
        print("Area is ", self.area)


if __name__ == '__main__':
    h1 = house()
    h1.set(2.5, 3.0)
    h1.area()
    h1.show()
    #
    h2 = house()
    h2.set(1.0, 2.0)
    h2.area()
    h2.show()`,
          },
        ],
      },

      {
        heading: "6.2 Constructor และ __str__",
        body: `
          <p><b>Constructor</b> คือเมท็อดที่มีไว้สำหรับตั้งค่าเริ่มต้นของวัตถุที่สร้างจากคลาส
          โดยจะถูกเรียกใช้<b>ครั้งเดียว</b>เมื่อมีการสร้างวัตถุจากคลาส
          สร้างด้วยคำสงวน <code>def __init__( ... )</code></p>
          <p>ตัวแปรปกปิดขึ้นต้นด้วย <code>_</code> เช่น <code>self._w</code></p>
          <p>เมท็อด <code>__str__</code> จะถูกเรียกใช้เมื่อใช้คำสั่ง <code>print</code> กับวัตถุนั้น</p>`,
        examples: [
          {
            title: "ตัวอย่าง 7 — คลาส house ที่มี constructor",
            code: String.raw`class house():
    def __init__(self, x, y):
        self._w = x
        self._h = y

    def area(self):
        area = self._w * self._h
        print("Area is ", area)


if __name__ == '__main__':
    #
    h1 = house(2.5, 3.0)
    #
    h1.area()`,
          },
          {
            title: "คลาส rectangle ที่เพิ่มส่วนแสดงผล __str__",
            code: String.raw`class rectangle():
    def __init__(self, x, y):
        self._x = x
        self._y = y

    def calArea(self):
        print("Area is ", self._x * self._y)

    def __str__(self):
        s = "Width: " + str(self._x) \
            + "\nHeight: " + str(self._y)
        return s


if __name__ == '__main__':
    r1 = rectangle(2.0, 3.0)
    print(r1)
    r1.calArea()`,
          },
        ],
      },

      {
        heading: "6.3 ข้อมูลเชิงนามธรรม (Abstract Data Type)",
        body: `
          <p>รากศัพท์ของคำว่า abstract หมายถึงการซ่อนรายละเอียดที่สำคัญ
          ดังนั้น <b>ADT</b> คือการสร้างชนิดข้อมูลขึ้นเพื่อเก็บข้อมูลและใช้งานในรูปแบบที่เรากำหนด
          โดยที่ผู้ใช้<b>ไม่จำเป็นต้องเข้าใจรายละเอียดภายใน</b>ก่อนที่จะใช้งานได้</p>
          <p class="note"><b>ADT = properties + operations</b> (ตัวบอกลักษณะ + การกระทำ)<br>
          <b>class = ตัวแปรของวัตถุ + เมท็อด</b></p>
          <p><b>ขั้นตอนการสร้างโครงสร้างข้อมูลใหม่ด้วยแนวคิด ADT โดยใช้ class</b></p>
          <ol>
            <li>ออกแบบคลาส ตั้งชื่อโครงสร้างข้อมูลโดยประกาศ <code>class</code>
            ซึ่งประกอบด้วยตัวแปรและเมท็อดที่ทำงานกับข้อมูลภายใน class</li>
            <li>สร้างวัตถุ (object) หรือ instance จากโครงสร้าง class ที่ประกาศไว้ในข้อ 1
            ในรูปแบบ <code>obj = class_name( … )</code></li>
            <li>เรียกใช้งานเมท็อดที่ประกาศภายใน class โดยอ้างอิงจากวัตถุที่สร้างจากข้อ 2
            ในรูปแบบ <code>&lt;ชื่อวัตถุ&gt;.&lt;เมท็อด&gt;</code></li>
          </ol>`,
        examples: [],
      },

      {
        heading: "6.4 โครงสร้างข้อมูล Stack",
        body: `
          <p>Stack เป็นโครงสร้างข้อมูลแบบ <b>push down</b> คือการใส่ก้อนข้อมูลจากด้านบนไปเรื่อย ๆ
          และการนำก้อนข้อมูลออกต้องเอาออกจากด้านบนเสมอ
          เรียกได้ว่าเป็นโครงสร้างข้อมูลแบบ <b>First In Last Out (FILO)</b></p>
          <ul>
            <li><b>push</b> คือการใส่ก้อนข้อมูลลงใน stack ทางด้านบน แล้วปรับตัวชี้ <code>top</code>
            ให้ชี้ก้อนข้อมูลบนสุด</li>
            <li><b>pop</b> คือการนำก้อนข้อมูลที่ <code>top</code> ชี้ออกจาก stack
            แล้วปรับตัวชี้ให้ชี้ก้อนที่อยู่ล่างลงไป</li>
          </ul>
          <div class="note warn"><b>อย่าลืม</b> เมท็อด <code>push</code> ในเอกสารบรรยาย
          พิมพ์ข้อความ <code>"Pushed element: "</code> ออกมาทุกครั้งที่ใส่ข้อมูลสำเร็จด้วย
          ถ้าโจทย์ถามผลการรัน ต้องนับบรรทัดเหล่านี้ด้วย</div>`,
        examples: [
          {
            title: "6.3.4 คลาส Stack สร้างด้วย LIST เต็มรูปแบบ",
            code: String.raw`class Stack:
    def __init__(self, size):
        self._top = -1
        self._data = [None] * size
        self._size = size

    def isFull(self):
        if (self._top + 1) == self._size:
            return True
        else:
            return False

    def push(self, item):
        if self.isFull() == True:
            print("Stack is full : ", item)
        else:
            self._top += 1
            self._data[self._top] = item
            print("Pushed element: ", item)
            # print("top: ", self._top)

    def isEmpty(self):
        if self._top == -1:
            return True
        else:
            return False

    def pop(self):
        # print("data: ", self._data)
        if (self.isEmpty() == False):
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            print("Stack is empty")
            return -1


if __name__ == '__main__':
    s1 = Stack(3)
    s1.push(5)
    s1.push(6)
    s1.push(1)
    s1.push(4)
    d = s1.pop()
    print("poped: ", d)
    d = s1.pop()
    print("poped: ", d)
    d = s1.pop()
    print("poped: ", d)
    d = s1.pop()`,
          },
          {
            title: "ตัวอย่างที่ Stack ขนาด 2 — ค่าที่เกินถูกปฏิเสธ",
            code: String.raw`class Stack:
    def __init__(self, size):
        self._top = -1
        self._data = [None] * size
        self._size = size

    def isFull(self):
        if (self._top + 1) == self._size:
            return True
        else:
            return False

    def push(self, item):
        if self.isFull() == True:
            print("Stack is full : ", item)
        else:
            self._top += 1
            self._data[self._top] = item
            print("Pushed element: ", item)

    def isEmpty(self):
        if self._top == -1:
            return True
        else:
            return False

    def pop(self):
        if (self.isEmpty() == False):
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            print("Stack is empty")
            return -1


if __name__ == '__main__':
    s1 = Stack(2)
    s1.push(5)
    s1.push(6)
    s1.push(1)
    item = s1.pop()
    print("item =", item)`,
          },
        ],
      },

      {
        heading: "6.5 การประยุกต์ใช้งาน Stack",
        body: `
          <ul>
            <li>ใช้จดจำย้อนกลับ (Backtracking) เช่น การทำ undo ในโปรแกรมทั่วไป</li>
            <li>ใช้งานใน compiler สำหรับการส่งค่าไปยังการเรียกโปรแกรมย่อย</li>
            <li>ใช้งานสำหรับการคำนวณพจน์คณิตศาสตร์ เช่น <code>(1 + 2) * 3</code></li>
            <li>ใช้เรียงลำดับอักษรหรือคำย้อนกลับ เช่น <b>THAI</b> เป็น <b>IAHT</b></li>
          </ul>
          <p><b>การคำนวณพจน์คณิตศาสตร์ด้วย Stack 2 อัน</b></p>
          <ol>
            <li>ใส่ตัวเลขลงไปใน Stack สำหรับตัวเลข (Operand Stack)</li>
            <li>ใส่ operator ลงใน Stack สำหรับ operator (Operator Stack)</li>
            <li>ถ้าเจอ <code>(</code> ไม่ต้องทำอะไร</li>
            <li>ถ้าเจอ <code>)</code> ให้ pop สองค่าจาก operand stack และ pop operator มา 1 ตัว</li>
            <li>เมื่อคำนวณได้แล้วให้ push ผลลัพธ์การคำนวณกลับไปใน Operand Stack</li>
          </ol>
          <p>ตัวอย่าง <code>( (4 + 2 ) * 3 )</code> จะได้คำตอบเป็น <b>18</b></p>`,
        examples: [
          {
            title: "ใช้ Stack กลับลำดับตัวอักษร THAI → IAHT",
            code: String.raw`class Stack:
    def __init__(self, size):
        self._top = -1
        self._data = [None] * size
        self._size = size

    def isFull(self):
        if (self._top + 1) == self._size:
            return True
        else:
            return False

    def push(self, item):
        if self.isFull() == True:
            print("Stack is full : ", item)
        else:
            self._top += 1
            self._data[self._top] = item

    def isEmpty(self):
        if self._top == -1:
            return True
        else:
            return False

    def pop(self):
        if (self.isEmpty() == False):
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            print("Stack is empty")
            return -1


def reverse(text):
    s = Stack(len(text))
    for ch in text:
        s.push(ch)
    result = ""
    while not s.isEmpty():
        result += s.pop()
    return result


if __name__ == '__main__':
    print(reverse("THAI"))
    print(reverse("Silpakorn"))`,
          },
          {
            title: "คำนวณพจน์คณิตศาสตร์ด้วย Stack 2 อัน",
            code: String.raw`class Stack:
    def __init__(self, size):
        self._top = -1
        self._data = [None] * size
        self._size = size

    def isFull(self):
        return (self._top + 1) == self._size

    def isEmpty(self):
        return self._top == -1

    def push(self, item):
        if self.isFull():
            print("Stack is full : ", item)
        else:
            self._top += 1
            self._data[self._top] = item

    def pop(self):
        if not self.isEmpty():
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            print("Stack is empty")
            return -1


def calculate(expr):
    operand = Stack(len(expr))
    operator = Stack(len(expr))

    for ch in expr:
        if ch == ' ' or ch == '(':
            continue
        elif ch.isdigit():
            operand.push(int(ch))
        elif ch in "+-*/":
            operator.push(ch)
        elif ch == ')':
            b = operand.pop()
            a = operand.pop()
            op = operator.pop()
            if op == '+':
                r = a + b
            elif op == '-':
                r = a - b
            elif op == '*':
                r = a * b
            else:
                r = a / b
            print("คำนวณ", a, op, b, "=", r)
            operand.push(r)

    return operand.pop()


if __name__ == '__main__':
    print("คำตอบ =", calculate("( (4 + 2 ) * 3 )"))`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "สร้างคลาส circle ที่มี constructor รับรัศมี มีเมท็อด calArea() แสดงพื้นที่ และ __str__ ที่คืนข้อความ Radius: r",
        starter: String.raw`class circle():
    def __init__(self, r):
        # เขียนโค้ดตรงนี้
        pass

    def calArea(self):
        pass

    def __str__(self):
        pass


if __name__ == '__main__':
    c1 = circle(2.0)
    print(c1)
    c1.calArea()`,
        solution: String.raw`class circle():
    def __init__(self, r):
        self._r = r

    def calArea(self):
        print("Area is ", 3.14159 * self._r * self._r)

    def __str__(self):
        s = "Radius: " + str(self._r)
        return s


if __name__ == '__main__':
    c1 = circle(2.0)
    print(c1)
    c1.calArea()`,
      },
      {
        prompt: "ใช้คลาส Stack ของอาจารย์ตรวจสอบว่าวงเล็บในข้อความสมดุลหรือไม่ เช่น '((a+b)*c)' สมดุล แต่ '((a+b)' ไม่สมดุล",
        starter: String.raw`class Stack:
    def __init__(self, size):
        self._top = -1
        self._data = [None] * size
        self._size = size

    def isFull(self):
        return (self._top + 1) == self._size

    def isEmpty(self):
        return self._top == -1

    def push(self, item):
        if self.isFull():
            print("Stack is full : ", item)
        else:
            self._top += 1
            self._data[self._top] = item

    def pop(self):
        if not self.isEmpty():
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            return -1


def balanced(text):
    # เขียนโค้ดตรงนี้
    pass


if __name__ == '__main__':
    print(balanced("((a+b)*c)"))
    print(balanced("((a+b)"))
    print(balanced(")("))`,
        solution: String.raw`class Stack:
    def __init__(self, size):
        self._top = -1
        self._data = [None] * size
        self._size = size

    def isFull(self):
        return (self._top + 1) == self._size

    def isEmpty(self):
        return self._top == -1

    def push(self, item):
        if self.isFull():
            print("Stack is full : ", item)
        else:
            self._top += 1
            self._data[self._top] = item

    def pop(self):
        if not self.isEmpty():
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            return -1


def balanced(text):
    s = Stack(len(text))
    for ch in text:
        if ch == "(":
            s.push(ch)
        elif ch == ")":
            if s.isEmpty():
                return False      # เจอวงเล็บปิดเกิน
            s.pop()
    return s.isEmpty()            # จบแล้วต้องว่างพอดี


if __name__ == '__main__':
    print(balanced("((a+b)*c)"))
    print(balanced("((a+b)"))
    print(balanced(")("))`,
      },
    ],
  },

  /* ================================================================ บทที่ 7 */
  {
    id: "linked-list",
    no: 7,
    title: "LinkedList และ Queue",
    summary: "Singly Linked List, การใส่และนำโหนดออก, Queue จาก deque, Circular และ Doubly Linked List ตามเอกสารบรรยาย 7",
    goals: [
      "อธิบายแนวคิดของโครงสร้างข้อมูล Linked List ได้",
      "เขียนโปรแกรมสร้างโครงสร้างข้อมูล Linked List ได้",
      "สร้าง Queue จาก <code>collections.deque</code> ได้",
    ],
    sections: [
      {
        heading: "7.1 แนวคิดของ Singly Linked List",
        body: `
          <p>แนวคิดพื้นฐานคือการออกแบบโครงสร้างข้อมูลให้เป็นก้อนหรือ <b>node</b>
          ที่มีการเชื่อมต่อกันไปเรื่อย ๆ โดยมีจุดเริ่มต้นและสิ้นสุด</p>
          <p><b>ข้อดีเหนือการเก็บข้อมูลแบบอาเรย์</b> คือ Linked List สามารถโตหรือลดขนาดลงได้
          ขณะที่โปรแกรมกำลังทำงาน โดยที่ตัวโปรแกรมไม่จำเป็นต้องรู้จำนวนโหนดตลอดเวลา</p>
          <p>หนึ่งโหนดประกอบด้วย<b>ส่วนข้อมูล</b> และ<b>ตัวชี้ (next)</b> ซึ่งชี้ไปยังก้อนข้อมูลถัดไป
          Linked List จำเป็นต้องมีตัวชี้ไปยังโหนดเริ่มต้น และส่วนใหญ่ควรมีตัวชี้ไปยังก้อนสุดท้ายด้วย
          โดยที่ตัวท้ายต้องชี้ไปยัง null ซึ่งใน Python คือ <code>None</code></p>`,
        examples: [
          {
            title: "ตัวอย่างที่ 7.1 — สร้าง Singly linked list ที่ประกอบด้วย 1 โหนด",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.__data = datum
        self.__next = None

    def getData(self):
        return self.__data

    def __str__(self):
        return str(self.__data)


if __name__ == '__main__':
    a = [1, "Happy"]
    one_list = Node(a)
    b = one_list.getData()
    print("data is ", b)`,
          },
          {
            title: "ตัวอย่างที่ 7.2 — เชื่อม 2 โหนดเข้าด้วยกัน",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def getData(self):
        return self.data

    def __str__(self):
        return str(self.data)


if __name__ == '__main__':
    d1 = ["65-1", "Mark"]
    d2 = ["65-2", "Ed"]
    head = Node(d1)
    node_2 = Node(d2)
    head.next = node_2
    print(head)
    print(head.next)`,
          },
          {
            title: "ตัวอย่างที่ 7.3 — เชื่อม 3 โหนดแล้ววิ่งไปทีละก้อน",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def getData(self):
        return self.data

    def __str__(self):
        return str(self.data)


if __name__ == '__main__':
    d1 = ["65-1", "Mark"]
    d2 = ["65-2", "Ed"]
    head = Node(d1)
    node_2 = Node(d2)
    head.next = node_2
    curr = head.next
    curr.next = Node(["65-3", "Ty"])

    curr = head
    print(curr)
    curr = curr.next
    print(curr)
    curr = curr.next
    print(curr)`,
          },
        ],
      },

      {
        heading: "7.2 การใส่โหนดที่ด้านท้าย (insertAtTail)",
        body: `
          <p><b>อัลกอริทึม</b> สร้างก้อนข้อมูลใหม่ <code>new_node</code> แล้วตรวจว่า Linked List ว่างหรือไม่</p>
          <ul>
            <li><b>กรณีที่ 1</b> ไม่มีก้อนข้อมูลใด ๆ ให้ตัวชี้ทั้ง <code>head</code> และ <code>tail</code>
            ชี้ที่ก้อนใหม่</li>
            <li><b>กรณีที่ 2</b> มีก้อนข้อมูลอยู่แล้ว ใส่ที่ <code>tail.next</code>
            แล้วเลื่อน <code>tail</code> มาที่ก้อนใหม่</li>
          </ul>
          <p>คลาส <code>LinkedList</code> ของอาจารย์เก็บทั้ง <code>_head</code>, <code>_tail</code>
          และ <code>_size</code> การใส่ที่ด้านท้ายจึงไม่ต้องไล่ทั้งรายการ</p>`,
        examples: [
          {
            title: "ตัวอย่างที่ 7.4 — LinkedList ที่ใส่โหนดด้านท้ายได้",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def getData(self):
        return self.data

    def __str__(self):
        return str(self.data)


class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None
        self._size = 0

    def insertAtTail(self, datum):
        new_node = Node(datum)
        if self._tail == None:
            self._tail = new_node
            self._head = new_node
        else:
            self._tail.next = new_node
            self._tail = self._tail.next

    def __str__(self):
        curr = self._head
        i = 1
        s = ""
        while curr != None:
            s = s + "node : " + str(i) + " " + str(curr) + "\n"
            curr = curr.next
            i += 1
        return(s)


if __name__ == '__main__':
    d1 = ["65-1", "Mark"]
    d2 = ["65-2", "Ed"]
    mylist = LinkedList()
    mylist.insertAtTail(d1)
    mylist.insertAtTail(d2)
    mylist.insertAtTail(["65-3", "Ty"])
    print(mylist)`,
          },
        ],
      },

      {
        heading: "7.3 การใส่และนำโหนดออกที่ด้านหัว",
        body: `
          <p><b>insertAtHead</b> มีสองขั้นตอนที่<b>ลำดับสำคัญมาก</b></p>
          <ol>
            <li><code>new_node.next = Head</code> ให้ก้อนใหม่ชี้ไปที่หัวเดิมก่อน</li>
            <li><code>Head = new_node</code> แล้วจึงย้ายหัวมาที่ก้อนใหม่</li>
          </ol>
          <div class="note warn">ถ้าสลับลำดับสองบรรทัดนี้ ก้อนใหม่จะชี้กลับมาที่ตัวเอง
          และข้อมูลเดิมทั้งรายการจะหายไปทันที เพราะไม่มีใครชี้ถึงมันอีก</div>
          <p><b>removeAtHead</b> ทำได้ด้วยการเลื่อน <code>Head = Head.next</code></p>`,
        examples: [
          {
            title: "ตัวอย่างที่ 7.5 / 7.6 — insertAtHead และ removeAtHead",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def getData(self):
        return self.data

    def __str__(self):
        return str(self.data)


class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None
        self._size = 0

    def insertAtTail(self, datum):
        new_node = Node(datum)
        if self._tail == None:
            self._tail = new_node
            self._head = new_node
        else:
            self._tail.next = new_node
            self._tail = self._tail.next

    def insertAtHead(self, datum):
        new_node = Node(datum)
        if self._head == None:
            self._tail = new_node
            self._head = new_node
        else:
            new_node.next = self._head
            self._head = new_node

    def removeAtHead(self):
        if (self._head != None):
            datum = self._head.data
            self._head = self._head.next
            return datum
        else:
            print("List is empty")
            return None

    def __str__(self):
        curr = self._head
        i = 1
        s = ""
        while curr != None:
            s = s + "node : " + str(i) + " " + str(curr) + "\n"
            curr = curr.next
            i += 1
        return(s)


if __name__ == '__main__':
    d1 = ["65-1", "Mark"]
    d2 = ["65-2", "Ed"]
    mylist = LinkedList()
    mylist.insertAtHead(d1)
    mylist.insertAtHead(d2)
    mylist.insertAtHead(["65-3", "Ty"])
    print(mylist)

    data = mylist.removeAtHead()
    print(data, "is removed.")
    print(mylist)`,
          },
        ],
      },

      {
        heading: "7.4 โครงสร้างข้อมูล Queue หรือ แถวรอ",
        body: `
          <p>Queue เป็นโครงสร้างข้อมูลสำหรับการสร้างแถวการรอ
          การนำก้อนข้อมูลเข้าคนละทางกับออก คือ<b>ใส่ด้านหลัง (rear)</b> และ
          <b>เอาออกด้านหน้า (front)</b> เรียกได้ว่าเป็นโครงสร้างข้อมูลแบบ
          <b>First In First Out (FIFO)</b></p>
          <ul>
            <li><b>Enqueue</b> คือกระบวนการใส่ข้อมูลลงไปในแถวรอ ต้องใส่ด้านหลัง</li>
            <li><b>Dequeue</b> คือกระบวนการเอาก้อนข้อมูลออก ต้องเอาออกจากด้านหน้า</li>
          </ul>
          <div class="note warn"><b>ข้อควรระวังจากสไลด์</b> โค้ดคลาส <code>Queue</code> ในเอกสารบรรยาย
          เรียกใช้ <code>self.is_empty()</code> ในเมท็อด <code>dequeue</code>
          แต่<b>ไม่ได้เขียนเมท็อด <code>is_empty</code> ไว้</b>
          ถ้าลอกตามสไลด์ตรง ๆ จะเกิด <code>AttributeError</code> ตอนรัน
          ตัวอย่างข้างล่างจึงเติมเมท็อดนี้เข้าไปให้ครบ</div>`,
        examples: [
          {
            title: "7.2.3 การสร้าง Queue ด้วย Python (เติม is_empty ที่สไลด์ตกไป)",
            code: String.raw`from collections import deque


class Queue:
    def __init__(self):
        self.items = deque()

    def is_empty(self):          # สไลด์เรียกใช้แต่ไม่ได้เขียนไว้
        return len(self.items) == 0

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()

    def size(self):
        return len(self.items)


if __name__ == '__main__':
    q = Queue()
    q.enqueue("A")
    q.enqueue("B")
    q.enqueue("C")
    print(q.dequeue())   # A
    print(q.dequeue())   # B
    print(q.dequeue())   # C`,
          },
          {
            title: "เทียบ Stack (FILO) กับ Queue (FIFO)",
            code: String.raw`from collections import deque


class Queue:
    def __init__(self):
        self.items = deque()

    def is_empty(self):
        return len(self.items) == 0

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()

    def size(self):
        return len(self.items)


if __name__ == '__main__':
    data = ["A", "B", "C"]

    q = Queue()
    for x in data:
        q.enqueue(x)
    out_q = []
    while not q.is_empty():
        out_q.append(q.dequeue())

    st = []
    for x in data:
        st.append(x)
    out_s = []
    while len(st) > 0:
        out_s.append(st.pop())

    print("ใส่เข้าไป      :", data)
    print("Queue (FIFO)  :", out_q)
    print("Stack (FILO)  :", out_s)`,
          },
        ],
      },

      {
        heading: "7.5 Circular และ Doubly Linked List",
        body: `
          <p><b>Circular Linked List</b> เชื่อมก้อนข้อมูลเป็นวงกลม
          มีการจำหัว ท้าย หรือตำแหน่งหนึ่งในวงกลม</p>
          <p><b>Doubly Linked List</b> มีการสร้างก้อนข้อมูลเปล่า <code>dummy</code>
          เพื่อจำหัวและท้าย และมีตัวอ้างอิงจำก้อนก่อนหน้า <code>prev</code> และก้อนถัดไป <code>next</code></p>
          <p><b>การใส่ก้อนข้อมูลด้านหน้าของ Doubly Linked List</b></p>
          <ol>
            <li>นำตัวชี้ prev ของก้อนใหม่ไปชี้ที่ header — <code>new_node.prev = header</code></li>
            <li>นำตัวชี้ next ของก้อนใหม่ไปชี้ที่ก้อนถัดไป — <code>new_node.next = header.next</code></li>
            <li><code>header.next.prev = new_node</code></li>
            <li><code>header.next = new_node</code></li>
          </ol>`,
        examples: [
          {
            title: "Doubly Linked List ที่เดินไป-กลับได้",
            code: String.raw`class DNode():
    def __init__(self, datum):
        self.data = datum
        self.prev = None
        self.next = None

    def __str__(self):
        return str(self.data)


class DoublyLinkedList():
    def __init__(self):
        self.header = DNode(None)      # ก้อนเปล่า dummy
        self.trailer = DNode(None)
        self.header.next = self.trailer
        self.trailer.prev = self.header

    def insertAtFront(self, datum):
        new_node = DNode(datum)
        new_node.prev = self.header
        new_node.next = self.header.next
        self.header.next.prev = new_node
        self.header.next = new_node

    def showForward(self):
        curr = self.header.next
        while curr != self.trailer:
            print(curr, end=" ")
            curr = curr.next
        print()

    def showBackward(self):
        curr = self.trailer.prev
        while curr != self.header:
            print(curr, end=" ")
            curr = curr.prev
        print()


if __name__ == '__main__':
    d = DoublyLinkedList()
    d.insertAtFront("SFP")
    d.insertAtFront("PVD")
    d.insertAtFront("JFK")
    d.showForward()
    d.showBackward()`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "เพิ่มเมท็อด search(value) ให้คลาส LinkedList ของอาจารย์ คืนตำแหน่งของโหนดที่ข้อมูลตรงกัน (เริ่มนับจาก 1) หรือ -1 ถ้าไม่พบ",
        starter: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def __str__(self):
        return str(self.data)


class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None
        self._size = 0

    def insertAtTail(self, datum):
        new_node = Node(datum)
        if self._tail == None:
            self._tail = new_node
            self._head = new_node
        else:
            self._tail.next = new_node
            self._tail = self._tail.next

    def search(self, value):
        # เขียนโค้ดตรงนี้
        pass


if __name__ == '__main__':
    mylist = LinkedList()
    mylist.insertAtTail("Mark")
    mylist.insertAtTail("Ed")
    mylist.insertAtTail("Ty")
    print(mylist.search("Ed"))
    print(mylist.search("Tim"))`,
        solution: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def __str__(self):
        return str(self.data)


class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None
        self._size = 0

    def insertAtTail(self, datum):
        new_node = Node(datum)
        if self._tail == None:
            self._tail = new_node
            self._head = new_node
        else:
            self._tail.next = new_node
            self._tail = self._tail.next

    def search(self, value):
        curr = self._head
        pos = 1
        while curr != None:
            if curr.data == value:
                return pos
            curr = curr.next
            pos += 1
        return -1


if __name__ == '__main__':
    mylist = LinkedList()
    mylist.insertAtTail("Mark")
    mylist.insertAtTail("Ed")
    mylist.insertAtTail("Ty")
    print(mylist.search("Ed"))
    print(mylist.search("Tim"))`,
      },
      {
        prompt: "จำลองแถวรอที่ธนาคาร รับชื่อลูกค้าจากผู้ใช้จนกว่าจะพิมพ์ q แล้วเรียกคิวออกมาทีละคนตามลำดับที่มา โดยใช้คลาส Queue",
        stdin: "สมชาย\nมานี\nปิติ\nq\n",
        starter: String.raw`from collections import deque


class Queue:
    def __init__(self):
        self.items = deque()

    def is_empty(self):
        return len(self.items) == 0

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()

    def size(self):
        return len(self.items)


if __name__ == '__main__':
    q = Queue()
    # รับชื่อจนกว่าจะพิมพ์ q แล้วเรียกคิวออกมาทีละคน
`,
        solution: String.raw`from collections import deque


class Queue:
    def __init__(self):
        self.items = deque()

    def is_empty(self):
        return len(self.items) == 0

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()

    def size(self):
        return len(self.items)


if __name__ == '__main__':
    q = Queue()
    while True:
        name = input("ชื่อลูกค้า (q เพื่อจบ): ")
        if name == "q":
            break
        q.enqueue(name)

    print("มีลูกค้าในคิว", q.size(), "คน")
    order = 1
    while not q.is_empty():
        print("เรียกคิวที่", order, ":", q.dequeue())
        order += 1
    print("หมดคิวแล้ว")`,
      },
    ],
  },
];

window.LESSONS = lessons;
})();
