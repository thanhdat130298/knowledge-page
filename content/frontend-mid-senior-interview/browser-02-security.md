# 37. Frontend security: XSS, CSRF, token storage

> Bài 37/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích XSS và cách phòng trên FE
- Hiểu CSRF với cookie session
- Đưa khuyến nghị lưu token thực tế

## Cách học / trả lời phỏng vấn

1. Security interview: nguyên tắc + ví dụ attack + mitigation.
2. Nhấn: FE không đủ; server phải validate.
3. Framework escape mặc định — nguy hiểm khi `v-html`/dangerouslySetHTML.

## Kiến thức cốt lõi

### 1. XSS

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
- Open redirect / `postMessage` origin check
- Dependency audit cơ bản

### 5. Câu trả lời mẫu

> “XSS nguy hiểm vì chạy trong origin. Em tránh HTML thô, dựa escape + CSP. Session cookie httpOnly + SameSite; nếu SPA bearer thì giảm CSRF nhưng phải chống XSS cực nghiêm.”


## Tự kiểm tra

1. v-html rủi ro gì?
2. SameSite=Lax giúp gì?
3. XSS vs CSRF khác nhau cốt lõi?

## Lỗi thường gặp

- Chỉ tin validate FE
- innerHTML với input user
- Copy token lên query string
