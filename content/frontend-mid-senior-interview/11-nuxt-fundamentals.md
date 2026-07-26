# 17. Nuxt fundamentals

> Bài 17/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích file-based routing & layouts
- Hiểu auto-imports và modules
- Nói được giá trị Nuxt so với Vue SPA thuần

## Cách trả lời phỏng vấn

1. Nuxt = opinionated framework trên Vue: SSR/SEO/DX.
2. Nêu cấu trúc thư mục: pages, layouts, components, composables, server.
3. Modules: i18n, image, auth… — mở rộng có kiểm soát.

## Kiến thức cốt lõi

### 1. Nuxt giải quyết gì?

Vue thuần (Vite + Vue Router + Pinia) tự ghép SSR/SEO/config khá tốn effort. Nuxt đóng gói conventions + rendering modes + server (Nitro).

### 2. File-based routing

`pages/users/[id].vue` → route dynamic. Nested qua cấu trúc thư mục / `NuxtPage`.

### 3. Layouts

`layouts/default.vue`, `layouts/admin.vue` — đổi layout theo trang ERP.

### 4. Auto-imports

Components/composables có thể auto-import → DX nhanh, nhưng cần hiểu origin để debug (không “ma thuật”).

### 5. Modules & config

`nuxt.config.ts`: modules, runtimeConfig, css, routeRules…

### 6. Câu trả lời mẫu

> “Nuxt giúp em có routing/layouts/SSR/SEO và Nitro server theo convention. Em tổ chức theo pages + composables + server API. So với Vue SPA, Nuxt phù hợp product cần SEO hoặc hybrid rendering.”


## Tóm tắt nhanh

- Convention over configuration
- pages/layouts/server là xương sống
- Hiểu auto-import để debug

## Tự kiểm tra

1. Khi nào chọn Nuxt thay vì Vue SPA?
2. Layout khác page thế nào?
3. runtimeConfig dùng để làm gì?

## Lỗi thường gặp

- Coi Nuxt chỉ là 'Vue có folder'
- Nhét business logic lung tung vào pages
- Không phân biệt client-only code
