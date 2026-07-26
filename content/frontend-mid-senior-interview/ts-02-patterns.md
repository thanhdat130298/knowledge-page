# 34. TypeScript patterns: utility types, API typing, FE thực chiến

> Bài 34/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Dùng Partial/Pick/Omit/Record/ReturnType đúng chỗ
- Type response API và form values
- Tránh anti-pattern thường gặp

## Cách học / trả lời phỏng vấn

1. Nối utility type với use-case form/edit DTO.
2. Nhắc sync type với backend (OpenAPI/zod).
3. Senior: type ở biên (boundary), không type mọi chỗ nội bộ.

## Kiến thức cốt lõi

### 1. Utility types hay hỏi

```ts
type User = { id: string; name: string; role: 'admin' | 'user' }
type UserDraft = Partial<User>
type UserPublic = Omit<User, 'role'>
type Roles = Record<User['role'], string>
```

- `Partial`: form edit dần
- `Pick`/`Omit`: DTO hẹp
- `ReturnType`: lấy kiểu return của hàm

### 2. Typing API boundary

```ts
type ApiError = { code: string; message: string }
type ApiResult<T> = { data: T } | { error: ApiError }
```

Runtime validate (zod) + infer type → an toàn hơn tin JSON mù.

### 3. Component props

Ưu tiên props tường minh; tránh `props: any`. Với slot/children, dùng kiểu thư viện (`VNode`, `ReactNode`).

### 4. Strictness

`strict`, `noImplicitAny`, `strictNullChecks` — interviewer thích nghe em bật và xử lý null thay vì tắt.

### 5. Câu trả lời mẫu

> “Em type mạnh ở biên API/form bằng union + zod. Utility type để derive DTO. Tránh as unknown as T. Strict mode là mặc định dự án mới.”


## Tự kiểm tra

1. Omit khác Pick thế nào?
2. Vì sao cần runtime validate dù đã có TS?
3. Ép kiểu kép as unknown as X rủi ro gì?

## Lỗi thường gặp

- Duplicate type thủ công thay derive
- Tắt strict khi gặp lỗi
- Type chỉ ở UI, API vẫn any
