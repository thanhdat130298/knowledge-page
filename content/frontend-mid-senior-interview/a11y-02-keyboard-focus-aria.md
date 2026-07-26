# 30. Accessibility — Keyboard, focus & ARIA patterns (mock interview)

> Bài 30/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Mô tả keyboard UX cho modal/dropdown/table
- Giải thích focus management & focus visible
- Nêu name/role/value và live region cơ bản

## Cách dùng bài này

1. Luôn test Tab/Shift+Tab/Enter/Escape trong câu trả lời.
2. Modal = focus trap + restore focus — câu kinh điển.
3. Đừng nhồi aria-* nếu không hiểu effect.

## Bối cảnh

Deep dive component interactive. ~20 phút.

---

## Câu 1 — Keyboard baseline

### Interviewer
> Checklist keyboard cho trang settings?

### Ứng viên
> Mọi control tới được bằng Tab; thứ tự theo thứ tự logic; Enter/Space kích hoạt button; Escape đóng overlay; không “keyboard trap” ngoài modal có chủ đích. Link là `a` có href; button là `button`.

---

## Câu 2 — Modal

### Interviewer
> Em implement accessible modal thế nào?

### Ứng viên
> Khi mở: focus vào tiêu đề/close/button chính trong dialog; **focus trap** trong modal; Esc đóng; khi đóng **trả focus** về trigger. Có `role="dialog"` + `aria-modal` + label (`aria-labelledby`). Backdrop click tùy UX nhưng vẫn phải nhất quán keyboard. Thư viện headless giúp đúng behavior.

### Follow-up
> Quên restore focus hệ quả?

### Ứng viên
> Focus có thể nhảy lên đầu trang — cực khó chịu với keyboard/SR user, và fail operable criteria.

---

## Câu 3 — Focus visible

### Interviewer
> Designer muốn bỏ outline. Em xử lý?

### Ứng viên
> Không bỏ focus indicator. Có thể custom ring theo brand nhưng phải đủ rõ. Dùng `:focus-visible` để giảm ring khi click chuột nếu design cần, vẫn giữ cho keyboard.

---

## Câu 4 — Form errors

### Interviewer
> Submit form lỗi — a11y?

### Ứng viên
> Error gắn với field (`aria-describedby`), summary lỗi ở đầu form nếu nhiều field, focus vào lỗi đầu tiên, màu không phải kênh duy nhất (icon/text). Với screen reader: có thể dùng alert/live region thận trọng.

---

## Câu 5 — Name / Role / Value

### Interviewer
> Icon-only button “xóa” thiếu gì?

### Ứng viên
> Accessible name — `aria-label="Xóa đơn hàng"` hoặc text ẩn visually. Không chỉ dựa vào icon.

---

## Debrief

Pass nếu nói rõ trap/restore focus, focus-visible, label lỗi, accessible name.


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
