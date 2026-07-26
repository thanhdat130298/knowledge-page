# 29. Accessibility — WCAG, semantics & inclusive UI (mock interview)

> Bài 29/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Giải thích a11y không chỉ 'cho screen reader'
- Nắm POUR / mức A–AA phổ biến khi phỏng vấn
- Gắn semantic HTML với a11y thật

## Cách dùng bài này

1. Mở bằng inclusive + legal/UX business, rồi mới WCAG.
2. Ưu tiên HTML đúng trước ARIA.
3. Lấy ví dụ form/table/modal trong SaaS.

## Bối cảnh

Interviewer: Em có quan tâm accessibility khi làm UI không? ~15 phút đầu.

---

## Câu 1 — Vì sao a11y?

### Interviewer
> Vì sao team frontend phải care accessibility?

### Ứng viên
> Vì sản phẩm dùng được bởi nhiều người hơn (thị giác, vận động, nhận thức), giảm rủi ro tuân thủ, và thường đi cùng UX tốt hơn (keyboard, contrast, clear label). Với SaaS B2B, khách enterprise đôi khi yêu cầu WCAG AA trong hợp đồng.

---

## Câu 2 — WCAG ngắn gọn

### Interviewer
> WCAG em nhớ theo framework nào?

### Ứng viên
> **POUR**: Perceivable, Operable, Understandable, Robust. Thực tế product hay aim **WCAG 2.2 AA**. Em không thuộc hết success criteria, nhưng nắm nhóm: contrast, keyboard, name/role/value, error identification, focus order.

### Follow-up
> AA khác A?

### Ứng viên
> AA chặt hơn, phổ biến làm target sản phẩm. AAA khó đạt toàn site; áp dụng chọn lọc.

---

## Câu 3 — Semantic trước ARIA

### Interviewer
> Khi nào dùng ARIA?

### Ứng viên
> Khi HTML native chưa diễn tả được pattern (tabs, combobox, tree). Nguyên tắc: **don’t use ARIA if native exists**. Sai ARIA còn tệ hơn không có — vì screen reader tin role sai. Button thật tốt hơn `div role=button` nếu không implement đủ keyboard.

---

## Câu 4 — Contrast & visual

### Interviewer
> Design đưa text xám nhạt trên nền xám. Em làm gì?

### Ứng viên
> Em raise với design bằng tiêu chí contrast (ví dụ ~4.5:1 text thường). Đề xuất token trong design system đã đạt AA. Không âm thầm hardcode phá token nếu team đã có chuẩn.

---

## Debrief

Pass: POUR + AA + semantic-first + giao tiếp với design bằng tiêu chí.


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
