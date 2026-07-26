# 24. So sánh Vue/Nuxt vs React/Next (kiến trúc)

> Bài 24/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- So sánh mental model để phỏng vấn
- Chọn stack theo bài toán, không theo 'hot'
- Nêu nguyên tắc FE chung giữa các stack

## Cách trả lời phỏng vấn

1. Nhấn mạnh điểm giống: components, state, routing, SSR.
2. Khác: reactivity system, RSC, ecosystem conventions.
3. Kết bằng tiêu chí chọn: team skill, SEO, hiring, constraint.

## Kiến thức cốt lõi

### 1. Điểm giống (nên nói trước)

- Component UI + composition
- Client state vs server state
- SPA/SSR/hybrid
- Form, table, auth, RBAC là bài toán product — framework chỉ là dụng cụ

### 2. Vue/Nuxt

- Reactivity Proxy + template DX cao
- Nuxt convention mạnh, Nitro BFF
- Thuận SEO/SSR với file routing

### 3. React/Next

- JSX linh hoạt, ecosystem cực lớn
- App Router + RSC đổi cách chia server/client
- Next tối cho full-stack React trên Vercel/Node

### 4. Khi nào chọn gì? (câu senior)

- Team Vue mạnh / muốn convention nhanh → Nuxt
- Team React / cần RSC & hệ sinh thái React → Next
- Chỉ admin nội bộ, SEO không quan trọng → SPA (Vue hoặc React) vẫn ổn

### 5. Nguyên tắc mang sang mọi stack

- Tách UI / domain / data fetching
- Đừng nhân bản business logic
- Đo perf trước khi tối ưu
- Security: server validate, RBAC thật

### 6. Câu trả lời mẫu

> “Em nhìn bài toán và team trước. Vue/Nuxt mạnh DX + convention SSR. React/Next mạnh ecosystem + RSC. Dù stack nào cũng giữ tách concern, server-state đúng chỗ, và tiêu chí SEO/perf/security rõ.”


## Tóm tắt nhanh

- Giống nhau ở nguyên tắc product FE
- Khác ở reactivity & SSR model
- Chọn theo constraint thật

## Tự kiểm tra

1. Kể 3 tiêu chí chọn Nuxt vs Next
2. RSC khác SSR Vue truyền thống ở ý nào?
3. Nguyên tắc nào giữ được khi đổi stack?

## Lỗi thường gặp

- Fanboy stack, không nêu trade-off
- Coi framework giải quyết mọi architecture
- Bỏ qua kỹ năng team hiện có
