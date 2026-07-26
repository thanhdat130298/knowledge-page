# 42. Git, PR & Code review cho phỏng vấn

> Bài 42/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Mô tả flow branch/PR chuẩn
- Review theo checklist correctness → maintainability
- Xử lý disagreement chuyên nghiệp

## Cách học / trả lời phỏng vấn

1. Nhỏ PR > PR khủng.
2. Review: hành vi, edge case, security, a11y, test.
3. Disagree với data/options, không công kích.

## Kiến thức cốt lõi

### 1. Flow

feature branch → PR nhỏ → CI → review → squash/rebase theo team → deploy.

Commit message rõ ràng (why). Tránh secret trong git.

### 2. Checklist review

1. Correctness & edge cases  
2. Security/a11y/perf regression  
3. API contract  
4. Đọc được / naming  
5. Test đủ mức rủi ro  

### 3. Conflict ý kiến

> “Em thấy option A dễ test hơn vì… Option B nhanh ship nhưng nợ X. Team chọn theo ưu tiên sprint?”

### 4. Câu trả lời mẫu

> “Em giữ PR nhỏ, mô tả ảnh hưởng. Review ưu tiên bug/security trước style. Không đồng ý thì đưa trade-off và đề xuất POC ngắn.”


## Tự kiểm tra

1. Vì sao PR nhỏ tốt hơn?
2. Ưu tiên comment review theo thứ tự nào?
3. Lỡ commit secret thì sao?

## Lỗi thường gặp

- PR 3000 dòng không context
- Nitpick style trước correctness
- Force push lung tung lên shared branch
