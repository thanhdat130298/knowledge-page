# 35. Buổi interview TypeScript (45 phút) — kịch bản mock

> Bài 35/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên) + debrief.

## Mục tiêu bài học

- Đi hết warm-up → deep dive → scenario typing
- Thể hiện tư duy boundary typing
- Tự chấm sau buổi

## Cách dùng

1. Bấm giờ 45’. Tự trả lời trước đáp án.
2. Nói trade-off, không thuộc lòng định nghĩa.

## Agenda

| Phút | Nội dung |
|------|----------|
| 0–5 | Vì sao dùng TS |
| 5–20 | type/interface, unknown, narrowing |
| 20–35 | Generic + utility + API typing |
| 35–45 | Scenario form + hỏi ngược |

---

## Câu 1
### Interviewer
> Dự án JS chạy tốt — vì sao migrate TS?

### Ứng viên
> Giảm bug null/undefined, refactor an toàn hơn, DX autocomplete, contract rõ với backend. Chi phí: learning + typing legacy. Em migrate dần từ biên module mới.

---

## Câu 2
### Interviewer
> `any` vs `unknown`?

### Ứng viên
> any tắt kiểm tra. unknown buộc narrow. Em dùng unknown cho input bên ngoài (JSON, localStorage).

---

## Câu 3 — Scenario
### Interviewer
> Type hàm `getUser(id)` có thể 404 hoặc network error?

### Ứng viên
```ts
type GetUserResult =
  | { status: 'ok'; user: User }
  | { status: 'not_found' }
  | { status: 'error'; message: string }
```
> UI switch theo status — exhaustive với never.

---

## Câu 4
### Interviewer
> Form create/update User — type thế nào?

### Ứng viên
> `CreateUserInput = Omit<User, 'id'>`; update: `Partial<CreateUserInput> & { id: string }`. Validate runtime trước submit.

---

## Checklist tự chấm
- [ ] unknown > any
- [ ] Discriminated union
- [ ] Utility đúng chỗ
- [ ] Boundary + runtime validate
- [ ] Strict mindset


## Tự luyện

1. Bấm giờ, tự trả lời trước khi đọc đáp án mẫu.
2. Thu âm 1 lần và nghe lại chỗ lan man.
3. Viết 1 ví dụ từ project thật/giả định ERP.
