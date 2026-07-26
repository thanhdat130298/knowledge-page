# 11. Responsive & Modern CSS

> Bài 11/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích mobile-first
- Dùng clamp/tokens trong câu trả lời
- Biết container queries ở mức conceptual

## Cách trả lời phỏng vấn

1. Mobile-first = base style nhỏ → `min-width` mở rộng.
2. Nói design token (spacing/color) để nghe senior hơn.
3. Container query: component responsive theo parent, không chỉ viewport.

## Kiến thức cốt lõi

### 1. Mobile-first

```css
.card { padding: 12px; }
@media (min-width: 768px) {
  .card { padding: 20px; }
}
```

Tránh viết desktop rồi `max-width` đè xuống trừ khi maintain legacy.

### 2. Fluid type/spacing

```css
h1 { font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem); }
```

Giảm breakpoint cho typography.

### 3. CSS variables (design tokens)

```css
:root {
  --color-accent: #0f766e;
  --space-3: 0.75rem;
}
button { background: var(--color-accent); padding: var(--space-3) 1rem; }
```

Dark mode: đổi biến ở `.dark` thay vì copy toàn bộ rule.

### 4. Container queries (ý tưởng mid+)

Component card đổi layout khi **container** hẹp/rộng — hợp design system, sidebar.

### 5. Responsive images (nói kèm CSS/HTML)

`srcset`/`sizes`, hoặc framework `next/image` / Nuxt Image — chọn kích thước đúng viewport.

### 6. Câu trả lời mẫu

> “Em theo mobile-first, dùng token và clamp để giảm breakpoint. Component phức tạp cân nhắc container queries. Dark mode bằng CSS variables.”


## Tóm tắt nhanh

- Mobile-first + tokens
- clamp giúp fluid UI
- CQ = responsive theo component

## Tự kiểm tra

1. Vì sao dark mode bằng biến CSS dễ maintain?
2. Khác media query vs container query?
3. Cho ví dụ chỗ clamp hợp lý

## Lỗi thường gặp

- Quá nhiều breakpoint cứng
- Hardcode màu khắp nơi
- Chỉ test một kích thước iPhone
