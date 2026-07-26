# 18. Nuxt data fetching & rendering modes

> Bài 18/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt useFetch / useAsyncData
- Giải thích SSR/SSG/SPA/hybrid
- Nhận biết hydration mismatch

## Cách trả lời phỏng vấn

1. SSR: HTML có data → SEO/UX first paint tốt hơn SPA trống.
2. Nêu payload: data fetch server được chuyển sang client.
3. Mismatch: server HTML ≠ client render đầu.

## Kiến thức cốt lõi

### 1. `useFetch` / `useAsyncData`

Dùng trong setup để fetch có SSR-aware, dedupe, key, refresh.

```ts
const { data, pending, error, refresh } = await useFetch('/api/users', {
  query: { page },
})
```

### 2. Rendering modes

- **SSR**: render mỗi request (data động, personalization)
- **SSG**: build sẵn (docs, marketing)
- **SPA**: client-only (app sau login nặng)
- **Hybrid / routeRules**: từng route một chiến lược

### 3. Hydration mismatch

Nguyên nhân hay gặp: `Date.now()`, `window`, random ID chỉ có trên client trong render đầu.

Cách: `ClientOnly`, `onMounted`, hoặc đảm bảo server/client cùng input.

### 4. Câu trả lời mẫu

> “Em chọn mode theo route: content public SSG/SSR, app nặng có thể SPA/hybrid. Data SSR-aware bằng useFetch/useAsyncData. Tránh dùng browser-only API trong render để khỏi mismatch.”


## Tóm tắt nhanh

- SSR-aware fetch có key/refresh
- Hybrid theo route
- Tránh mismatch từ browser API

## Tự kiểm tra

1. Khác useFetch gọi trong Nuxt vs fetch trong onMounted?
2. SSG không hợp khi nào?
3. Kể 2 nguyên nhân hydration mismatch

## Lỗi thường gặp

- Fetch chỉ onMounted → mất lợi SSR
- Một mode cho mọi trang
- Ignore warning hydration
