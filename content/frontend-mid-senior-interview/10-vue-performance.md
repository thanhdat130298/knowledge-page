# 16. Vue Performance & debugging

> Bài 16/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Liệt kê kỹ thuật giảm render thừa
- Biết shallowRef / v-memo ở mức đúng chỗ
- Có quy trình debug bằng DevTools

## Cách trả lời phỏng vấn

1. Đo trước khi tối ưu (DevTools / performance tab).
2. List lớn: pagination/virtualize hơn là micro-optimize sớm.
3. Mọi `v-for` cần `key` ổn định.

## Kiến thức cốt lõi

### 1. Nguyên nhân update nặng

- Reactive object quá lớn
- Computed/render làm việc nặng
- List không key / key = index khi reorder
- Props đổi reference liên tục (object/array mới mỗi lần)

### 2. Công cụ

- Vue DevTools: component update highlight
- `shallowRef`: chỉ trigger khi thay `.value`, không deep — hợp data lớn ít mutate sâu
- `v-once` / `v-memo`: case hẹp, UI tĩnh hoặc memo theo deps

### 3. `keep-alive`

Cache tab/form khi chuyển route con — nhớ `activated`/`deactivated` và memory cost.

### 4. List lớn

Ưu tiên: phân trang server, virtual scroll khi UX cần scroll dài. Không render 10k DOM node.

### 5. Câu trả lời mẫu

> “Em đo bằng DevTools trước. Tối ưu props/computed, key ổn định, list lớn thì page/virtualize. shallowRef khi data lớn ít deep mutate. Tránh tối ưu mù.”


## Tóm tắt nhanh

- Measure first
- Key ổn định
- Virtualize/paginate list lớn

## Tự kiểm tra

1. index làm key khi nào chấp nhận được?
2. shallowRef khác ref thế nào?
3. keep-alive trade-off gì?

## Lỗi thường gặp

- Tối ưu sớm không đo
- Render cả bảng 50k rows
- Object literal props trong template gây re-render
