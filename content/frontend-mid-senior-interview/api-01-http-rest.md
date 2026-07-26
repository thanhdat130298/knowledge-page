# 38. HTTP/REST cho Frontend: status, errors, race & layer

> Bài 38/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích status code thường dùng
- Thiết kế error normalization phía FE
- Xử lý race khi search/filter

## Cách học / trả lời phỏng vấn

1. 401 vs 403 hay bị hỏi.
2. Tách API client layer khỏi UI.
3. AbortController là câu trả lời race chuẩn.

## Kiến thức cốt lõi

### 1. Method & status

- GET idempotent đọc; POST tạo; PUT/PATCH cập nhật; DELETE xóa
- 200/201 OK; 400 validation; **401** chưa xác thực; **403** không đủ quyền; 404; 409 conflict; 422; 500

### 2. API layer

```ts
// api/users.ts
export async function fetchUsers(params, signal?: AbortSignal) {
  const res = await http.get('/users', { params, signal })
  return mapUsers(res.data)
}
```

UI không parse raw axios error khắp nơi — normalize `{ code, message, fields }`.

### 3. Race condition search

Request cũ về sau → data sai. Fix: `AbortController`, tăng `requestId`, hoặc ignore nếu key lệch.

### 4. Pagination & filter

Đồng bộ query string với state URL — shareable, back button đúng. Server-side pagination với bảng lớn.

### 5. Câu trả lời mẫu

> “Em có http client chung, map lỗi thống nhất. 401 trigger refresh/login; 403 show không đủ quyền. Search có abort. List lớn sort/filter server.”


## Tự kiểm tra

1. 401 khác 403?
2. Idempotent nghĩa là gì với PUT?
3. Làm sao tránh stale response?

## Lỗi thường gặp

- Toast generic cho mọi lỗi
- Không hủy request cũ
- UI gọi fetch thẳng không layer
