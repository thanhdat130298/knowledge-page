# 39. Auth phía Frontend: session, refresh, route guard

> Bài 39/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Mô tả flow login + refresh token
- Thiết kế route guard / middleware
- Phân biệt UI hide vs server authorize

## Cách học / trả lời phỏng vấn

1. Nhấn: ẩn nút ≠ bảo mật.
2. Refresh queue để tránh storm.
3. RBAC: permission từ server, FE chỉ phản ánh.

## Kiến thức cốt lõi

### 1. Flow phổ biến

1. Login → access token ngắn + refresh
2. API kèm access
3. 401 → refresh một lần → retry
4. Refresh fail → logout

### 2. Refresh storm

Nhiều request 401 đồng thời → hàng đợi refresh, chỉ 1 call refresh, các request khác await.

### 3. Route guard

Nuxt middleware / Next middleware / Vue router `beforeEach`: chưa login → login; thiếu permission → 403 page. Guard chỉ UX — API vẫn enforce.

### 4. RBAC trên UI

- Ẩn/disable theo permission
- Không tin client tự set role
- Menu có thể server-driven

### 5. Câu trả lời mẫu

> “Access ngắn hạn, refresh có kiểm soát queue. Guard điều hướng UX. Mọi thao tác nhạy cảm server check permission — FE chỉ mirror.”


## Tự kiểm tra

1. Vì sao cần refresh queue?
2. Ẩn button có đủ bảo mật không?
3. Middleware FE khác authorize API?

## Lỗi thường gặp

- Lưu password
- Refresh vô hạn loop
- Tin role trong JWT decode mà không verify server
