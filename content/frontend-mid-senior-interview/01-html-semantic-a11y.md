# 07. HTML semantic & Accessibility

> Bài 7/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích vì sao semantic HTML quan trọng với a11y, SEO và maintainability
- Biết khi nào dùng landmark / heading hierarchy
- Trả lời được câu hỏi về alt, label, focus, ARIA tối thiểu

## Cách trả lời phỏng vấn

1. Bắt đầu từ **ý nghĩa cấu trúc**, rồi mới nói tool (axe, VoiceOver).
2. Nêu ví dụ màn hình thật: form login, bảng users, trang bài viết.
3. Senior: nói trade-off — đừng lạm dụng ARIA nếu HTML gốc đã đủ.

## Kiến thức cốt lõi

### 1. Semantic HTML là gì? Vì sao interviewer hỏi?

Semantic = dùng đúng thẻ theo **ý nghĩa** (`header`, `nav`, `main`, `article`, `section`, `aside`, `footer`, `button`, `a`), không chỉ `div`/`span`.

Lợi ích:
- Screen reader navigate theo landmark/heading.
- SEO hiểu cấu trúc nội dung.
- CSS/JS dễ maintain hơn (selector có nghĩa).

```html
<main>
  <article>
    <h1>Chi tiết đơn hàng</h1>
    <section aria-labelledby="items-title">
      <h2 id="items-title">Sản phẩm</h2>
      ...
    </section>
  </article>
</main>
```

### 2. Heading hierarchy

Một trang nên có **một `h1`** (thường là tiêu đề chính). `h2`–`h6` theo cấp logic, không nhảy level tùy tiện chỉ vì style.

Mid+: style bằng CSS, không dùng heading để “chữ to”.

### 3. Accessibility tối thiểu khi phỏng vấn

- Mọi control có **accessible name** (`label` + `for`/`id`, hoặc `aria-label` khi không hiện text).
- `img` có `alt` mô tả đúng mục đích (trang trí → `alt=""`).
- Focus visible; không remove outline nếu chưa thay bằng style rõ.
- Keyboard: Tab/Enter/Space hoạt động với button/link thật — tránh `div onclick` nếu không tự làm role/keyboard.

### 4. ARIA khi nào?

ARIA bổ sung khi HTML chưa diễn tả được. Nguyên tắc: **no ARIA is better than bad ARIA**.

Ví dụ hợp lệ: dialog, tabs custom, live region thông báo lỗi form.

### 5. Câu trả lời mẫu 45 giây

> “Em ưu tiên semantic HTML trước: landmark + heading đúng cấp để a11y và SEO tốt. Form luôn gắn label. ARIA chỉ khi component custom. Em kiểm tra bằng keyboard và tooling như axe trước khi merge.”


## Tóm tắt nhanh

- Semantic trước, ARIA sau
- Heading có hierarchy, không vì visual
- Accessible name + keyboard là baseline mid

## Tự kiểm tra

1. Khác nhau giữa `<button>` và `<div role="button">`?
2. Khi nào `alt=""` là đúng?
3. Vì sao nhảy từ `h1` sang `h4` xấu?

## Lỗi thường gặp

- Nhồi ARIA lung tung trên thẻ semantic đã đúng
- Dùng `div` + click cho mọi CTA
- Chỉ test bằng chuột, quên keyboard
