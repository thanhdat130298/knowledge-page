# 26. Web Performance — Loading, bundle & caching (mock interview)

> Bài 26/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Giải thích code splitting, lazy load, critical path
- Nói được cache HTTP / CDN / stale strategy
- Đưa phương án tối ưu bundle cho SPA/SSR

## Cách dùng bài này

1. Luôn gắn với network waterfall + JS main thread.
2. Phân biệt optimize bytes vs optimize khi nào tải.
3. Nhắc đo bundle analyzer, không đoán.

## Bối cảnh

Phần sâu về **tải trang & JS**. ~20 phút. Stack giả định: Nuxt hoặc Next + design system lớn.

---

## Câu 1 — Critical path

### Interviewer
> Em giải thích critical rendering path cho trang listing?

### Ứng viên
> Browser cần HTML → CSS quan trọng để render tree → paint. JS không cần cho first paint nên không nên block. Với SSR/streaming, HTML sớm giúp LCP/text hiện trước; hydration/client JS ảnh hưởng tương tác sau. Em ưu tiên: HTML/CSS tối thiểu trên fold, trì hoãn chart library / editor / modal nặng.

---

## Câu 2 — Bundle

### Interviewer
> Bundle chính 800KB gzip. Em làm gì?

### Ứng viên
> 1) `source-map`/analyzer tìm thủ phạm (moment, lodash full, icon pack).
> 2) Đổi lib nhẹ / import path có tree-shake.
> 3) Route-based code split + dynamic import component nặng.
> 4) Không nhét admin-only vào bundle user.
> 5) Kiểm tra duplicate dependency.
> Mục tiêu không phải “số đẹp” mà giảm TTI/INP trên thiết bị trung bình.

### Follow-up
> Tree-shaking thất bại thường vì sao?

### Ứng viên
> Side-effect import, barrel file export `,*`, CJS khó analyze, hoặc dùng API khiến bundler giữ cả module.

---

## Câu 3 — Lazy load

### Interviewer
> Ảnh below-fold và component tab ít dùng — chiến lược?

### Ứng viên
> Ảnh: native `loading="lazy"` / framework image, vẫn set kích thước chống CLS. Component: dynamic import khi mở tab/route. Không lazy thứ nằm trong LCP. Với SSR, cân nhắc không lazy phần SEO cần nội dung.

---

## Câu 4 — Caching

### Interviewer
> Em thiết kế cache cho static asset và API list sản phẩm?

### Ứng viên
> Static hashed (`app.[hash].js`): `Cache-Control: immutable` dài hạn qua CDN.
> HTML document: cache ngắn hoặc revalidate tùy SSR/ISR.
> API list: CDN/edge cache ngắn + ETag, hoặc stale-while-revalidate; data user-specific thì `private`/`no-store`.
> Sai lầm hay gặp: cache HTML gắn kèm token user.

---

## Scenario nhanh

### Interviewer
> Sau deploy, user cũ thấy UI vỡ. Nguyên nhân cache?

### Ứng viên
> HTML cũ tham chiếu chunk hash mới đã xóa, hoặc service worker giữ shell cũ. Cần versioned assets + chiến lược update SW + không cache HTML quá lâu nếu trỏ file hashed.

---

## Debrief

Pass nếu nói được: split theo route, analyzer, cache hashed vs HTML, không cache private data.


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
