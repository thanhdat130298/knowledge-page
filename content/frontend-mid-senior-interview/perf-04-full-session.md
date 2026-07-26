# 28. Buổi interview Performance đầy đủ (45–60 phút) — kịch bản end-to-end

> Bài 28/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên mid/senior) + ghi chú chấm điểm.

## Mục tiêu bài học

- Đi hết một buổi phỏng vấn Performance từ warm-up → deep dive → system
- Biết cách hỏi lại và cấu trúc câu trả lời dài
- Có checklist tự chấm sau buổi

## Cách dùng bài này

1. Coi đây là script luyện nói — bấm giờ thật 45–60 phút.
2. Phần đáp án là mức mid/senior; em có thể rút ngắn khi luyện tốc độ.
3. Sau buổi, chỉ điền checklist cuối.

## Agenda buổi phỏng vấn (giả lập)

| Phút | Nội dung |
|------|----------|
| 0–5 | Giới thiệu + kinh nghiệm perf từng làm |
| 5–20 | CWV + case LCP/CLS/INP |
| 20–35 | Bundle, cache, SSR/SPA |
| 35–50 | Runtime: bảng lớn + re-render |
| 50–60 | Câu hành vi + hỏi ngược |

---

## Phase A — Opening (5 phút)

### Interviewer
> Em kể 1 lần em cải thiện performance có impact?

### Ứng viên (khung STAR)
> **Situation**: Trang listing báo cáo mobile LCP ~4.5s p75.  
> **Task**: Đưa về ngưỡng tốt hơn theo CWV.  
> **Action**: Xác định LCP là hero; nén/đổi định dạng ảnh; preload đúng asset; trì hoãn script chat; bật CDN cache.  
> **Result**: LCP field giảm rõ (nêu số nếu có), bounce giảm. Em nhấn mạnh **đo field trước/sau**.

---

## Phase B — CWV deep dive (15 phút)

*(Dùng lại kỹ năng bài 25 — luyện nối câu mượt)*

### Interviewer lần lượt hỏi
1. Khác lab vs field?  
2. LCP chậm do font — xử lý?  
3. CLS khi cookie banner?  
4. INP khi mở select có 5k option?

### Gợi ý điểm phải chạm
- p75, element LCP, reserve space, virtualize/paging options, không preload bừa.

---

## Phase C — Loading architecture (15 phút)

### Interviewer
> App Nuxt/Next của em vào dashboard sau login. Em thiết kế loading thế nào?

### Ứng viên
> Sau login SEO ít quan trọng hơn tốc độ tương tác. Có thể:
> - Shell layout nhanh + skeleton.
> - Parallel fetch widget độc lập (`Promise.allSettled` mindset).
> - Code split chart/editor.
> - Cache user settings; không block toàn dashboard vì 1 API chậm.
> - Với SSR: chỉ SSR phần cần; tránh waterfall tuần tự vô ích.

### Interviewer
> HTTP cache cho API `/me`?

### Ứng viên
> `private`, ngắn hoặc no-store tùy độ nhạy; không đưa lên CDN public. Ưu tiên client memory + ETag nếu cần.

---

## Phase D — Runtime case (15 phút)

### Interviewer
> Bảng 50k đơn hàng, filter realtime, sort nhiều cột. Thiết kế?

### Ứng viên
> Server-side pagination/sort/filter là mặc định. UI chỉ giữ page hiện tại. Nếu cần “scroll vô hạn” → virtualize + cursor pagination. Debounce filter text. Không giữ 50k object trong memory client nếu không cần. Optimistic UI chỉ khi conflict chấp nhận được.

### Interviewer
> Em phản biện PM muốn load hết để sort nhanh trên client?

### Ứng viên
> Giải thích trade-off: máy yếu, memory, TTI, INP. Đề xuất sort server + index DB; nếu dataset nhỏ (<1–2k) mới cân nhắc client. Đưa số đo POC thay vì tranh luận cảm tính.

---

## Phase E — Behavioral + hỏi ngược (10 phút)

### Interviewer
> Khi conflict giữa ship feature và perf regression, em xử lý?

### Ứng viên
> Có budget/CI threshold (Lighthouse CI / bundle size). Regression vượt ngưỡng → chặn merge hoặc tạo ticket kèm owner. Ship kèm feature flag nếu business critical, kèm plan trả nợ trong sprint.

### Câu hỏi ngược tốt
> Team đang lấy field data từ đâu? Có perf budget theo route không? Device target chính là gì?

---

## Checklist tự chấm sau buổi

- [ ] Nói được CWV đúng + lab/field  
- [ ] Có quy trình đo → giả thuyết → fix  
- [ ] Biết split/lazy/cache hashed  
- [ ] List lớn: server + virtualize  
- [ ] Trade-off với PM rõ ràng  
- [ ] Hỏi ngược có chất lượng  

**Đạt mid**: đủ checklist, ví dụ cụ thể.  
**Đạt senior**: chủ động budget, field data, phản biện product bằng số.


## Tự luyện (đóng tài liệu)

1. Tự nói to câu trả lời trong 60–90 giây cho 3 câu khó nhất.
2. Viết 1 follow-up bạn sẽ hỏi lại interviewer nếu được mở rộng.
3. Ghi 1 ví dụ từ project thật (hoặc giả định ERP/SaaS) cho mỗi chủ đề.
