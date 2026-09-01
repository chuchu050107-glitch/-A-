/**
 * เนื้อหาบทเรียนทั้งหมด เรียบเรียงจากเอกสารบรรยายวิชา 618240
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
    summary: "Bubble Sort, Selection Sort, Insertion Sort และการเรียงข้อมูลแบบ record หลายคอลัมน์",
    goals: [
      "อธิบายและเขียนโปรแกรม Bubble Sort ได้",
      "อธิบายและเขียนโปรแกรม Selection Sort ได้",
      "อธิบายและเขียนโปรแกรม Insertion Sort ได้",
      "นำอัลกอริทึมการเรียงไปใช้กับข้อมูลแบบ record ที่มีหลายคอลัมน์ได้",
    ],
    sections: [
      {
        heading: "4.1 ทำไมต้องศึกษาการเรียงลำดับ",
        body: `
          <p>ในการประมวลผลข้อมูลเรามักเจอปัญหาที่ต้องเรียงลำดับ เช่น เรียงตามรหัส
          เรียงมูลค่าสินค้า เรียงคะแนนสอบเข้ามหาวิทยาลัย</p>
          <p>ข้อมูลที่ใช้เป็นหลักในการเรียงเรียกว่า <strong>กุญแจ (key)</strong>
          เพราะข้อมูลหนึ่งชุดมักมีหลายส่วนที่เกี่ยวข้องกัน เช่น นักศึกษา 1 คนประกอบด้วย
          ชื่อ นามสกุล คะแนนเฉลี่ย — ถ้าจะเรียงตามคะแนน คะแนนก็คือ key
          และเมื่อย้าย key ข้อมูลอื่นในแถวเดียวกันต้องย้ายตามไปด้วย</p>
          <p>ทั้ง 3 อัลกอริทึมในบทนี้ใช้ฟังก์ชันช่วยตัวเดียวกันคือ <code>swap</code></p>`,
        examples: [
          {
            title: "ฟังก์ชัน swap สลับตำแหน่งสมาชิกใน list",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a

data = [8, 7, 2, 1]
print("ก่อนสลับ:", data)
swap(data, 0, 3)
print("หลังสลับ:", data)

# Python มีวิธีลัด เขียนได้ในบรรทัดเดียว
data[0], data[3] = data[3], data[0]
print("สลับกลับ:", data)`,
          },
        ],
      },
      {
        heading: "4.2 Bubble Sort",
        body: `
          <p><strong>แนวคิด:</strong> เปรียบเทียบ key สองตัวที่ติดกัน ถ้าลำดับไม่ถูกต้องก็สลับกัน
          ทำซ้ำไปเรื่อย ๆ ค่าที่น้อยที่สุดจะ “ลอย” ขึ้นไปด้านหน้าเหมือนฟองอากาศ</p>
          <p><strong>ข้อดี:</strong> เขียนง่ายที่สุด &nbsp;·&nbsp; <strong>ข้อเสีย:</strong> ช้าที่สุด — O(n²)</p>`,
        examples: [
          {
            title: "Bubble Sort",
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
            title: "Bubble Sort แบบแสดงทุกรอบ (ดูการทำงานทีละขั้น)",
            code: String.raw`def bubbleSortVerbose(a):
    N = len(a)
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] < a[j - 1]:
                a[j], a[j - 1] = a[j - 1], a[j]
        print("รอบ i =", i, "->", a)
    return a

data = [8, 4, 6, 9, 2, 3, 1]
print("เริ่มต้น    ->", data)
bubbleSortVerbose(data)
print("ผลลัพธ์    ->", data)`,
          },
        ],
      },
      {
        heading: "4.3 Selection Sort",
        body: `
          <p><strong>แนวคิด:</strong> รอบที่ 0 มองตั้งแต่ <code>a[0]</code> ไปทางขวา
          หา key ที่เล็กที่สุด แล้วนำมาสลับกับ <code>a[0]</code>
          จากนั้นเลื่อนไปที่ <code>a[1]</code> แล้วทำแบบเดิม ไปจนถึง <code>a[N-1]</code></p>
          <p>ต่างจาก Bubble Sort ตรงที่ <strong>สลับเพียงรอบละ 1 ครั้ง</strong> จึงเร็วกว่าในทางปฏิบัติ
          แม้จะเป็น O(n²) เหมือนกัน</p>`,
        examples: [
          {
            title: "Selection Sort",
            code: String.raw`def swap(a, i, j):
    tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
    return a

def selectionSort(a, N):
    for i in range(0, N - 1):
        min_idx = i
        for j in range(i + 1, N):
            if a[j] < a[min_idx]:
                min_idx = j
        swap(a, min_idx, i)
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
          <p><strong>แนวคิด:</strong> เหมือนการเรียงไพ่ที่ถือในมือ — หยิบไพ่จากโต๊ะมาทีละใบ
          แล้วแทรกลงในตำแหน่งที่ถูกต้องของไพ่ที่เรียงไว้แล้วในมือ</p>
          <p>ในแต่ละรอบ อาเรย์ถูกแบ่งเป็นสองส่วน: <strong>ส่วนซ้ายเรียงแล้ว</strong>
          และส่วนขวายังไม่เรียง โดย <code>key = a[i]</code> คือไพ่ใบที่กำลังจะแทรก</p>
          <p>Insertion Sort <strong>เร็วมากเมื่อข้อมูลเกือบเรียงอยู่แล้ว</strong> (กลายเป็น O(n))
          จึงถูกใช้เป็นส่วนหนึ่งของอัลกอริทึมเรียงลำดับสมัยใหม่</p>`,
        examples: [
          {
            title: "Insertion Sort",
            code: String.raw`def insertionSort(a, n):
    for i in range(1, n):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]     # เลื่อนตัวที่มากกว่าไปทางขวา
            j -= 1
        a[j + 1] = key          # แทรก key ลงตำแหน่งที่ถูกต้อง
    return a

if __name__ == '__main__':
    key = [8, 7, 2, 1]
    insertionSort(key, len(key))
    print(key)`,
          },
          {
            title: "เปรียบเทียบจำนวนครั้งที่ทำงานของทั้ง 3 อัลกอริทึม",
            code: String.raw`import random

def bubbleCount(a):
    a = a[:]
    n = len(a)
    ops = 0
    for i in range(n):
        for j in range(n - 1, 0, -1):
            ops += 1
            if a[j] < a[j - 1]:
                a[j], a[j - 1] = a[j - 1], a[j]
    return ops

def selectionCount(a):
    a = a[:]
    n = len(a)
    ops = 0
    for i in range(0, n - 1):
        m = i
        for j in range(i + 1, n):
            ops += 1
            if a[j] < a[m]:
                m = j
        a[m], a[i] = a[i], a[m]
    return ops

def insertionCount(a):
    a = a[:]
    ops = 0
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            ops += 1
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return ops

random.seed(1)
data = [random.randint(1, 100) for _ in range(30)]

print("ข้อมูลสุ่ม 30 ตัว")
print("Bubble    :", bubbleCount(data), "ครั้ง")
print("Selection :", selectionCount(data), "ครั้ง")
print("Insertion :", insertionCount(data), "ครั้ง")

print()
print("ข้อมูลที่เรียงอยู่แล้ว 30 ตัว")
sorted_data = sorted(data)
print("Bubble    :", bubbleCount(sorted_data), "ครั้ง")
print("Selection :", selectionCount(sorted_data), "ครั้ง")
print("Insertion :", insertionCount(sorted_data), "ครั้ง  <- เร็วกว่ามาก")`,
          },
        ],
      },
      {
        heading: "4.5 การเรียงข้อมูลแบบ Record",
        body: `
          <p>ข้อมูลจริงมักเป็น <em>record</em> คือหนึ่งแถวมีหลายคอลัมน์ เก็บเป็น list ซ้อน list
          เวลาเรียงต้องระบุว่าใช้คอลัมน์ไหนเป็น key และเมื่อย้าย ต้องย้ายทั้งแถวไปด้วยกัน</p>
          <p>วิธีทำคือแก้ <code>insertionSort</code> ให้เทียบ <code>r[j][key_col]</code>
          แทนที่จะเทียบ <code>a[j]</code> ตรง ๆ</p>`,
        examples: [
          {
            title: "เรียง record ด้วยคอลัมน์ที่เลือก",
            code: String.raw`def insertionSortRec(r, n, key_col):
    for i in range(1, n):
        key_rec = r[i]
        j = i - 1
        while j >= 0 and r[j][key_col] > key_rec[key_col]:
            r[j + 1] = r[j]
            j -= 1
        r[j + 1] = key_rec
    return r

if __name__ == '__main__':
    # [ชื่อ, SSN, Test1, Test2, Final]
    data = [['Mark', "123-65-6789", 75, 78, 82],
            ['Tim',  "123-65-5723", 67, 45, 74],
            ['Amy',  "123-65-4542", 78, 65, 90],
            ['Berk', "123-65-8278", 81, 74, 68]]

    print("เรียงตามชื่อ (คอลัมน์ 0)")
    insertionSortRec(data, len(data), 0)
    for row in data:
        print(row)

    print()
    print("เรียงตามคะแนน Final (คอลัมน์ 4)")
    insertionSortRec(data, len(data), 4)
    for row in data:
        print(row)`,
          },
          {
            title: "เรียง record ที่อ่านจากไฟล์ CSV",
            code: String.raw`import csv

def readRecordToList(filename):
    rows = []
    with open(filename, "r", newline="") as file:
        reader = csv.reader(file)
        next(reader)                      # ข้ามบรรทัดหัวตาราง
        for row in reader:
            row[3] = int(row[3])          # แปลงคะแนนเป็นตัวเลข
            row[4] = int(row[4])
            row[5] = int(row[5])
            rows.append(row)
    return rows

def insertionSortRec(r, n, key_col):
    for i in range(1, n):
        key_rec = r[i]
        j = i - 1
        while j >= 0 and r[j][key_col] > key_rec[key_col]:
            r[j + 1] = r[j]
            j -= 1
        r[j + 1] = key_rec
    return r

if __name__ == '__main__':
    data_list = readRecordToList("grades_short.csv")

    print("ก่อนเรียง")
    for row in data_list:
        print(row)

    key_column = 5                        # เรียงตามคะแนน Final
    insertionSortRec(data_list, len(data_list), key_column)

    print()
    print("หลังเรียงตามคะแนน Final")
    for row in data_list:
        print(row)`,
            files: { "grades_short.csv": GRADES_CSV },
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "แก้ bubbleSort ให้เรียงจากมากไปน้อย (จากเดิมน้อยไปมาก)",
        starter: String.raw`def bubbleSort(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] < a[j - 1]:      # <- แก้ตรงนี้
                a[j], a[j - 1] = a[j - 1], a[j]
    return a

print(bubbleSort([8, 4, 6, 9, 2], 5))
`,
        solution: String.raw`def bubbleSort(a, N):
    for i in range(N):
        for j in range(N - 1, 0, -1):
            if a[j] > a[j - 1]:      # เปลี่ยน < เป็น >
                a[j], a[j - 1] = a[j - 1], a[j]
    return a

print(bubbleSort([8, 4, 6, 9, 2], 5))`,
      },
      {
        prompt: "เขียน selectionSort ที่เรียง list ของสตริงตามความยาวของคำ (คำสั้นอยู่หน้า)",
        starter: String.raw`words = ["banana", "fig", "apple", "kiwi", "watermelon"]

def selectionSortByLen(a):
    # เขียนโค้ดตรงนี้
    return a

print(selectionSortByLen(words))
`,
        solution: String.raw`words = ["banana", "fig", "apple", "kiwi", "watermelon"]

def selectionSortByLen(a):
    n = len(a)
    for i in range(0, n - 1):
        m = i
        for j in range(i + 1, n):
            if len(a[j]) < len(a[m]):
                m = j
        a[m], a[i] = a[i], a[m]
    return a

print(selectionSortByLen(words))`,
      },
    ],
  },

  /* ================================================================ บทที่ 5 */
  {
    id: "recursion",
    no: 5,
    title: "ฟังก์ชันเรียกตัวเองและ Merge Sort",
    summary: "Recursion, แนวคิด Divide and Conquer และอัลกอริทึม Merge Sort ที่เร็วกว่า O(n²)",
    goals: [
      "อธิบายการทำงานของฟังก์ชันเรียกตัวเอง (recursive function) ได้",
      "แยกส่วน base case กับ recursive case ในฟังก์ชันเรียกตัวเองได้",
      "อธิบายแนวคิด Divide and Conquer ได้",
      "อธิบายและเขียนโปรแกรม Merge Sort ได้",
    ],
    sections: [
      {
        heading: "5.1 ฟังก์ชันเรียกตัวเอง (Recursive Function)",
        body: `
          <p>เมื่อฟังก์ชันเรียกใช้งาน <em>ตัวเอง</em> เราเรียกว่าฟังก์ชันเรียกตัวเอง</p>
          <p>ทุกฟังก์ชันเรียกตัวเองต้องมี 2 ส่วน</p>
          <ol>
            <li><strong>Base case</strong> — เงื่อนไขที่ทำให้ <em>หยุด</em> เรียกตัวเอง ถ้าไม่มีจะเรียกไม่รู้จบ</li>
            <li><strong>Recursive case</strong> — เรียกตัวเองด้วยปัญหาที่ <em>เล็กลง</em> เข้าใกล้ base case</li>
          </ol>`,
        examples: [
          {
            title: "ตัวอย่างพื้นฐาน: เรียกตัวเอง 3 ครั้ง",
            code: String.raw`def message(times):
    if times > 0:                     # base case: หยุดเมื่อ times = 0
        print("message is called")
        message(times - 1)            # เรียกตัวเองด้วยค่าที่เล็กลง

if __name__ == '__main__':
    message(3)`,
          },
          {
            title: "เห็นลำดับ “ขาไป” และ “ขากลับ” ของการเรียก",
            code: String.raw`def message(times):
    print("message is called, times =", times)
    if times > 0:
        message(times - 1)
    # ----- บรรทัดนี้ทำงานตอนขากลับ หลังจากการเรียกซ้อนคืนค่ากลับมาแล้ว
    print("message return with", times)

if __name__ == '__main__':
    message(3)

# สังเกตว่าขาไปนับ 3->0 แต่ขากลับนับ 0->3
# เพราะการเรียกซ้อนต้องจบก่อน บรรทัดหลังจากนั้นจึงทำงาน`,
          },
          {
            title: "ตัวอย่างคลาสสิก: factorial และ Fibonacci",
            code: String.raw`def factorial(n):
    if n <= 1:                 # base case
        return 1
    return n * factorial(n - 1)

def fib(n):
    if n < 2:                  # base case
        return n
    return fib(n - 1) + fib(n - 2)

for i in range(1, 8):
    print("{0}! = {1}".format(i, factorial(i)))

print()
print("Fibonacci:", [fib(i) for i in range(10)])`,
          },
          {
            title: "ลืม base case → RecursionError",
            code: String.raw`def broken(n):
    print("n =", n)
    broken(n - 1)      # ไม่มีเงื่อนไขหยุด

broken(3)

# Python จะหยุดให้เองเมื่อเรียกซ้อนลึกเกินขีดจำกัด แล้วโยน RecursionError`,
          },
        ],
      },
      {
        heading: "5.2 แนวคิด Divide and Conquer",
        body: `
          <p>“แบ่งแยกและเอาชนะ” คือรูปแบบการออกแบบอัลกอริทึมที่ใช้ recursion มี 4 ขั้น</p>
          <ol>
            <li><strong>Base case</strong> — ถ้าปัญหาเล็กพอแล้ว แก้ตรง ๆ ได้เลย</li>
            <li><strong>Divide</strong> — แบ่งปัญหาเป็นปัญหาย่อยที่คล้ายกันและเล็กลง</li>
            <li><strong>Conquer</strong> — แก้ปัญหาย่อยด้วยการเรียกตัวเอง</li>
            <li><strong>Combine</strong> — รวมคำตอบของปัญหาย่อยเป็นคำตอบของปัญหาใหญ่</li>
          </ol>`,
        examples: [
          {
            title: "Binary Search — ตัวอย่าง Divide and Conquer ที่ง่ายที่สุด",
            code: String.raw`def binarySearch(a, target, left, right):
    if left > right:                       # 1. base case: หาไม่เจอ
        return -1
    mid = (left + right) // 2              # 2. divide: แบ่งครึ่ง
    if a[mid] == target:
        return mid
    elif target < a[mid]:                  # 3. conquer: ค้นเฉพาะครึ่งที่เป็นไปได้
        return binarySearch(a, target, left, mid - 1)
    else:
        return binarySearch(a, target, mid + 1, right)

data = [1, 3, 5, 7, 9, 11, 13, 15]
for t in [7, 15, 4]:
    pos = binarySearch(data, t, 0, len(data) - 1)
    print("หา", t, "-> ตำแหน่ง", pos)`,
          },
        ],
      },
      {
        heading: "5.3 Merge Sort",
        body: `
          <p>Merge Sort ใช้ Divide and Conquer เต็มรูปแบบ</p>
          <pre style="background:var(--surface-2);padding:12px;border-radius:8px;overflow-x:auto;font-family:var(--mono);font-size:13px">MERGE-SORT A[0 .. N-1]
1. ถ้า N = 1  ->  เสร็จแล้ว (base case)
2. m = N / 2
3. Merge-Sort( ครึ่งซ้าย )
4. Merge-Sort( ครึ่งขวา )
5. "Merge" รวม 2 ส่วนที่เรียงแล้วเข้าด้วยกัน</pre>
          <p>หัวใจอยู่ที่ขั้นที่ 5 คือฟังก์ชัน <strong>merge</strong> ซึ่งรวม list ที่เรียงแล้ว 2 อัน
          เข้าเป็นอันเดียวที่ยังเรียงอยู่ โดยเทียบหัวของทั้งสองฝั่งแล้วหยิบตัวที่น้อยกว่าออกมาก่อน</p>
          <p class="note"><strong>ความเร็ว:</strong> Merge Sort เป็น <strong>O(n log n)</strong>
          เร็วกว่า Bubble/Selection/Insertion (O(n²)) มากเมื่อข้อมูลเยอะ
          — ข้อมูล 1,000 ตัว O(n²) ทำราว 1,000,000 ครั้ง แต่ O(n log n) ทำราว 10,000 ครั้ง</p>`,
        examples: [
          {
            title: "ฟังก์ชัน merge — รวม list ที่เรียงแล้ว 2 อัน",
            code: String.raw`def merge(left, right):
    result = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # ฝั่งที่ยังเหลือ ต่อท้ายได้เลยเพราะเรียงอยู่แล้ว
    result += left[i:]
    result += right[j:]
    return result

a = [1, 9, 11, 12]
b = [2, 7, 13, 20]
print("ซ้าย :", a)
print("ขวา  :", b)
print("รวม  :", merge(a, b))`,
          },
          {
            title: "Merge Sort เต็มรูปแบบ",
            code: String.raw`def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result += left[i:]
    result += right[j:]
    return result

def mergeSort(a):
    if len(a) <= 1:                  # base case
        return a
    mid = len(a) // 2                # divide
    left = mergeSort(a[:mid])        # conquer
    right = mergeSort(a[mid:])
    return merge(left, right)        # combine

if __name__ == '__main__':
    data = [8, 3, 5, 1, 9, 2, 7, 4]
    print("ก่อนเรียง:", data)
    print("หลังเรียง:", mergeSort(data))`,
          },
          {
            title: "ดูการแบ่งและการรวมทีละขั้น",
            code: String.raw`def merge(left, right, depth):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result += left[i:]
    result += right[j:]
    print("  " * depth + "รวม {0} + {1} -> {2}".format(left, right, result))
    return result

def mergeSort(a, depth=0):
    if len(a) <= 1:
        return a
    print("  " * depth + "แบ่ง " + str(a))
    mid = len(a) // 2
    left = mergeSort(a[:mid], depth + 1)
    right = mergeSort(a[mid:], depth + 1)
    return merge(left, right, depth)

mergeSort([8, 3, 5, 1, 9, 2])`,
          },
          {
            title: "วัดความเร็วจริง: Merge Sort เทียบ Bubble Sort",
            code: String.raw`import random, time

def bubbleSort(a):
    a = a[:]
    n = len(a)
    for i in range(n):
        for j in range(n - 1, 0, -1):
            if a[j] < a[j - 1]:
                a[j], a[j - 1] = a[j - 1], a[j]
    return a

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result += left[i:]
    result += right[j:]
    return result

def mergeSort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    return merge(mergeSort(a[:mid]), mergeSort(a[mid:]))

random.seed(7)
data = [random.randint(1, 10000) for _ in range(1200)]

t0 = time.time()
r1 = bubbleSort(data)
t1 = time.time()
r2 = mergeSort(data)
t2 = time.time()

print("ข้อมูล", len(data), "ตัว")
print("Bubble Sort : {0:.3f} วินาที".format(t1 - t0))
print("Merge Sort  : {0:.3f} วินาที".format(t2 - t1))
print("ผลลัพธ์ตรงกัน:", r1 == r2)`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "เขียนฟังก์ชันเรียกตัวเอง sumTo(n) ที่คืนผลรวม 1 + 2 + ... + n",
        starter: String.raw`def sumTo(n):
    # base case กับ recursive case
    pass

print(sumTo(5))    # ควรได้ 15
print(sumTo(100))  # ควรได้ 5050
`,
        solution: String.raw`def sumTo(n):
    if n <= 0:
        return 0
    return n + sumTo(n - 1)

print(sumTo(5))
print(sumTo(100))`,
      },
      {
        prompt: "เขียนฟังก์ชันเรียกตัวเอง reverse(s) ที่กลับด้านสตริง เช่น 'THAI' → 'IAHT'",
        starter: String.raw`def reverse(s):
    # ใบ้: สตริงว่างคือ base case  และ s[0] คือตัวแรก  s[1:] คือที่เหลือ
    pass

print(reverse("THAI"))
`,
        solution: String.raw`def reverse(s):
    if len(s) == 0:
        return ""
    return reverse(s[1:]) + s[0]

print(reverse("THAI"))`,
      },
    ],
  },

  /* ================================================================ บทที่ 6 */
  {
    id: "class-stack",
    no: 6,
    title: "คลาส วัตถุ ADT และ Stack",
    summary: "การเขียนโปรแกรมเชิงวัตถุ, constructor, แนวคิด Abstract Data Type และโครงสร้างข้อมูล Stack",
    goals: [
      "อธิบายแนวคิดของคลาสและวัตถุได้",
      "สร้างคลาสพร้อม constructor และเมท็อดได้",
      "อธิบายแนวคิด Abstract Data Type (ADT) ได้",
      "อธิบายและสร้างโครงสร้างข้อมูล Stack พร้อมนำไปประยุกต์ใช้ได้",
    ],
    sections: [
      {
        heading: "6.1 แนวคิดของคลาสและวัตถุ",
        body: `
          <p>การเขียนโปรแกรมเชิงวัตถุ (Object Oriented Programming) ต่างจากการเขียนแบบ
          Procedural (เช่นภาษา C ที่เรียนใน Com. Pro. ปี 1) ตรงที่เน้นใช้ <em>วัตถุ</em> ในการแก้ปัญหา
          โดยฟังก์ชันจะย้ายเข้าไปอยู่ภายในวัตถุ</p>
          <ul>
            <li><strong>คลาส (class)</strong> คือแบบหรือแม่พิมพ์ — เหมือน “แบบแปลนบ้าน”</li>
            <li><strong>วัตถุ (object)</strong> คือของจริงที่สร้างจากคลาส — เหมือน “บ้านที่สร้างเสร็จ”
            เรียกอีกอย่างว่า <em>instance</em></li>
          </ul>
          <p><code>class = ข้อมูล (ตัวแปร) + เมท็อด (ฟังก์ชัน)</code></p>
          <p class="note"><strong><code>self</code> คืออะไร:</strong> ต้องเป็นพารามิเตอร์ตัวแรกเสมอ
          ของทุกเมท็อดในคลาส ใช้ระบุ “วัตถุตัวปัจจุบันที่กำลังทำงานอยู่” เทียบได้กับ
          <code>this</code> ในภาษา Java — และการอ่านตัวแปรในคลาสต้องใช้ <code>self.</code> เสมอ</p>`,
        examples: [
          {
            title: "คลาสแรก",
            code: String.raw`class birds():
    name = 'eagle'

    def fly(self):
        if self.name == 'eagle':
            print("I am an", self.name, "and I can fly")

if __name__ == '__main__':
    eagle = birds()     # สร้างวัตถุจากคลาส
    eagle.fly()         # เรียกใช้เมท็อดของวัตถุ`,
          },
          {
            title: "คลาส house ที่มีตัวแปรและหลายเมท็อด",
            code: String.raw`class house():
    w = 0.0
    h = 0.0
    result = 0.0

    def calc(self):
        self.result = self.w * self.h

    def set(self, x, y):
        self.w = x
        self.h = y

    def show(self):
        print("Area is", self.result)

if __name__ == '__main__':
    h1 = house()
    h1.set(2.5, 3.0)
    h1.calc()
    h1.show()

    # สร้างวัตถุอีกตัวจากคลาสเดิม แยกข้อมูลกันคนละชุด
    h2 = house()
    h2.set(10.0, 4.0)
    h2.calc()
    h2.show()`,
          },
        ],
      },
      {
        heading: "6.2 Constructor",
        body: `
          <p>Constructor คือเมท็อดที่ใช้ <strong>ตั้งค่าเริ่มต้น</strong> ของวัตถุ
          ถูกเรียกใช้ครั้งเดียวอัตโนมัติตอนสร้างวัตถุจากคลาส สร้างด้วยชื่อสงวน
          <code>def __init__(self, ...)</code></p>
          <p>ตัวแปรที่ต้องการ <em>ปกปิด</em> ไม่ให้แก้จากภายนอกโดยตรง นิยมขึ้นต้นด้วย <code>_</code></p>`,
        examples: [
          {
            title: "คลาสที่มี constructor",
            code: String.raw`class house():
    def __init__(self, x, y):
        self._w = x
        self._h = y

    def area(self):
        area = self._w * self._h
        print("Area is", area)

if __name__ == '__main__':
    h1 = house(2.5, 3.0)     # __init__ ถูกเรียกอัตโนมัติตรงนี้
    h1.area()

    h2 = house(6.0, 7.0)
    h2.area()`,
          },
          {
            title: "เพิ่ม __str__ เพื่อกำหนดวิธีแสดงผลของวัตถุ",
            code: String.raw`class Student():
    def __init__(self, sid, name, score):
        self._id = sid
        self._name = name
        self._score = score

    def getScore(self):
        return self._score

    def __str__(self):
        return "[{0}] {1} = {2}".format(self._id, self._name, self._score)

if __name__ == '__main__':
    s1 = Student("65-1", "Mark", 82)
    s2 = Student("65-2", "Amy", 90)

    print(s1)             # print เรียก __str__ ให้อัตโนมัติ
    print(s2)
    print("คะแนนรวม =", s1.getScore() + s2.getScore())`,
          },
        ],
      },
      {
        heading: "6.3 ข้อมูลเชิงนามธรรม (Abstract Data Type)",
        body: `
          <p>คำว่า <em>abstract</em> หมายถึงการ <strong>ซ่อนรายละเอียดภายใน</strong>
          ดังนั้น ADT คือการสร้างชนิดข้อมูลขึ้นมาใหม่เพื่อเก็บและใช้งานในรูปแบบที่เรากำหนด
          โดยผู้ใช้ไม่จำเป็นต้องรู้ว่าข้างในทำงานอย่างไร</p>
          <p style="text-align:center"><code>ADT = properties + operations</code><br>
          <small>ตัวบอกลักษณะ + การกระทำ</small></p>
          <p>ในภาษาเชิงวัตถุอย่าง Python หรือ Java เราใช้ <code>class</code> สร้าง ADT
          เพราะ <code>class = ตัวแปรของวัตถุ + เมท็อด</code> ตรงกับนิยามพอดี</p>
          <p>ตัวอย่าง: ตอนใช้ <code>list</code> ของ Python เราแค่เรียก <code>append()</code>
          โดยไม่ต้องรู้ว่าข้างในจัดการหน่วยความจำอย่างไร — นั่นคือ ADT ที่ทำงานได้ดี</p>`,
      },
      {
        heading: "6.4 โครงสร้างข้อมูล Stack",
        body: `
          <p>Stack คือโครงสร้างข้อมูลแบบ <em>push down</em> — ใส่ข้อมูลจากด้านบนไปเรื่อย ๆ
          และเวลาเอาออกต้องเอาออกจากด้านบนเสมอ เหมือนกองจานที่วางซ้อนกัน</p>
          <p>เรียกว่าโครงสร้างแบบ <strong>First In Last Out (FILO)</strong>
          หรือ Last In First Out (LIFO) ก็ได้</p>
          <table class="tbl">
            <tr><th>การกระทำ</th><th>ความหมาย</th></tr>
            <tr><td><code>push(item)</code></td><td>ใส่ข้อมูลลงด้านบนสุด แล้วเลื่อนตัวชี้ <code>top</code> ขึ้น</td></tr>
            <tr><td><code>pop()</code></td><td>เอาข้อมูลบนสุดออก แล้วเลื่อนตัวชี้ <code>top</code> ลง</td></tr>
            <tr><td><code>isFull()</code></td><td>ตรวจว่า stack เต็มหรือยัง</td></tr>
            <tr><td><code>isEmpty()</code></td><td>ตรวจว่า stack ว่างหรือไม่ (<code>top == -1</code>)</td></tr>
          </table>`,
        examples: [
          {
            title: "คลาส Stack เต็มรูปแบบ",
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
            print("Stack is full :", item)
        else:
            self._top += 1
            self._data[self._top] = item
            print("Pushed element:", item)

    def pop(self):
        if not self.isEmpty():
            item = self._data[self._top]
            self._top -= 1
            return item
        else:
            print("Stack is empty")
            return -1

    def peek(self):
        if self.isEmpty():
            return None
        return self._data[self._top]

if __name__ == '__main__':
    s1 = Stack(3)
    s1.push(5)
    s1.push(6)
    s1.push(1)
    s1.push(4)              # เต็มแล้ว ใส่ไม่ได้

    print("บนสุดคือ", s1.peek())
    print()

    print("poped:", s1.pop())
    print("poped:", s1.pop())
    print("poped:", s1.pop())
    s1.pop()                # ว่างแล้ว`,
          },
          {
            title: "ตัวอย่างการทำงานทีละขั้นตามสไลด์",
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
            print("เต็ม ใส่", item, "ไม่ได้")
            return
        self._top += 1
        self._data[self._top] = item

    def pop(self):
        if self.isEmpty():
            return None
        item = self._data[self._top]
        self._top -= 1
        return item

    def peek(self):
        return None if self.isEmpty() else self._data[self._top]

s = Stack(5)
print("ขั้น 1 push green"); s.push("green")
print("ขั้น 2 push blue");  s.push("blue")
print("ขั้น 3 pop ได้", s.pop())
print("ขั้น 4 push red");   s.push("red")
print("ขั้น 5 บนสุดคือ", s.peek())
print("ขั้น 6 pop ได้", s.pop())
print("ขั้น 7 pop ได้", s.pop())
print("ว่างหรือยัง:", s.isEmpty())`,
          },
        ],
      },
      {
        heading: "6.5 การประยุกต์ใช้งาน Stack",
        body: `
          <ul>
            <li><strong>จดจำย้อนกลับ (Backtracking)</strong> — เช่นการทำ undo ในโปรแกรมทั่วไป</li>
            <li>ใช้ใน compiler สำหรับการส่งค่าไปยังโปรแกรมย่อย (นี่คือเหตุผลที่ recursion ลึกเกินแล้วพัง)</li>
            <li>ใช้คำนวณพจน์คณิตศาสตร์ เช่น <code>((4 + 2) * 3)</code></li>
            <li>ใช้กลับลำดับตัวอักษร เช่น <code>THAI</code> เป็น <code>IAHT</code></li>
          </ul>
          <p><strong>ขั้นตอนการคำนวณนิพจน์ด้วย Stack 2 อัน</strong></p>
          <ol>
            <li>เจอตัวเลข → push ลง operand stack</li>
            <li>เจอ operator → push ลง operator stack</li>
            <li>เจอ <code>(</code> → ไม่ต้องทำอะไร</li>
            <li>เจอ <code>)</code> → pop ตัวเลข 2 ตัวจาก operand stack และ operator 1 ตัว แล้วคำนวณ</li>
            <li>push ผลลัพธ์กลับลง operand stack</li>
          </ol>`,
        examples: [
          {
            title: "กลับลำดับตัวอักษรด้วย Stack",
            code: String.raw`class Stack:
    def __init__(self):
        self._data = []

    def push(self, item):
        self._data.append(item)

    def pop(self):
        if self.isEmpty():
            return None
        return self._data.pop()

    def isEmpty(self):
        return len(self._data) == 0

def reverse(text):
    s = Stack()
    for ch in text:
        s.push(ch)
    result = ""
    while not s.isEmpty():
        result += s.pop()
    return result

print(reverse("THAI"))
print(reverse("Silpakorn"))`,
          },
          {
            title: "คำนวณนิพจน์คณิตศาสตร์ด้วย Stack 2 อัน",
            code: String.raw`def evaluate(expr):
    operands = []
    operators = []

    for token in expr.split():
        if token == '(':
            pass                                # ขั้น 3: ไม่ต้องทำอะไร
        elif token in ('+', '-', '*', '/'):
            operators.append(token)             # ขั้น 2
        elif token == ')':
            b = operands.pop()                  # ขั้น 4
            a = operands.pop()
            op = operators.pop()
            if op == '+':
                r = a + b
            elif op == '-':
                r = a - b
            elif op == '*':
                r = a * b
            else:
                r = a / b
            print("  คำนวณ {0} {1} {2} = {3}".format(a, op, b, r))
            operands.append(r)                  # ขั้น 5
        else:
            operands.append(float(token))       # ขั้น 1

    return operands.pop()

expr = "( ( 4 + 2 ) * 3 )"
print("นิพจน์:", expr)
print("คำตอบ =", evaluate(expr))`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "สร้างคลาส Rectangle ที่มี constructor รับความกว้างและความสูง มีเมท็อด area() และ perimeter()",
        starter: String.raw`class Rectangle:
    # เขียนโค้ดตรงนี้
    pass

r = Rectangle(4, 6)
print("พื้นที่ =", r.area())
print("เส้นรอบรูป =", r.perimeter())
`,
        solution: String.raw`class Rectangle:
    def __init__(self, w, h):
        self._w = w
        self._h = h

    def area(self):
        return self._w * self._h

    def perimeter(self):
        return 2 * (self._w + self._h)

r = Rectangle(4, 6)
print("พื้นที่ =", r.area())
print("เส้นรอบรูป =", r.perimeter())`,
      },
      {
        prompt: "ใช้ Stack ตรวจสอบว่าวงเล็บในข้อความสมดุลหรือไม่ เช่น '((a+b)*c)' สมดุล แต่ '((a+b)' ไม่สมดุล",
        starter: String.raw`def isBalanced(text):
    stack = []
    # เจอ ( ให้ push, เจอ ) ให้ pop
    # ถ้าจะ pop ตอน stack ว่าง หรือจบแล้ว stack ยังไม่ว่าง = ไม่สมดุล
    return False

print(isBalanced("((a+b)*c)"))   # True
print(isBalanced("((a+b)"))      # False
print(isBalanced("a+b)("))       # False
`,
        solution: String.raw`def isBalanced(text):
    stack = []
    for ch in text:
        if ch == '(':
            stack.append(ch)
        elif ch == ')':
            if len(stack) == 0:
                return False
            stack.pop()
    return len(stack) == 0

print(isBalanced("((a+b)*c)"))
print(isBalanced("((a+b)"))
print(isBalanced("a+b)("))`,
      },
    ],
  },

  /* ================================================================ บทที่ 7 */
  {
    id: "linked-list",
    no: 7,
    title: "Linked List และ Queue",
    summary: "Singly Linked List, การเพิ่ม/ลบโหนด, Queue ด้วย deque และแนวคิด Doubly Linked List",
    goals: [
      "อธิบายแนวคิดและองค์ประกอบของ Linked List ได้",
      "เขียนโปรแกรมสร้าง Singly Linked List พร้อมเพิ่มและลบโหนดได้",
      "อธิบายและสร้างโครงสร้างข้อมูล Queue ได้",
      "อธิบายความต่างระหว่าง Singly, Circular และ Doubly Linked List ได้",
    ],
    sections: [
      {
        heading: "7.1 แนวคิดของ Linked List",
        body: `
          <p>แนวคิดพื้นฐานคือออกแบบข้อมูลให้เป็น <strong>ก้อน (node)</strong> ที่เชื่อมต่อกันไปเรื่อย ๆ
          โดยมีจุดเริ่มต้นและสิ้นสุด เพิ่มหรือลบก้อนได้ผ่านฟังก์ชันที่เราสร้างขึ้น</p>
          <p><strong>ข้อดีเหนือกว่าอาเรย์:</strong></p>
          <ul>
            <li>โตหรือลดขนาดได้ <em>ขณะโปรแกรมกำลังทำงาน</em></li>
            <li>โปรแกรมไม่จำเป็นต้องรู้จำนวนโหนดล่วงหน้า</li>
          </ul>
          <p><strong>องค์ประกอบของ 1 โหนด:</strong> ส่วนข้อมูล (<code>data</code>)
          และตัวชี้ (<code>next</code>) ซึ่งชี้ไปยังก้อนถัดไป</p>
          <p>Linked List ต้องมีตัวชี้ไปยังโหนดแรกเรียกว่า <strong>head</strong>
          และส่วนใหญ่ควรมีตัวชี้ไปโหนดสุดท้ายเรียกว่า <strong>tail</strong>
          โดยตัว <code>next</code> ของโหนดสุดท้ายต้องชี้ไปที่ <code>None</code></p>
          <pre style="background:var(--surface-2);padding:12px;border-radius:8px;overflow-x:auto;font-family:var(--mono);font-size:13px">head                         tail
 |                            |
 v                            v
[Mark|•]--->[Ed|•]--->[Ty|None]</pre>`,
        examples: [
          {
            title: "7.1 สร้างโหนดเดียว",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def getData(self):
        return self.data

    def __str__(self):
        return str(self.data)

if __name__ == '__main__':
    a = [1, "Happy"]
    one_node = Node(a)
    b = one_node.getData()
    print("data is", b)
    print("next ชี้ไปที่", one_node.next)`,
          },
          {
            title: "7.2 เชื่อม 2 โหนดเข้าด้วยกัน",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def __str__(self):
        return str(self.data)

if __name__ == '__main__':
    d1 = ["65-1", "Mark"]
    d2 = ["65-2", "Ed"]

    head = Node(d1)
    node_2 = Node(d2)
    head.next = node_2          # เชื่อมด้วยตัวอ้างอิง next

    print(head)
    print(head.next)`,
          },
          {
            title: "7.3 เชื่อม 3 โหนดแล้ววิ่งไปทีละก้อน",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def __str__(self):
        return str(self.data)

if __name__ == '__main__':
    head = Node(["65-1", "Mark"])
    node_2 = Node(["65-2", "Ed"])
    head.next = node_2

    curr = head.next
    curr.next = Node(["65-3", "Ty"])

    # วิ่งจาก head ไปเรื่อย ๆ จนกว่า next จะเป็น None
    curr = head
    while curr != None:
        print(curr)
        curr = curr.next`,
          },
        ],
      },
      {
        heading: "7.2 การใส่โหนดที่ด้านท้าย (insertAtTail)",
        body: `
          <p><strong>อัลกอริทึม</strong></p>
          <pre style="background:var(--surface-2);padding:12px;border-radius:8px;overflow-x:auto;font-family:var(--mono);font-size:13px">สร้างก้อนข้อมูลใหม่ new_node

ถ้า linked list ว่าง (tail == None):
    กรณีที่ 1 — ยังไม่มีก้อนใด ๆ
    head และ tail ชี้ที่ new_node ทั้งคู่
มิฉะนั้น:
    กรณีที่ 2 — มีก้อนอยู่แล้ว
    tail.next = new_node
    tail = new_node</pre>
          <p>เมท็อด <code>__str__</code> ของ LinkedList ใช้วิธี <em>วิ่งไปทีละก้อน</em> (traverse)
          โดยเริ่มที่ <code>head</code> แล้วเลื่อนด้วย <code>curr = curr.next</code>
          จนกว่าจะเจอ <code>None</code></p>`,
        examples: [
          {
            title: "7.4 คลาส LinkedList ที่ใส่โหนดด้านท้ายได้",
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
        self._size += 1

    def __str__(self):
        curr = self._head
        i = 1
        s = ""
        while curr != None:
            s = s + "node : " + str(i) + " " + str(curr) + "\n"
            curr = curr.next
            i += 1
        return s

if __name__ == '__main__':
    mylist = LinkedList()
    mylist.insertAtTail(["65-1", "Mark"])
    mylist.insertAtTail(["65-2", "Ed"])
    mylist.insertAtTail(["65-3", "Ty"])
    print(mylist)`,
          },
        ],
      },
      {
        heading: "7.3 การใส่และนำโหนดออกที่ด้านหัว",
        body: `
          <p><strong>insertAtHead</strong> — สลับลำดับให้ดี ไม่งั้นจะทำก้อนเดิมหายทั้งสาย</p>
          <ol>
            <li><code>new_node.next = head</code> — ให้ก้อนใหม่ชี้ไปที่ก้อนแรกเดิม</li>
            <li><code>head = new_node</code> — แล้วค่อยเลื่อน head มาที่ก้อนใหม่</li>
          </ol>
          <p><strong>removeAtHead</strong> — เก็บข้อมูลของ head ไว้ แล้วเลื่อน
          <code>head = head.next</code> ก้อนเดิมจะไม่มีใครชี้ถึงและถูกเก็บกวาดอัตโนมัติ</p>`,
        examples: [
          {
            title: "7.5 / 7.6 insertAtHead และ removeAtHead",
            code: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

    def __str__(self):
        return str(self.data)

class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None

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
            new_node.next = self._head      # 1. ชี้ไปก้อนแรกเดิม
            self._head = new_node           # 2. เลื่อน head

    def removeAtHead(self):
        if self._head != None:
            datum = self._head.data
            self._head = self._head.next
            if self._head == None:
                self._tail = None
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
        return s

if __name__ == '__main__':
    mylist = LinkedList()
    mylist.insertAtTail(["65-1", "Mark"])
    mylist.insertAtTail(["65-2", "Ed"])
    print("เริ่มต้น:")
    print(mylist)

    mylist.insertAtHead(["65-3", "Ty"])
    print("หลัง insertAtHead:")
    print(mylist)

    data = mylist.removeAtHead()
    print("removeAtHead ได้:", data)
    print(mylist)`,
          },
        ],
      },
      {
        heading: "7.4 โครงสร้างข้อมูล Queue (แถวรอ)",
        body: `
          <p>Queue คือโครงสร้างข้อมูลสำหรับสร้างแถวรอ ต่างจาก Stack ตรงที่
          <strong>เข้าคนละทางกับออก</strong></p>
          <ul>
            <li><strong>Enqueue</strong> — ใส่ก้อนข้อมูลที่ด้านหลัง (rear)</li>
            <li><strong>Dequeue</strong> — เอาก้อนข้อมูลออกที่ด้านหน้า (front)</li>
          </ul>
          <p>จึงเรียกว่าโครงสร้างแบบ <strong>First In First Out (FIFO)</strong>
          — เหมือนคนต่อแถวซื้อของ ใครมาก่อนได้ก่อน</p>
          <p>Python มี <code>collections.deque</code> ที่เอาข้อมูลออกจากด้านหน้าได้เร็ว
          จึงเหมาะกับการทำ Queue มากกว่าการใช้ <code>list</code> ธรรมดา</p>`,
        examples: [
          {
            title: "Queue ด้วย collections.deque",
            code: String.raw`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)          # ใส่ด้านหลัง

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()      # เอาออกด้านหน้า

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

if __name__ == '__main__':
    q = Queue()
    q.enqueue("A")
    q.enqueue("B")
    q.enqueue("C")
    print("ในแถวมี", q.size(), "คน")

    print(q.dequeue())   # A  เข้าก่อนออกก่อน
    print(q.dequeue())   # B
    print(q.dequeue())   # C
    print("ว่างหรือยัง:", q.is_empty())`,
          },
          {
            title: "เทียบ Stack (FILO) กับ Queue (FIFO)",
            code: String.raw`from collections import deque

stack = []
queue = deque()

for x in ["A", "B", "C"]:
    stack.append(x)
    queue.append(x)

print("ใส่เข้าไปตามลำดับ: A B C")
print()

print("Stack (FILO) เอาออกได้:", end=" ")
while stack:
    print(stack.pop(), end=" ")
print()

print("Queue (FIFO) เอาออกได้:", end=" ")
while queue:
    print(queue.popleft(), end=" ")
print()`,
          },
        ],
      },
      {
        heading: "7.5 Circular และ Doubly Linked List",
        body: `
          <p><strong>Circular Linked List</strong> — เชื่อมก้อนข้อมูลเป็นวงกลม
          โหนดสุดท้ายชี้กลับมาที่โหนดแรกแทนที่จะชี้ <code>None</code>
          มีการจำหัว ท้าย หรือตำแหน่งหนึ่งในวงกลม</p>
          <p><strong>Doubly Linked List</strong> — แต่ละโหนดมีตัวอ้างอิง 2 ตัว
          คือ <code>prev</code> ชี้ก้อนก่อนหน้า และ <code>next</code> ชี้ก้อนถัดไป
          ทำให้เดินย้อนกลับได้ นิยมสร้างก้อนเปล่า “dummy” ไว้ที่หัวและท้ายเพื่อลดกรณีพิเศษ</p>
          <p><strong>ขั้นตอนการใส่ก้อนที่ด้านหน้าของ Doubly Linked List</strong> — ลำดับสำคัญมาก</p>
          <ol>
            <li><code>new_node.prev = header</code></li>
            <li><code>new_node.next = header.next</code></li>
            <li><code>header.next.prev = new_node</code></li>
            <li><code>header.next = new_node</code></li>
          </ol>`,
        examples: [
          {
            title: "Doubly Linked List เดินไป-กลับได้",
            code: String.raw`class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

    def __str__(self):
        return str(self.data)

class DoublyLinkedList:
    def __init__(self):
        self._head = None
        self._tail = None

    def insertAtTail(self, data):
        node = DNode(data)
        if self._tail == None:
            self._head = node
            self._tail = node
        else:
            node.prev = self._tail
            self._tail.next = node
            self._tail = node

    def forward(self):
        out = []
        curr = self._head
        while curr != None:
            out.append(str(curr))
            curr = curr.next
        return " -> ".join(out)

    def backward(self):
        out = []
        curr = self._tail
        while curr != None:
            out.append(str(curr))
            curr = curr.prev
        return " -> ".join(out)

if __name__ == '__main__':
    dll = DoublyLinkedList()
    for code in ["JFK", "PVD", "SFO"]:
        dll.insertAtTail(code)

    print("เดินหน้า :", dll.forward())
    print("ย้อนกลับ:", dll.backward())`,
          },
        ],
      },
    ],
    exercises: [
      {
        prompt: "เพิ่มเมท็อด search(value) ให้ LinkedList คืนตำแหน่งของโหนดที่มีข้อมูลตรงกัน (เริ่มนับจาก 1) หรือ -1 ถ้าไม่พบ",
        starter: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None

    def insertAtTail(self, datum):
        node = Node(datum)
        if self._tail == None:
            self._head = node
            self._tail = node
        else:
            self._tail.next = node
            self._tail = node

    def search(self, value):
        # เขียนโค้ดตรงนี้
        return -1

mylist = LinkedList()
for x in ["Mark", "Ed", "Ty"]:
    mylist.insertAtTail(x)

print(mylist.search("Ed"))    # ควรได้ 2
print(mylist.search("Bob"))   # ควรได้ -1
`,
        solution: String.raw`class Node():
    def __init__(self, datum):
        self.data = datum
        self.next = None

class LinkedList():
    def __init__(self):
        self._head = None
        self._tail = None

    def insertAtTail(self, datum):
        node = Node(datum)
        if self._tail == None:
            self._head = node
            self._tail = node
        else:
            self._tail.next = node
            self._tail = node

    def search(self, value):
        curr = self._head
        i = 1
        while curr != None:
            if curr.data == value:
                return i
            curr = curr.next
            i += 1
        return -1

mylist = LinkedList()
for x in ["Mark", "Ed", "Ty"]:
    mylist.insertAtTail(x)

print(mylist.search("Ed"))
print(mylist.search("Bob"))`,
      },
      {
        prompt: "จำลองแถวรอที่ธนาคาร: รับชื่อลูกค้าจากผู้ใช้จนกว่าจะพิมพ์ 'q' แล้วเรียกคิวออกมาทีละคนตามลำดับที่มา",
        starter: String.raw`from collections import deque

queue = deque()
# เขียนโค้ดตรงนี้
`,
        stdin: "Somchai\nMalee\nAnan\nq",
        solution: String.raw`from collections import deque

queue = deque()
while True:
    name = input("ชื่อลูกค้า (q เพื่อจบ): ")
    if name == "q":
        break
    queue.append(name)
    print("  ", name, "เข้าคิวแล้ว มีทั้งหมด", len(queue), "คน")

print()
print("เริ่มเรียกคิว")
n = 1
while len(queue) > 0:
    print("คิวที่", n, ":", queue.popleft())
    n += 1`,
      },
    ],
  },
];

window.LESSONS = lessons;
})();
