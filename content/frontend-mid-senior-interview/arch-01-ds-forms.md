# 43. Design System & Forms mindset (cross-stack)

> Bài 43/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt UI primitive vs business component
- Nêu nguyên tắc form: validation UX + source of truth
- Chọn lib form theo stack (RHF / VeeValidate mindset)

## Cách học / trả lời phỏng vấn

1. DS = tốc độ + consistency + a11y.
2. Form: controlled performance, schema validate.
3. Tránh boolean props bùng nổ — dùng composition/slots.

## Kiến thức cốt lõi

### 1. Design system

- **Primitive**: Button, Input, Modal (a11y/keyboard chuẩn)
- **Pattern**: FormField, DataTable
- **Business**: UserPicker (domain)

Token: color/spacing/typography. Document keyboard trong Storybook.

### 2. Khi tạo reusable component

Lặp 3+ lần, API ổn định, không copy business rule vào primitive.

Tránh: `isSmall isPrimary isTableHeader isCompact...` → variants + slots/composition.

### 3. Forms

- Source of truth: form state (RHF/VeeValidate) hoặc schema-driven
- Validate: UX client + **server là thật**
- Edit async: `reset` values khi data về
- Perf: uncontrolled/register khi form lớn; Controller khi cần

### 4. Câu trả lời mẫu

> “Em tách primitive khỏi business. Form dùng lib theo stack, schema validate, server vẫn enforce. DS giúp a11y/perf đồng nhất.”


## Tự kiểm tra

1. Primitive khác business component?
2. Boolean props bùng nổ xử lý sao?
3. Client validate có thay server?

## Lỗi thường gặp

- Nhét API call vào Button
- Chỉ validate UI
- DS không document keyboard
