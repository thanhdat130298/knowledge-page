#!/usr/bin/env node
/**
 * P0+P1 gap fill for frontend-mid-senior-interview (lessons 33–44).
 * Run: node scripts/add-gap-fill-lessons.mjs
 * Then: npm run publish:content -- --dir=content/frontend-mid-senior-interview
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "content/frontend-mid-senior-interview");
const manifestPath = join(dir, "_manifest.json");
const TOTAL = 44;

function lesson({ n, title, goals, tips, body, mistakes, quiz }) {
  return `# ${String(n).padStart(2, "0")}. ${title}

> Bài ${n}/${TOTAL} — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

${goals.map((g) => `- ${g}`).join("\n")}

## Cách học / trả lời phỏng vấn

${tips.map((t, i) => `${i + 1}. ${t}`).join("\n")}

## Kiến thức cốt lõi

${body}

## Tự kiểm tra

${quiz.map((q, i) => `${i + 1}. ${q}`).join("\n")}

## Lỗi thường gặp

${mistakes.map((m) => `- ${m}`).join("\n")}
`;
}

function mockLesson({ n, title, goals, tips, body }) {
  return `# ${String(n).padStart(2, "0")}. ${title}

> Bài ${n}/${TOTAL} — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên) + debrief.

## Mục tiêu bài học

${goals.map((g) => `- ${g}`).join("\n")}

## Cách dùng

${tips.map((t, i) => `${i + 1}. ${t}`).join("\n")}

${body}

## Tự luyện

1. Bấm giờ, tự trả lời trước khi đọc đáp án mẫu.
2. Thu âm 1 lần và nghe lại chỗ lan man.
3. Viết 1 ví dụ từ project thật/giả định ERP.
`;
}

const lessons = [
  {
    file: "ts-01-fundamentals.md",
    category_slug: "typescript",
    n: 33,
    title: "TypeScript fundamentals cho phỏng vấn",
    goals: [
      "Phân biệt type vs interface, any/unknown/never",
      "Giải thích narrowing và union/intersection",
      "Nêu lợi ích TS trong codebase FE lớn",
    ],
    tips: [
      "Mở bằng: TS giảm bug runtime bằng contract compile-time.",
      "Tránh nói 'any cho nhanh' — nêu khi nào chấp nhận tạm.",
      "Luôn có ví dụ ngắn.",
    ],
    body: `### 1. \`type\` vs \`interface\`

- \`interface\`: khai báo object/shape, có thể merge declaration (declaration merging).
- \`type\`: union, intersection, mapped, conditional — linh hoạt hơn.

Thực tế team: interface cho object public API; type cho union/utility. Quan trọng hơn là **consistency**.

\`\`\`ts
type Id = string | number
interface User { id: Id; name: string }
\`\`\`

### 2. \`any\` / \`unknown\` / \`never\`

| | Ý nghĩa |
|---|---|
| \`any\` | Tắt typecheck — tránh |
| \`unknown\` | Chưa biết; phải narrow trước khi dùng |
| \`never\` | Không xảy ra (exhaustive check) |

\`\`\`ts
function assertNever(x: never): never {
  throw new Error('Unexpected: ' + x)
}
\`\`\`

### 3. Union, intersection, narrowing

\`\`\`ts
type Result = { ok: true; data: User } | { ok: false; error: string }

function handle(r: Result) {
  if (r.ok) return r.data.name // narrowed
  return r.error
}
\`\`\`

Narrow bằng \`typeof\`, \`in\`, discriminant field, type guard.

### 4. Generics (ý tưởng)

\`\`\`ts
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
\`\`\`

Dùng khi hàm/component tái sử dụng giữ quan hệ kiểu.

### 5. Câu trả lời mẫu ~45s

> “TS giúp contract rõ giữa API và UI. Em ưu tiên unknown thay any, dùng discriminated union cho state async. type/interface theo convention team; generics cho abstraction thật sự.”
`,
    quiz: [
      "Khi nào chọn unknown thay any?",
      "Discriminated union giúp gì?",
      "Declaration merging là gì?",
    ],
    mistakes: [
      "any tràn lan",
      "Ép \`as\` không kiểm chứng",
      "Over-engineer generic không cần",
    ],
  },
  {
    file: "ts-02-patterns.md",
    category_slug: "typescript",
    n: 34,
    title: "TypeScript patterns: utility types, API typing, FE thực chiến",
    goals: [
      "Dùng Partial/Pick/Omit/Record/ReturnType đúng chỗ",
      "Type response API và form values",
      "Tránh anti-pattern thường gặp",
    ],
    tips: [
      "Nối utility type với use-case form/edit DTO.",
      "Nhắc sync type với backend (OpenAPI/zod).",
      "Senior: type ở biên (boundary), không type mọi chỗ nội bộ.",
    ],
    body: `### 1. Utility types hay hỏi

\`\`\`ts
type User = { id: string; name: string; role: 'admin' | 'user' }
type UserDraft = Partial<User>
type UserPublic = Omit<User, 'role'>
type Roles = Record<User['role'], string>
\`\`\`

- \`Partial\`: form edit dần
- \`Pick\`/\`Omit\`: DTO hẹp
- \`ReturnType\`: lấy kiểu return của hàm

### 2. Typing API boundary

\`\`\`ts
type ApiError = { code: string; message: string }
type ApiResult<T> = { data: T } | { error: ApiError }
\`\`\`

Runtime validate (zod) + infer type → an toàn hơn tin JSON mù.

### 3. Component props

Ưu tiên props tường minh; tránh \`props: any\`. Với slot/children, dùng kiểu thư viện (\`VNode\`, \`ReactNode\`).

### 4. Strictness

\`strict\`, \`noImplicitAny\`, \`strictNullChecks\` — interviewer thích nghe em bật và xử lý null thay vì tắt.

### 5. Câu trả lời mẫu

> “Em type mạnh ở biên API/form bằng union + zod. Utility type để derive DTO. Tránh as unknown as T. Strict mode là mặc định dự án mới.”
`,
    quiz: [
      "Omit khác Pick thế nào?",
      "Vì sao cần runtime validate dù đã có TS?",
      "Ép kiểu kép as unknown as X rủi ro gì?",
    ],
    mistakes: [
      "Duplicate type thủ công thay derive",
      "Tắt strict khi gặp lỗi",
      "Type chỉ ở UI, API vẫn any",
    ],
  },
  {
    file: "ts-03-mock-session.md",
    category_slug: "typescript",
    n: 35,
    title: "Buổi interview TypeScript (45 phút) — kịch bản mock",
    goals: [
      "Đi hết warm-up → deep dive → scenario typing",
      "Thể hiện tư duy boundary typing",
      "Tự chấm sau buổi",
    ],
    tips: [
      "Bấm giờ 45’. Tự trả lời trước đáp án.",
      "Nói trade-off, không thuộc lòng định nghĩa.",
    ],
    mock: true,
    body: `## Agenda

| Phút | Nội dung |
|------|----------|
| 0–5 | Vì sao dùng TS |
| 5–20 | type/interface, unknown, narrowing |
| 20–35 | Generic + utility + API typing |
| 35–45 | Scenario form + hỏi ngược |

---

## Câu 1
### Interviewer
> Dự án JS chạy tốt — vì sao migrate TS?

### Ứng viên
> Giảm bug null/undefined, refactor an toàn hơn, DX autocomplete, contract rõ với backend. Chi phí: learning + typing legacy. Em migrate dần từ biên module mới.

---

## Câu 2
### Interviewer
> \`any\` vs \`unknown\`?

### Ứng viên
> any tắt kiểm tra. unknown buộc narrow. Em dùng unknown cho input bên ngoài (JSON, localStorage).

---

## Câu 3 — Scenario
### Interviewer
> Type hàm \`getUser(id)\` có thể 404 hoặc network error?

### Ứng viên
\`\`\`ts
type GetUserResult =
  | { status: 'ok'; user: User }
  | { status: 'not_found' }
  | { status: 'error'; message: string }
\`\`\`
> UI switch theo status — exhaustive với never.

---

## Câu 4
### Interviewer
> Form create/update User — type thế nào?

### Ứng viên
> \`CreateUserInput = Omit<User, 'id'>\`; update: \`Partial<CreateUserInput> & { id: string }\`. Validate runtime trước submit.

---

## Checklist tự chấm
- [ ] unknown > any
- [ ] Discriminated union
- [ ] Utility đúng chỗ
- [ ] Boundary + runtime validate
- [ ] Strict mindset
`,
  },
  {
    file: "browser-01-platform.md",
    category_slug: "browser",
    n: 36,
    title: "Browser platform: DOM, storage, CORS & networking FE",
    goals: [
      "Giải thích event bubbling/capturing, delegation",
      "So sánh localStorage/sessionStorage/cookie",
      "Hiểu CORS từ góc FE",
    ],
    tips: [
      "Nối DOM events với perf (delegation).",
      "Cookie vs storage: security & size.",
      "CORS là chính sách browser, không phải ‘API lỗi lung tung’.",
    ],
    body: `### 1. Event flow

Capturing → target → bubbling. \`stopPropagation\` / \`preventDefault\` khác nhau.

**Delegation**: lắng nghe cha, xử lý theo \`event.target\` — tốt cho list động.

### 2. Reflow / repaint (nhắc nhanh)

Đọc layout (\`offsetHeight\`) xen ghi style liên tục → thrashing. Batch đọc/ghi; ưu tiên transform/opacity khi animate.

### 3. Storage

| | Sống | Gửi kèm request | Dung lượng |
|---|---|---|---|
| cookie | theo Expires | có (nếu không) | nhỏ |
| localStorage | bền | không | ~5MB |
| sessionStorage | tab | không | ~5MB |

Không lưu access token dài hạn plain text nếu có lựa chọn httpOnly cookie.

### 4. CORS

Browser chặn JS đọc response cross-origin nếu server không cho phép origin. Preflight OPTIONS với method/header đặc biệt. FE không ‘tắt CORS’; phải config server hoặc proxy cùng origin.

### 5. Câu trả lời mẫu

> “Em dùng delegation cho list. Phân biệt cookie httpOnly và storage. CORS là bảo vệ trình duyệt — fix đúng chỗ server/proxy, không hack bằng plugin.”
`,
    quiz: [
      "Delegation giúp gì?",
      "Vì sao không nên localStorage cho refresh token nếu có httpOnly?",
      "Preflight xảy ra khi nào?",
    ],
    mistakes: [
      "Listener trên từng row không cleanup",
      "Coi CORS là bug backend ‘bậy’",
      "Lưu secret dài trong localStorage",
    ],
  },
  {
    file: "browser-02-security.md",
    category_slug: "browser",
    n: 37,
    title: "Frontend security: XSS, CSRF, token storage",
    goals: [
      "Giải thích XSS và cách phòng trên FE",
      "Hiểu CSRF với cookie session",
      "Đưa khuyến nghị lưu token thực tế",
    ],
    tips: [
      "Security interview: nguyên tắc + ví dụ attack + mitigation.",
      "Nhấn: FE không đủ; server phải validate.",
      "Framework escape mặc định — nguy hiểm khi \`v-html\`/dangerouslySetHTML.",
    ],
    body: `### 1. XSS

Attacker chạy JS trong origin của bạn → đọc DOM/storage, gọi API với session user.

Phòng:
- Escape output (mặc định template React/Vue)
- CSP
- Không nhúng HTML thô từ user
- Sanitize nếu bắt buộc rich text

### 2. CSRF

Browser tự gửi cookie session kèm request cross-site. Phòng: SameSite cookie, CSRF token, không dùng cookie session cho API theo cách dễ bị forge; với Bearer header thì CSRF ít hơn nhưng XSS nguy hiểm hơn với token JS-readable.

### 3. Token storage trade-off

| Cách | XSS | CSRF |
|---|---|---|
| localStorage + Bearer | rủi ro cao nếu XSS | thấp hơn |
| httpOnly Secure cookie | tốt hơn với XSS | cần chống CSRF |

### 4. Thực hành FE

- Không log token
- HTTPS everywhere
- Open redirect / \`postMessage\` origin check
- Dependency audit cơ bản

### 5. Câu trả lời mẫu

> “XSS nguy hiểm vì chạy trong origin. Em tránh HTML thô, dựa escape + CSP. Session cookie httpOnly + SameSite; nếu SPA bearer thì giảm CSRF nhưng phải chống XSS cực nghiêm.”
`,
    quiz: [
      "v-html rủi ro gì?",
      "SameSite=Lax giúp gì?",
      "XSS vs CSRF khác nhau cốt lõi?",
    ],
    mistakes: [
      "Chỉ tin validate FE",
      "innerHTML với input user",
      "Copy token lên query string",
    ],
  },
  {
    file: "api-01-http-rest.md",
    category_slug: "frontend-architecture",
    n: 38,
    title: "HTTP/REST cho Frontend: status, errors, race & layer",
    goals: [
      "Giải thích status code thường dùng",
      "Thiết kế error normalization phía FE",
      "Xử lý race khi search/filter",
    ],
    tips: [
      "401 vs 403 hay bị hỏi.",
      "Tách API client layer khỏi UI.",
      "AbortController là câu trả lời race chuẩn.",
    ],
    body: `### 1. Method & status

- GET idempotent đọc; POST tạo; PUT/PATCH cập nhật; DELETE xóa
- 200/201 OK; 400 validation; **401** chưa xác thực; **403** không đủ quyền; 404; 409 conflict; 422; 500

### 2. API layer

\`\`\`ts
// api/users.ts
export async function fetchUsers(params, signal?: AbortSignal) {
  const res = await http.get('/users', { params, signal })
  return mapUsers(res.data)
}
\`\`\`

UI không parse raw axios error khắp nơi — normalize \`{ code, message, fields }\`.

### 3. Race condition search

Request cũ về sau → data sai. Fix: \`AbortController\`, tăng \`requestId\`, hoặc ignore nếu key lệch.

### 4. Pagination & filter

Đồng bộ query string với state URL — shareable, back button đúng. Server-side pagination với bảng lớn.

### 5. Câu trả lời mẫu

> “Em có http client chung, map lỗi thống nhất. 401 trigger refresh/login; 403 show không đủ quyền. Search có abort. List lớn sort/filter server.”
`,
    quiz: [
      "401 khác 403?",
      "Idempotent nghĩa là gì với PUT?",
      "Làm sao tránh stale response?",
    ],
    mistakes: [
      "Toast generic cho mọi lỗi",
      "Không hủy request cũ",
      "UI gọi fetch thẳng không layer",
    ],
  },
  {
    file: "api-02-auth-fe.md",
    category_slug: "frontend-architecture",
    n: 39,
    title: "Auth phía Frontend: session, refresh, route guard",
    goals: [
      "Mô tả flow login + refresh token",
      "Thiết kế route guard / middleware",
      "Phân biệt UI hide vs server authorize",
    ],
    tips: [
      "Nhấn: ẩn nút ≠ bảo mật.",
      "Refresh queue để tránh storm.",
      "RBAC: permission từ server, FE chỉ phản ánh.",
    ],
    body: `### 1. Flow phổ biến

1. Login → access token ngắn + refresh
2. API kèm access
3. 401 → refresh một lần → retry
4. Refresh fail → logout

### 2. Refresh storm

Nhiều request 401 đồng thời → hàng đợi refresh, chỉ 1 call refresh, các request khác await.

### 3. Route guard

Nuxt middleware / Next middleware / Vue router \`beforeEach\`: chưa login → login; thiếu permission → 403 page. Guard chỉ UX — API vẫn enforce.

### 4. RBAC trên UI

- Ẩn/disable theo permission
- Không tin client tự set role
- Menu có thể server-driven

### 5. Câu trả lời mẫu

> “Access ngắn hạn, refresh có kiểm soát queue. Guard điều hướng UX. Mọi thao tác nhạy cảm server check permission — FE chỉ mirror.”
`,
    quiz: [
      "Vì sao cần refresh queue?",
      "Ẩn button có đủ bảo mật không?",
      "Middleware FE khác authorize API?",
    ],
    mistakes: [
      "Lưu password",
      "Refresh vô hạn loop",
      "Tin role trong JWT decode mà không verify server",
    ],
  },
  {
    file: "testing-01-strategy.md",
    category_slug: "testing",
    n: 40,
    title: "Testing strategy: unit, component, e2e",
    goals: [
      "Chọn đúng tầng test theo rủi ro",
      "Giải thích Testing Library mindset",
      "Nêu trade-off e2e vs unit",
    ],
    tips: [
      "Trophy/pyramid: nhiều unit/component, ít e2e đắt.",
      "Test hành vi user, không test implementation detail.",
      "Mock mạng ở boundary hợp lý.",
    ],
    body: `### 1. Tầng test

| Tầng | Ví dụ | Khi nào |
|------|--------|---------|
| Unit | pure function, utils | logic thuần |
| Component | Testing Library | UI tương tác |
| Integration | page + mock API | flow ngắn |
| E2E | Playwright | critical path |

### 2. Testing Library

\`\`\`ts
await userEvent.click(screen.getByRole('button', { name: /lưu/i }))
expect(screen.getByText(/thành công/i)).toBeInTheDocument()
\`\`\`

Query theo role/text — gần user & a11y.

### 3. E2E

Chậm, flake nếu không ổn định. Chỉ cover login → tạo entity → logout (hoặc 3–5 flow business).

### 4. Câu trả lời mẫu

> “Em test logic bằng unit, UI bằng Testing Library theo role, e2e vài critical flow. Không screenshot mọi thứ. Ưu tiên test hành vi.”
`,
    quiz: [
      "Vì sao tránh query bằng class CSS?",
      "E2E quá nhiều hại gì?",
      "Mock API ở đâu?",
    ],
    mistakes: [
      "Test snapshot lớn vô nghĩa",
      "Chỉ e2e không unit",
      "Test private state thay vì UI",
    ],
  },
  {
    file: "testing-02-mock-session.md",
    category_slug: "testing",
    n: 41,
    title: "Buổi interview Testing (30–40 phút) — mock",
    goals: [
      "Trả lời strategy + viết mô tả test case",
      "Thảo luận flake và CI",
    ],
    tips: ["Bấm giờ 35’.", "Nói rõ phạm vi không test."],
    mock: true,
    body: `## Câu 1
### Interviewer
> Em test form tạo user thế nào?

### Ứng viên
> Component test: hiện lỗi required, submit gọi API mock thành công/thất bại, disable nút khi pending. E2E: 1 case happy path trên staging nếu critical.

---

## Câu 2
### Interviewer
> Test bị flake — xử lý?

### Ứng viên
> Tìm wait thiếu, race, data shared. Dùng đợi theo role/assertion, isolation data, retry có kiểm soát, tránh timeout mù.

---

## Câu 3
### Interviewer
> Coverage 100% có cần?

### Ứng viên
> Không. Coverage là tín hiệu, không mục tiêu. Ưu tiên nhánh rủi ro nghiệp vụ.

---

## Checklist
- [ ] Pyramid rõ
- [ ] RTL mindset
- [ ] E2E hẹp
- [ ] Flake có quy trình
`,
  },
  {
    file: "git-01-pr-review.md",
    category_slug: "git-workflow",
    n: 42,
    title: "Git, PR & Code review cho phỏng vấn",
    goals: [
      "Mô tả flow branch/PR chuẩn",
      "Review theo checklist correctness → maintainability",
      "Xử lý disagreement chuyên nghiệp",
    ],
    tips: [
      "Nhỏ PR > PR khủng.",
      "Review: hành vi, edge case, security, a11y, test.",
      "Disagree với data/options, không công kích.",
    ],
    body: `### 1. Flow

feature branch → PR nhỏ → CI → review → squash/rebase theo team → deploy.

Commit message rõ ràng (why). Tránh secret trong git.

### 2. Checklist review

1. Correctness & edge cases  
2. Security/a11y/perf regression  
3. API contract  
4. Đọc được / naming  
5. Test đủ mức rủi ro  

### 3. Conflict ý kiến

> “Em thấy option A dễ test hơn vì… Option B nhanh ship nhưng nợ X. Team chọn theo ưu tiên sprint?”

### 4. Câu trả lời mẫu

> “Em giữ PR nhỏ, mô tả ảnh hưởng. Review ưu tiên bug/security trước style. Không đồng ý thì đưa trade-off và đề xuất POC ngắn.”
`,
    quiz: [
      "Vì sao PR nhỏ tốt hơn?",
      "Ưu tiên comment review theo thứ tự nào?",
      "Lỡ commit secret thì sao?",
    ],
    mistakes: [
      "PR 3000 dòng không context",
      "Nitpick style trước correctness",
      "Force push lung tung lên shared branch",
    ],
  },
  {
    file: "arch-01-ds-forms.md",
    category_slug: "frontend-architecture",
    n: 43,
    title: "Design System & Forms mindset (cross-stack)",
    goals: [
      "Phân biệt UI primitive vs business component",
      "Nêu nguyên tắc form: validation UX + source of truth",
      "Chọn lib form theo stack (RHF / VeeValidate mindset)",
    ],
    tips: [
      "DS = tốc độ + consistency + a11y.",
      "Form: controlled performance, schema validate.",
      "Tránh boolean props bùng nổ — dùng composition/slots.",
    ],
    body: `### 1. Design system

- **Primitive**: Button, Input, Modal (a11y/keyboard chuẩn)
- **Pattern**: FormField, DataTable
- **Business**: UserPicker (domain)

Token: color/spacing/typography. Document keyboard trong Storybook.

### 2. Khi tạo reusable component

Lặp 3+ lần, API ổn định, không copy business rule vào primitive.

Tránh: \`isSmall isPrimary isTableHeader isCompact...\` → variants + slots/composition.

### 3. Forms

- Source of truth: form state (RHF/VeeValidate) hoặc schema-driven
- Validate: UX client + **server là thật**
- Edit async: \`reset\` values khi data về
- Perf: uncontrolled/register khi form lớn; Controller khi cần

### 4. Câu trả lời mẫu

> “Em tách primitive khỏi business. Form dùng lib theo stack, schema validate, server vẫn enforce. DS giúp a11y/perf đồng nhất.”
`,
    quiz: [
      "Primitive khác business component?",
      "Boolean props bùng nổ xử lý sao?",
      "Client validate có thay server?",
    ],
    mistakes: [
      "Nhét API call vào Button",
      "Chỉ validate UI",
      "DS không document keyboard",
    ],
  },
  {
    file: "behavioral-01-full-fe-mock.md",
    category_slug: "behavioral-interview",
    n: 44,
    title: "Buổi interview Frontend tổng 60–90’ — kịch bản end-to-end",
    goals: [
      "Đi một vòng interview FE hoàn chỉnh: technical + soft",
      "Ghép JS/TS → framework → API/Auth → Perf/A11y → behavioral",
      "Có checklist tự chấm cuối buổi",
    ],
    tips: [
      "Luyện đủ 75’ nếu có thể.",
      "Mỗi câu: kết luận → giải thích → ví dụ → trade-off.",
      "Thành thật gap; nói cách bù.",
    ],
    mock: true,
    body: `## Agenda giả lập (75 phút)

| Phút | Phần |
|------|------|
| 0–8 | Intro + project nổi bật (STAR) |
| 8–20 | JS/TS warm deep |
| 20–35 | Framework (Vue/Nuxt hoặc React/Next) |
| 35–48 | API, auth, state |
| 48–60 | Perf + a11y nhanh |
| 60–70 | Testing/Git behavioral |
| 70–75 | Hỏi ngược |

---

## Phase A — Intro (8’)

### Interviewer
> Giới thiệu và 1 impact kỹ thuật gần đây?

### Ứng viên (STAR)
> Situation → Task → Action (2–3 quyết định kỹ thuật) → Result có số. Nhấn ownership và trade-off.

---

## Phase B — JS/TS (12’)

Hỏi gợi ý:
1. Event loop A/D/C/B  
2. Closure stale  
3. unknown vs any  
4. Discriminated union cho async state  

**Chốt:** microtask, stale closure, boundary typing.

---

## Phase C — Framework (15’)

### Vue track
Composition API, Pinia vs local state, Nuxt SSR vs SPA route.

### React/Next track
RSC boundary, cache/revalidate, client island.

### Interviewer
> Chọn Nuxt vs Next cho CMS marketing + dashboard login?

### Ứng viên
> Marketing SSR/SSG SEO; dashboard sau login ưu tiên TTI. Team skill quyết định stack. Hybrid routeRules / App Router segment phù hợp.

---

## Phase D — API & Auth (13’)

1. 401 vs 403  
2. Refresh queue  
3. Abort search  
4. Ẩn nút ≠ security  

---

## Phase E — Perf & A11y (12’)

1. LCP element + 2 fix  
2. CLS ảnh  
3. Modal focus trap  
4. axe không đủ  

---

## Phase F — Soft (10’)

### Interviewer
> Conflict với designer về contrast / deadline?

### Ứng viên
> Đưa tiêu chí WCAG + impact user; đề xuất token đạt AA; nếu deadline ép → ship kèm ticket nợ có owner/date.

### Interviewer
> Ước lượng sai — làm gì?

### Ứng viên
> Communicate sớm, cắt scope, giữ quality gate (test/a11y) cho phần ship.

---

## Hỏi ngược tốt
> Perf budget? Field RUM? Definition of Done có a11y/test? Quyền FE với API contract?

---

## Checklist tự chấm toàn buổi

- [ ] STAR gọn có số  
- [ ] JS event loop + closure  
- [ ] TS unknown/union  
- [ ] Framework có trade-off  
- [ ] Auth/RBAC đúng tầng  
- [ ] Perf metric đúng tên  
- [ ] A11y modal/keyboard  
- [ ] Test strategy hợp lý  
- [ ] Soft skills chuyên nghiệp  
- [ ] Hỏi ngược chất lượng  

**Mid**: đủ ý chính, ví dụ cụ thể.  
**Senior**: chủ động trade-off, process, phản biện bằng tiêu chí/số.
`,
  },
];

const prev = JSON.parse(readFileSync(manifestPath, "utf8"));

const extraCats = [
  {
    name: "TypeScript",
    slug: "typescript",
    description: "Type system cho JS hiện đại.",
    icon: "FileType",
    sort_order: 2,
  },
  {
    name: "Browser",
    slug: "browser",
    description: "Event loop, rendering, storage.",
    icon: "Globe",
    sort_order: 5,
  },
  {
    name: "Testing",
    slug: "testing",
    description: "Unit, integration, e2e.",
    icon: "TestTube",
    sort_order: 12,
  },
  {
    name: "Git & Workflow",
    slug: "git-workflow",
    description: "Git, PR, collaboration.",
    icon: "GitBranch",
    sort_order: 14,
  },
  {
    name: "Behavioral Interview",
    slug: "behavioral-interview",
    description: "Soft skills & storytelling.",
    icon: "MessagesSquare",
    sort_order: 15,
  },
];

const categories = [...(prev.categories || [])];
for (const c of extraCats) {
  if (!categories.some((x) => x.slug === c.slug)) categories.push(c);
}

const articles = [...(prev.articles || [])];

for (const L of lessons) {
  const md = L.mock
    ? mockLesson(L)
    : lesson(L);
  writeFileSync(join(dir, L.file), md, "utf8");
  const slug = `fe-mid-${String(L.n).padStart(2, "0")}-${L.file.replace(/\.md$/, "")}`;
  articles.push({
    title: `${String(L.n).padStart(2, "0")}. ${L.title}`,
    slug,
    file: L.file,
    series_order: L.n,
    level: "middle",
    category_slug: L.category_slug,
    is_featured: L.n === 44,
    excerpt: `Ôn phỏng vấn Frontend mid/senior: ${L.title}.`,
    seo_title: L.title.slice(0, 70),
    seo_description: `Tài liệu phỏng vấn: ${L.title}`.slice(0, 160),
  });
  console.log("Wrote", L.file);
}

for (const a of articles) {
  const path = join(dir, a.file);
  if (!existsSync(path)) continue;
  let md = readFileSync(path, "utf8");
  md = md.replace(/> Bài (\d+)\/\d+/m, `> Bài $1/${TOTAL}`);
  writeFileSync(path, md, "utf8");
}

prev.categories = categories;
prev.series = {
  ...prev.series,
  description:
    "Lộ trình ôn phỏng vấn Frontend mid→senior: JS/TS, HTML/CSS, Vue/Nuxt/Next, Browser/Security, API/Auth, Testing, Perf, A11y, Git & soft skills — có buổi mock tổng.",
};
prev.articles = articles;
writeFileSync(manifestPath, JSON.stringify(prev, null, 2));
console.log(`Manifest: ${articles.length} lessons`);
