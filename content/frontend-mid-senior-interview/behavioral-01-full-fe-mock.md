# 44. Buổi interview Frontend tổng 60–90’ — kịch bản end-to-end

> Bài 44/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên) + debrief.

## Mục tiêu bài học

- Đi một vòng interview FE hoàn chỉnh: technical + soft
- Ghép JS/TS → framework → API/Auth → Perf/A11y → behavioral
- Có checklist tự chấm cuối buổi

## Cách dùng

1. Luyện đủ 75’ nếu có thể.
2. Mỗi câu: kết luận → giải thích → ví dụ → trade-off.
3. Thành thật gap; nói cách bù.

## Agenda giả lập (75 phút)

| Phút | Phần |
|------|------|
| 0–8 | Intro + project nổi bật (STAR) |
| 8–20 | JS/TS warm deep |
| 20–35 | Framework (Vue/Nuxt hoặc React/Next) |
| 35–48 | API, auth, state |
| 48–60 | Perf + a11y nhanh |
| 60–70 | Testing/Git behavioral |
| 70–75 | Hỏi ngược |

---

## Phase A — Intro (8’)

### Interviewer
> Giới thiệu và 1 impact kỹ thuật gần đây?

### Ứng viên (STAR)
> Situation → Task → Action (2–3 quyết định kỹ thuật) → Result có số. Nhấn ownership và trade-off.

---

## Phase B — JS/TS (12’)

Hỏi gợi ý:
1. Event loop A/D/C/B  
2. Closure stale  
3. unknown vs any  
4. Discriminated union cho async state  

**Chốt:** microtask, stale closure, boundary typing.

---

## Phase C — Framework (15’)

### Vue track
Composition API, Pinia vs local state, Nuxt SSR vs SPA route.

### React/Next track
RSC boundary, cache/revalidate, client island.

### Interviewer
> Chọn Nuxt vs Next cho CMS marketing + dashboard login?

### Ứng viên
> Marketing SSR/SSG SEO; dashboard sau login ưu tiên TTI. Team skill quyết định stack. Hybrid routeRules / App Router segment phù hợp.

---

## Phase D — API & Auth (13’)

1. 401 vs 403  
2. Refresh queue  
3. Abort search  
4. Ẩn nút ≠ security  

---

## Phase E — Perf & A11y (12’)

1. LCP element + 2 fix  
2. CLS ảnh  
3. Modal focus trap  
4. axe không đủ  

---

## Phase F — Soft (10’)

### Interviewer
> Conflict với designer về contrast / deadline?

### Ứng viên
> Đưa tiêu chí WCAG + impact user; đề xuất token đạt AA; nếu deadline ép → ship kèm ticket nợ có owner/date.

### Interviewer
> Ước lượng sai — làm gì?

### Ứng viên
> Communicate sớm, cắt scope, giữ quality gate (test/a11y) cho phần ship.

---

## Hỏi ngược tốt
> Perf budget? Field RUM? Definition of Done có a11y/test? Quyền FE với API contract?

---

## Checklist tự chấm toàn buổi

- [ ] STAR gọn có số  
- [ ] JS event loop + closure  
- [ ] TS unknown/union  
- [ ] Framework có trade-off  
- [ ] Auth/RBAC đúng tầng  
- [ ] Perf metric đúng tên  
- [ ] A11y modal/keyboard  
- [ ] Test strategy hợp lý  
- [ ] Soft skills chuyên nghiệp  
- [ ] Hỏi ngược chất lượng  

**Mid**: đủ ý chính, ví dụ cụ thể.  
**Senior**: chủ động trade-off, process, phản biện bằng tiêu chí/số.


## Tự luyện

1. Bấm giờ, tự trả lời trước khi đọc đáp án mẫu.
2. Thu âm 1 lần và nghe lại chỗ lan man.
3. Viết 1 ví dụ từ project thật/giả định ERP.
