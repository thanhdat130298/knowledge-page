# 15. Vue Router & Pinia

> Bài 15/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích nested route & guards
- So sánh Pinia với Vuex (mức ý)
- Thiết kế store theo domain

## Cách trả lời phỏng vấn

1. Guards: auth/permission — nhớ async và redirect loop.
2. Pinia: đơn giản hơn Vuex, TS-friendly.
3. Tách store theo feature (auth, cart), không một god-store.

## Kiến thức cốt lõi

### 1. Nested routes

Layout cha + `router-view` con — hợp ERP: `/settings` có submenu.

### 2. Navigation guards

`beforeEach`: check token/role. Return path login nếu thiếu quyền. Tránh vòng redirect (đã login mà đẩy về login mãi).

### 3. Pinia basics

```ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAdmin = computed(() => user.value?.role === 'admin')
  async function login(...) { /* ... */ }
  return { user, isAdmin, login }
})
```

Setup store (composition style) rất phổ biến.

### 4. Pinia vs Vuex (trả lời ngắn)

Pinia: ít boilerplate, không mutations bắt buộc, TS tốt, DevTools ổn → mặc định Vue 3.

### 5. Persist?

Token: cân nhắc httpOnly cookie (bảo mật hơn localStorage). Nếu persist store: chỉ data không nhạy cảm / có chiến lược clear.

### 6. Câu trả lời mẫu

> “Router dùng nested layout + guards cho auth/RBAC. State client domain để trong Pinia theo feature. Không nhét server list lớn vào store nếu đã có layer cache HTTP.”


## Tóm tắt nhanh

- Guards cho auth/RBAC
- Pinia theo domain
- Cẩn thận persist secrets

## Tự kiểm tra

1. Redirect loop trong guard thường do đâu?
2. Khi nào không nên để API list trong Pinia?
3. Khác local state component và Pinia?

## Lỗi thường gặp

- Một store khổng lồ
- Lưu password/token lung tung
- Guard không handle async lỗi
