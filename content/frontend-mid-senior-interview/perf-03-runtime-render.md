# 27. Web Performance — Runtime, render & list lớn (mock interview)

> Bài 27/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Chẩn đoán jank re-render / long task
- Đưa giải pháp bảng lớn (virtualize, pagination)
- Nối perf runtime với framework (Vue/React)

## Cách dùng bài này

1. Tách network perf vs runtime perf khi trả lời.
2. Nêu DevTools Performance/Profiler.
3. Ưu tiên architecture list trước micro-optimize.

## Bối cảnh

App ERP: bảng đơn hàng, filter nhiều, chart. ~15–20 phút.

---

## Câu 1 — Jank

### Interviewer
> Scroll trong trang bị giật. Em đo thế nào?

### Ứng viên
> Em record Performance panel: tìm long task >50ms, forced layout, nhiều scripting. Xem FPS và main thread. Nếu framework: profiler xem component nào re-render. Phân biệt: scroll handler nặng vs layout thrashing vs image decode.

---

## Câu 2 — List 20k row

### Interviewer
> Product muốn render 20.000 row một lúc. Em phản hồi ra sao?

### Ứng viên
> Em không render 20k DOM. Đề xuất: **server pagination** mặc định; nếu UX cần scroll dài → **virtualization** (windowing). Kết hợp filter/sort server-side. Client-side sort trên 20k + pagination server là anti-pattern. Có thể progressive: 50–100 row + “load more”.

### Follow-up
> Virtualization trade-off?

### Ứng viên
> Phức tạp a11y/keyboard, đo chiều cao row động khó, SEO không liên quan với app nội bộ. Nhưng cần thiết khi DOM lớn.

---

## Câu 3 — Re-render

### Interviewer
> Gõ ô search làm cả page re-render. Hướng xử lý?

### Ứng viên
> Thu hẹp state: input state local, debounce query, không để keystroke update global store nặng. Memo/pure component cho list item. Tránh tạo object/inline function phá memo nếu chưa đo. Vue: giữ state gần component, computed cho derived. React: `startTransition` cho update không khẩn.

---

## Câu 4 — Animation

### Interviewer
> Animation mở modal làm CLS/jank?

### Ứng viên
> Animate `transform`/`opacity`, tránh `height`/`top`. Tôn trọng `prefers-reduced-motion`. Không animate trong lúc layout lớn chưa ổn định.

---

## Khép phần Performance runtime

> “Em tách: (1) giảm việc trên main thread, (2) giảm số node, (3) giảm update không cần thiết. Đo bằng profiler trước khi memo lung tung.”


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
