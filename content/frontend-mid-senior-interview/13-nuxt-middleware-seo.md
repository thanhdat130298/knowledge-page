# 19. Nuxt middleware, Nitro & SEO

> Bài 19/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích route middleware
- Hiểu Nitro server routes cơ bản
- Dùng useSeoMeta đúng chỗ

## Cách trả lời phỏng vấn

1. Middleware: auth/RBAC giống 'guard' của router.
2. Nitro: API/server gần frontend monorepo.
3. SEO: title/description/OG theo từng trang.

## Kiến thức cốt lõi

### 1. Middleware

`middleware/auth.ts`: check session, redirect login. Có thể global hoặc per-page via `definePageMeta`.

### 2. Nitro server routes

`server/api/users.get.ts` → endpoint. Hợp BFF: aggregate, hide secrets, set cookie.

`runtimeConfig`: public vs private keys — **không** lộ secret ra client bundle.

### 3. SEO trong Nuxt

```ts
useSeoMeta({
  title: 'Danh sách đơn hàng',
  description: '...',
  ogImage: '/og.png',
})
```

Kết hợp SSR để crawler thấy nội dung.

### 4. Câu trả lời mẫu

> “Middleware xử lý auth/permission trước khi vào page. API nội bộ để trên Nitro khi cần BFF. SEO dùng useSeoMeta + SSR. Secret chỉ nằm runtimeConfig private.”


## Tóm tắt nhanh

- Middleware = navigation gate
- Nitro = server/BFF
- SEO meta + SSR

## Tự kiểm tra

1. Global middleware khác page middleware?
2. Vì sao không để secret trong `public` runtimeConfig?
3. SSR giúp SEO thế nào?

## Lỗi thường gặp

- Secret trong `NUXT_PUBLIC_*`
- SEO chỉ set ở `app.head` cứng một title
- Auth chỉ ẩn nút, không middleware/server
