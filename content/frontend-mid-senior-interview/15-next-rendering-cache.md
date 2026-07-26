# 21. Next.js rendering & caching

> Bài 21/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích static vs dynamic rendering
- Nói về revalidate / cache fetch
- Biết khi nào opt-out cache

## Cách trả lời phỏng vấn

1. Static: nhanh, rẻ; Dynamic: data theo request/user.
2. ISR/revalidate: cân bằng freshness và perf.
3. Auth/user-specific thường dynamic.

## Kiến thức cốt lõi

### 1. Static vs Dynamic

- Static: HTML có thể cache CDN
- Dynamic: render theo request (cookies, searchParams chưa được cache theo cách static)

### 2. `fetch` cache (App Router)

```ts
await fetch(url, { next: { revalidate: 60 } })
await fetch(url, { cache: 'no-store' })
```

### 3. Revalidate

Theo thời gian hoặc on-demand (sau mutation CMS). Interviewer thích nghe use-case: trang listing sản phẩm revalidate 60s.

### 4. Câu trả lời mẫu

> “Em chọn static/ISR cho nội dung ít cá nhân hóa, dynamic cho data user/auth. Dùng revalidate để giữ freshness. no-store khi cần luôn mới và chấp nhận chi phí.”


## Tóm tắt nhanh

- Static/ISR vs dynamic theo data
- revalidate có chiến lược
- User-specific → cẩn thận cache

## Tự kiểm tra

1. Trang profile user cache static được không? Vì sao?
2. revalidate: 60 nghĩa là gì?
3. Trade-off no-store?

## Lỗi thường gặp

- Cache trang có data riêng tư
- Không hiểu vì sao thấy data cũ
- Biến mọi thứ thành dynamic 'cho chắc'
