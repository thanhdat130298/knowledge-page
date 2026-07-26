# 25. Web Performance — Core Web Vitals & đo lường (mock interview)

> Bài 25/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Trả lời được LCP / INP / CLS với ví dụ nguyên nhân–cách xử lý
- Biết đo bằng đâu (Lab vs Field) và nói trade-off
- Thể hiện tư duy mid/senior: đo trước, tối ưu sau

## Cách dùng bài này

1. Đọc phần Interviewer → tự trả lời → mới đối chiếu đáp án.
2. Nói số liệu có ngữ cảnh (mobile/3G, p75) khi có thể.
3. Tránh liệt kê checklist không gắn case.

## Bối cảnh buổi phỏng vấn

- Vai trò: Frontend mid/senior cho product SaaS (dashboard + trang marketing).
- Interviewer: Tech lead, quan tâm trải nghiệm thật của user.
- Thời lượng phần này: ~15 phút.

---

## Câu 1 — Warm-up

### Interviewer
> Em hiểu **Core Web Vitals** gồm những gì? Metric nào em hay nhìn trước trên dashboard?

### Ứng viên (mẫu mid/senior)
> Hiện em theo bộ CWV chính: **LCP** (lớn nhất content hiển thị), **INP** (độ phản hồi tương tác — thay FID), và **CLS** (nhảy layout). Với landing em nhìn LCP/CLS trước; với app sau login em nhìn INP và thời gian tương tác bảng/filter nhiều hơn.

### Follow-up
> Lab data và field data khác nhau thế nào?

### Ứng viên
> Lab (Lighthouse/CI) ổn định để regress, nhưng không đủ. Field (CrUX/RUM) phản ánh user thật theo thiết bị/mạng. Em dùng lab để bắt regression trong PR, field để ưu tiên tối ưu theo p75 thực tế.

### Ghi chú interviewer
- Pass: nêu đúng 3 metric + phân biệt lab/field.
- Senior+: nhắc p75, khác landing vs app.

---

## Câu 2 — LCP

### Interviewer
> Trang chủ LCP chậm. Em nghi ngờ và xử lý theo thứ tự nào?

### Ứng viên
> Em xác định **element LCP** là gì (thường hero image/text lớn). Checklist:
> 1) Ảnh hero quá nặng / không đúng size → `srcset`/`sizes`, modern format, CDN, preload đúng file.
> 2) CSS/JS chặn render → critical CSS, defer JS không cần thiết.
> 3) Fonts làm text LCP trễ → `font-display`, preload font subset.
> 4) Server/TTFB chậm → cache, edge, API chậm làm HTML chậm.
> Em đo waterfall trước khi tối ưu mù.

### Follow-up
> Preload mọi ảnh được không?

### Ứng viên
> Không. Preload sai cạnh tranh bandwidth với resource quan trọng hơn, có thể làm LCP tệ hơn. Chỉ preload LCP candidate chắc chắn.

---

## Câu 3 — CLS

### Interviewer
> User báo UI “giật” khi load. Em debug CLS thế nào?

### Ứng viên
> Em tìm shift lớn trong trace: ảnh không dành chỗ, font swap, banner/ads chèn muộn, dynamic content trên fold. Fix: `width/height` hoặc `aspect-ratio`, reserve skeleton, tránh insert trên đầu viewport, font strategy ổn định. Component design system nên có slot media có tỉ lệ sẵn.

---

## Câu 4 — INP

### Interviewer
> Click filter trên bảng bị khựng. Liên quan INP thế nào?

### Ứng viên
> INP đo latency từ tương tác đến paint tiếp theo “có phản hồi”. Click filter nếu JS nặng trên main thread (sort 10k row sync, re-render lớn) sẽ đẩy INP. Hướng xử lý: chia nhỏ work (`startTransition`/debounce), virtualize, chuyển heavy sang worker/server, giảm re-render, feedback UI tức thì (pending state) trước khi tính xong.

---

## Mini debrief (sau 4 câu)

| Tiêu chí | Ứng viên tốt |
|----------|--------------|
| Khái niệm | Đúng tên metric, không nhầm FID/INP |
| Method | Đo → giả thuyết → fix |
| Trade-off | Preload, cache, tối ưu sớm |
| Product sense | Phân biệt marketing vs app |


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
