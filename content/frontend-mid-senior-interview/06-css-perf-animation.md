# 12. CSS Performance & Animation

> Bài 12/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt animate property 'rẻ' vs 'đắt'
- Giải thích CLS liên quan CSS
- Biết prefers-reduced-motion

## Cách trả lời phỏng vấn

1. Ưu tiên `transform`/`opacity` cho animation UI.
2. Nêu pipeline: layout → paint → composite (mức khái niệm).
3. A11y motion: luôn nhắc reduced-motion.

## Kiến thức cốt lõi

### 1. Animation nào dễ mượt?

- Tốt: `transform`, `opacity` (thường composite)
- Cẩn thận: `width`, `height`, `top`, `left`, `margin` (dễ gây layout)

```css
.modal {
  transform: translateY(8px);
  opacity: 0;
  transition: transform .2s ease, opacity .2s ease;
}
.modal.is-open {
  transform: translateY(0);
  opacity: 1;
}
```

### 2. `will-change`

Gợi ý browser tối ưu — **đừng** gắn sẵn mọi element. Chỉ khi đang animate / đo được lợi ích.

### 3. CLS (Cumulative Layout Shift)

Nguyên nhân CSS/HTML hay gặp:
- Ảnh không dành chỗ (thiếu width/height/aspect-ratio)
- Font swap nhảy layout
- Banner chèn muộn

Cách nói: reserve space, `aspect-ratio`, font-display strategy.

### 4. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

(Hoặc tinh chỉnh nhẹ hơn thay vì tắt hết — tùy product.)

### 5. Câu trả lời mẫu

> “Em animate transform/opacity, tránh đụng layout liên tục. Chừa chỗ media để giảm CLS. Tôn trọng prefers-reduced-motion. will-change dùng có chủ đích.”


## Tóm tắt nhanh

- transform/opacity ưu tiên
- CLS = chỗ trống + font + chèn muộn
- Motion cũng là a11y

## Tự kiểm tra

1. Vì sao animate `height` dễ jank hơn `scaleY`?
2. Làm sao giảm CLS cho ảnh?
3. will-change lạm dụng hại gì?

## Lỗi thường gặp

- Animate left/top cho mọi hover
- Ảnh không set kích thước
- Bỏ qua user giảm chuyển động
