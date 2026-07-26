# 23. Next.js performance & SEO

> Bài 23/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Nêu next/image, next/font, metadata API
- Hiểu streaming/suspense ý tưởng
- Nối được với Core Web Vitals

## Cách trả lời phỏng vấn

1. SEO App Router: `metadata` / `generateMetadata`.
2. Perf: image/font optimization + giảm JS client.
3. CWV: LCP/INP/CLS — nói gắn giải pháp cụ thể.

## Kiến thức cốt lõi

### 1. `next/image`

Resize/optimize, lazy, ngăn CLS khi set size — tốt cho LCP ảnh hero nếu dùng đúng.

### 2. `next/font`

Self-host font, giảm layout shift và request third-party.

### 3. Metadata

```ts
export const metadata = { title: '...', description: '...' }
// hoặc generateMetadata cho dynamic
```

### 4. Streaming & Suspense

Gửi HTML dần: shell trước, phần chậm sau — cải thiện TTFB cảm nhận / UX.

### 5. Câu trả lời mẫu

> “Em dùng image/font optimization, metadata động, giữ client JS mỏng bằng RSC. Đo LCP/INP/CLS và xử lý đúng nguyên nhân (ảnh, font, hydration nặng).”


## Tóm tắt nhanh

- image/font/metadata là baseline Next
- RSC + streaming hỗ trợ UX
- Đo CWV, đừng đoán

## Tự kiểm tra

1. next/image giúp CLS thế nào?
2. generateMetadata dùng khi nào?
3. INP cao có thể do đâu ở Next app?

## Lỗi thường gặp

- Ảnh `<img>` lớn không tối ưu
- Title cứng mọi trang
- Hydrate cả trang không cần thiết
