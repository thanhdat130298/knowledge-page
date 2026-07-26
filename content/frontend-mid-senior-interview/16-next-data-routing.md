# 22. Next.js data, Server Actions & routing

> Bài 22/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích Server Actions ở mức phỏng vấn
- Biết route handlers vs actions
- Nêu middleware use-cases

## Cách trả lời phỏng vấn

1. Server Actions: mutation từ form/component, chạy server.
2. Route Handlers: API endpoints trong app.
3. Middleware: auth rewrite/redirect sớm tại edge/network boundary (tuỳ runtime).

## Kiến thức cốt lõi

### 1. Server Actions

```ts
async function createItem(formData: FormData) {
  'use server'
  // validate + db write
}
```

Hợp form progressive; vẫn phải validate server, CSRF/strategy theo docs version.

### 2. Route Handlers

`app/api/.../route.ts` — GET/POST cho client khác, webhook, upload.

### 3. Routing nâng cao (ý tưởng)

Parallel routes / intercepting routes: modal trong app shell — biết concept là đủ mid trừ khi JD nhấn mạnh.

### 4. Middleware

Check cookie session → redirect login; geo/A-B; set headers. Không nhồi business nặng.

### 5. Câu trả lời mẫu

> “Đọc data trên server component/fetch. Mutation: Server Actions hoặc route handlers tùy client. Middleware cho auth gate sớm. Mọi input vẫn validate phía server.”


## Tóm tắt nhanh

- Actions cho mutation UX
- Handlers cho API
- Middleware mỏng và sớm

## Tự kiểm tra

1. Khác Server Action và gọi API route?
2. Middleware không nên làm gì?
3. Vì sao vẫn validate trong action?

## Lỗi thường gặp

- Tin FormData không validate
- Business logic phình trong middleware
- Nhầm action thay thế hoàn toàn API public
