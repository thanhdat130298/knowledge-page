# 33. TypeScript fundamentals cho phỏng vấn

> Bài 33/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt type vs interface, any/unknown/never
- Giải thích narrowing và union/intersection
- Nêu lợi ích TS trong codebase FE lớn

## Cách học / trả lời phỏng vấn

1. Mở bằng: TS giảm bug runtime bằng contract compile-time.
2. Tránh nói 'any cho nhanh' — nêu khi nào chấp nhận tạm.
3. Luôn có ví dụ ngắn.

## Kiến thức cốt lõi

### 1. `type` vs `interface`

- `interface`: khai báo object/shape, có thể merge declaration (declaration merging).
- `type`: union, intersection, mapped, conditional — linh hoạt hơn.

Thực tế team: interface cho object public API; type cho union/utility. Quan trọng hơn là **consistency**.

```ts
type Id = string | number
interface User { id: Id; name: string }
```

### 2. `any` / `unknown` / `never`

| | Ý nghĩa |
|---|---|
| `any` | Tắt typecheck — tránh |
| `unknown` | Chưa biết; phải narrow trước khi dùng |
| `never` | Không xảy ra (exhaustive check) |

```ts
function assertNever(x: never): never {
  throw new Error('Unexpected: ' + x)
}
```

### 3. Union, intersection, narrowing

```ts
type Result = { ok: true; data: User } | { ok: false; error: string }

function handle(r: Result) {
  if (r.ok) return r.data.name // narrowed
  return r.error
}
```

Narrow bằng `typeof`, `in`, discriminant field, type guard.

### 4. Generics (ý tưởng)

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

Dùng khi hàm/component tái sử dụng giữ quan hệ kiểu.

### 5. Câu trả lời mẫu ~45s

> “TS giúp contract rõ giữa API và UI. Em ưu tiên unknown thay any, dùng discriminated union cho state async. type/interface theo convention team; generics cho abstraction thật sự.”


## Tự kiểm tra

1. Khi nào chọn unknown thay any?
2. Discriminated union giúp gì?
3. Declaration merging là gì?

## Lỗi thường gặp

- any tràn lan
- Ép `as` không kiểm chứng
- Over-engineer generic không cần
