# 41. Buổi interview Testing (30–40 phút) — mock

> Bài 41/44 — series **Frontend Mid/Senior Interview**.
> Định dạng: **giả lập buổi phỏng vấn** (Interviewer ↔ Ứng viên) + debrief.

## Mục tiêu bài học

- Trả lời strategy + viết mô tả test case
- Thảo luận flake và CI

## Cách dùng

1. Bấm giờ 35’.
2. Nói rõ phạm vi không test.

## Câu 1
### Interviewer
> Em test form tạo user thế nào?

### Ứng viên
> Component test: hiện lỗi required, submit gọi API mock thành công/thất bại, disable nút khi pending. E2E: 1 case happy path trên staging nếu critical.

---

## Câu 2
### Interviewer
> Test bị flake — xử lý?

### Ứng viên
> Tìm wait thiếu, race, data shared. Dùng đợi theo role/assertion, isolation data, retry có kiểm soát, tránh timeout mù.

---

## Câu 3
### Interviewer
> Coverage 100% có cần?

### Ứng viên
> Không. Coverage là tín hiệu, không mục tiêu. Ưu tiên nhánh rủi ro nghiệp vụ.

---

## Checklist
- [ ] Pyramid rõ
- [ ] RTL mindset
- [ ] E2E hẹp
- [ ] Flake có quy trình


## Tự luyện

1. Bấm giờ, tự trả lời trước khi đọc đáp án mẫu.
2. Thu âm 1 lần và nghe lại chỗ lan man.
3. Viết 1 ví dụ từ project thật/giả định ERP.
