# 20. Next.js App Router & React Server Components

> Bài 20/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt Server Component và Client Component
- Biết đặt ranh giới 'use client'
- Giải thích lợi ích RSC với bundle/data

## Cách trả lời phỏng vấn

1. Mặc định App Router: Server Component.
2. 'use client' đẩy component và children client-side boundary.
3. Tương tác (state, effect, event) → client; fetch/DB gần server → server.

## Kiến thức cốt lõi

### 1. Server Components

Chạy trên server, không ship JS interaction của chính chúng tới client (nói đúng mức phỏng vấn). Phù hợp: layout, fetch, markdown render.

### 2. Client Components

```tsx
'use client'
export function LikeButton() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}
```

Cần hooks/browser APIs/events.

### 3. Composition pattern

Server page fetch data → truyền props xuống Client island nhỏ (button, form interactive). Tránh bọc cả page bằng 'use client' sớm.

### 4. Câu trả lời mẫu

> “App Router mặc định server components để giảm JS và gần data. Em chỉ đánh dấu client ở phần tương tác. Pattern: server fetch + client islands.”


## Tóm tắt nhanh

- Default server
- Client cho interactivity
- Boundary nhỏ nhất có thể

## Tự kiểm tra

1. Dùng useState trong Server Component được không?
2. Vì sao không 'use client' cả layout gốc?
3. RSC giúp bundle thế nào (ý tưởng)?

## Lỗi thường gặp

- Toàn app là client component
- Import client lib vào server component bừa
- Nhầm RSC với 'không cần React'
