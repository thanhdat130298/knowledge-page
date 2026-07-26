# 31. Accessibility — Testing, tooling & quy trình team (mock interview)

> Bài 31/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Phân biệt automated vs manual a11y testing
- Kể quy trình đưa a11y vào PR/design system
- Thành thật về giới hạn tool

## Cách dùng bài này

1. Nói: axe bắt ~30–50%issue, không thay manual.
2. Nhấn keyboard + 1 screen reader cơ bản.
3. Process > one-off hero fix.

## Bối cảnh

Interviewer muốn biết em **làm a11y như engineering practice**, không chỉ lý thuyết. ~15 phút.

---

## Câu 1 — Tooling

### Interviewer
> Em test accessibility bằng gì?

### Ứng viên
> Tầng 1: eslint-plugin-jsx-a11y / template lint tương đương.  
> Tầng 2: axe DevTools / Lighthouse a11y trên trang chính.  
> Tầng 3: keyboard walkthrough.  
> Tầng 4: spot-check VoiceOver/NVDA cho flow critical (login, checkout, submit form).  
> Automated không bắt hết logic focus/modal hay tên nút mơ hồ về mặt ngữ cảnh.

---

## Câu 2 — Trong PR

### Interviewer
> Review PR thiếu label — em làm gì?

### Ứng viên
> Comment theo tiêu chí (WCAG name/label), đề xuất fix cụ thể, link guideline nội bộ. Nếu design system đã có `FormField`, yêu cầu dùng component chuẩn thay input trần.

---

## Câu 3 — Design system

### Interviewer
> Làm sao scale a11y?

### Ứng viên
> Đưa behavior đúng vào primitive (Button, Modal, Select). Document keyboard interaction. Token contrast đạt AA. Storybook/a11y addon. Đào tạo ngắn cho team. Như vậy từng feature ít phải “tự chế” ARIA.

---

## Câu 4 — Ưu tiên nợ

### Interviewer
> Có 40 issue axe — em ưu tiên?

### Ứng viên
> Theo severity + tần suất user: blocker keyboard/focus trên flow chính → contrast text chính → SR name trên CTA → trang ít dùng. Gắn ticket rõ owner, không chỉ export PDF rồi quên.

---

## Debrief

Pass: đa tầng test, DS-driven, ưu tiên theo user impact.


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
