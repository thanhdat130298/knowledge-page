# 36. Browser platform: DOM, storage, CORS & networking FE

> Bài 36/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích event bubbling/capturing, delegation
- So sánh localStorage/sessionStorage/cookie
- Hiểu CORS từ góc FE

## Cách học / trả lời phỏng vấn

1. Nối DOM events với perf (delegation).
2. Cookie vs storage: security & size.
3. CORS là chính sách browser, không phải ‘API lỗi lung tung’.

## Kiến thức cốt lõi

### 1. Event flow

Capturing → target → bubbling. `stopPropagation` / `preventDefault` khác nhau.

**Delegation**: lắng nghe cha, xử lý theo `event.target` — tốt cho list động.

### 2. Reflow / repaint (nhắc nhanh)

Đọc layout (`offsetHeight`) xen ghi style liên tục → thrashing. Batch đọc/ghi; ưu tiên transform/opacity khi animate.

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


## Tự kiểm tra

1. Delegation giúp gì?
2. Vì sao không nên localStorage cho refresh token nếu có httpOnly?
3. Preflight xảy ra khi nào?

## Lỗi thường gặp

- Listener trên từng row không cleanup
- Coi CORS là bug backend ‘bậy’
- Lưu secret dài trong localStorage
