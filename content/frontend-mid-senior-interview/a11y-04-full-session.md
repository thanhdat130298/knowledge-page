# 32. Buổi interview Accessibility đầy đủ (45–60 phút) — kịch bản end-to-end

> Bài 32/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Đi một buổi a11y interview hoàn chỉnh
- Kết hợp lý thuyết + implement + process
- Tự chấm được sau khi luyện

## Cách dùng bài này

1. Luyện nói với đồng hồ; đừng đọc máy.
2. Luôn nêu ví dụ component SaaS (modal, table, form).
3. Thành thật nếu chưa dùng SR nhiều — nói cách học/bù bằng checklist.

## Agenda

| Phút | Nội dung |
|------|----------|
| 0–5 | Motivation + experience |
| 5–20 | WCAG + semantic + contrast |
| 20–40 | Keyboard/focus/ARIA patterns |
| 40–50 | Testing & process |
| 50–60 | Live scenario + hỏi ngược |

---

## Phase A — Opening

### Interviewer
> Em đã ship feature nào có yêu cầu a11y rõ?

### Ứng viên (STAR ngắn)
> Situation: form onboarding. Task: dùng được bằng keyboard + SR cơ bản. Action: label rõ, error `aria-describedby`, focus lỗi đầu, modal xác nhận có trap. Result: pass checklist nội bộ + giảm ticket “không submit được bằng bàn phím”.

---

## Phase B — Foundations (15 phút)

Hỏi lần lượt:
1. POUR là gì? Target AA vì sao?  
2. Semantic vs ARIA?  
3. Contrast conflict với design?  
4. Ảnh decorative `alt` thế nào?

**Đáp án chốt:** semantic-first; AA pragmatism; token; `alt=""` cho decorative.

---

## Phase C — Patterns (20 phút)

### Scenario chính
> “Em thiết kế combobox search user trong form phân quyền.”

### Ứng viên (cấu trúc trả lời)
1. **Native trước?** Nếu select đơn giản → native/`select`. Search remote → combobox pattern.
2. **Keyboard**: mũi tên, Enter chọn, Esc đóng, typeahead.
3. **ARIA**: `combobox`, `listbox`, `option`, `aria-expanded`, `aria-activedescendant` (hiểu ý; dùng lib nếu có).
4. **Name**: label “Chọn user”.
5. **Loading/empty**: thông báo rõ, không chỉ spinner màu.
6. **Risk**: tự implement combobox dễ sai — ưu tiên headless UI đã a11y.

### Follow-up modal + table
- Modal: trap/restore (bài 30).  
- Table: header scope, sort button có tên “Sort by date ascending”, không chỉ icon.

---

## Phase D — Process (10 phút)

### Interviewer
> Team chưa có a11y culture. 30 ngày đầu em làm gì?

### Ứng viên
> 1) Chọn 3 flow critical audit.  
> 2) Thêm lint + axe vào CI nhẹ.  
> 3) Fix primitive Button/Modal/Input trong DS.  
> 4) Viết checklist PR 8–10 ý.  
> 5) Demo 30’ keyboard testing cho team.  
> Không cố “AA toàn product” trong 30 ngày — tạo nền.

---

## Phase E — Hỏi ngược

> Definition of Done có a11y không? Có user/customer yêu cầu WCAG? Screen reader target (VoiceOver/NVDA)?

---

## Checklist tự chấm

- [ ] Nói được business + POUR/AA  
- [ ] Semantic-first, ARIA có chủ đích  
- [ ] Modal/focus/keyboard rõ  
- [ ] Form error accessible  
- [ ] Tool + giới hạn tool  
- [ ] Kế hoạch 30 ngày thực tế  
- [ ] Combobox/table: biết độ khó → chọn lib  

**Mid**: đúng pattern cơ bản + honest gaps.  
**Senior**: DS + process + ưu tiên nợ + phản biện implement từ zero.


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
