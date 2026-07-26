# 09. CSS Cascade, specificity & box model

> Bài 9/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích cascade & specificity không học vẹt
- Nắm box model và box-sizing
- Biết cách tránh 'CSS !important hell'

## Cách trả lời phỏng vấn

1. Vẽ nhanh thứ tự: origin → importance → specificity → source order.
2. Nêu chiến lược: design token + class utility/BEM thay vì !important.
3. Box model: luôn nói border-box trong dự án hiện đại.

## Kiến thức cốt lõi

### 1. Cascade quyết định rule nào thắng

Khi nhiều rule cùng nhắm 1 property: importance (`!important`) → specificity → thứ tự xuất hiện.

### 2. Specificity (cách nói mid)

Inline > ID > class/attribute/pseudo-class > element/pseudo-element.

```css
/* 0,1,0 */
.card { }
/* 0,2,0 */
.card.title { }
/* 1,0,0 */
#app { }
```

Senior tip: specificity cao = khó override → ưu tiên cấu trúc class phẳng.

### 3. `!important` khi nào?

Hiếm: utility override, hoặc third-party buộc phải đè. Nếu team phải `!important` thường xuyên → architecture CSS đang yếu.

### 4. Box model

Content + padding + border (+ margin ngoài flow).

```css
*, *::before, *::after { box-sizing: border-box; }
```

`border-box`: width bao gồm padding+border → layout form/card dễ đoán hơn.

### 5. Margin collapse

Margin dọc của block liền nhau có thể gộp. Flex/grid item không collapse như block flow cổ điển — hay là điểm interviewer check.

### 6. Câu trả lời mẫu

> “Em tính theo cascade: specificity rồi source order. Dự án dùng border-box global, đặt naming/token để tránh !important. Khi debug, em inspect computed và xem rule nào thắng.”


## Tóm tắt nhanh

- Specificity thấp + cấu trúc rõ > !important
- border-box gần như mặc định
- Hiểu collapse để debug khoảng cách lạ

## Tự kiểm tra

1. `#a .b` và `div.b.c` cái nào cao hơn?
2. Vì sao margin top/bottom 'mất' giữa 2 block?
3. Khi nào chấp nhận !important?

## Lỗi thường gặp

- ID selector tràn lan
- Inline style + !important để 'fix cho nhanh'
- Không biết computed đang lấy rule nào
