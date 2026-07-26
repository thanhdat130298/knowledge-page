# 10. Flexbox & CSS Grid

> Bài 10/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Chọn Flex vs Grid đúng bài toán
- Giải thích align/justify và gap
- Làm được layout card/responsive phổ biến

## Cách trả lời phỏng vấn

1. Flex = 1 chiều; Grid = 2 chiều — mở đầu chuẩn.
2. Nêu case ERP: toolbar (flex), dashboard cards (grid).
3. Nhắc `minmax`/`auto-fit` để tỏ ra dùng Grid thực tế.

## Kiến thức cốt lõi

### 1. Khi nào Flex, khi nào Grid?

- **Flex**: nav, hàng action, căn giữa theo 1 trục, phân phối space giữa item.
- **Grid**: trang 2D (sidebar + main), gallery, form nhiều cột thẳng hàng.

Có thể kết hợp: grid tổng thể, flex trong component.

### 2. Flex essentials

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
```

`flex: 1` / `flex-shrink` hay được hỏi khi item bị bóp/tràn.

### 3. Grid essentials

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

`auto-fit` + `minmax` = responsive ít breakpoint.

### 4. Alignment

- Flex: `justify-content` (main), `align-items` (cross)
- Grid: `justify-items`/`align-items` cho cell; `place-items` shorthand

### 5. Câu trả lời mẫu

> “Em dùng flex cho thanh công cụ một chiều, grid cho layout 2D và card. Responsive card thường `auto-fit + minmax`. Gap thay margin thủ công giữa item.”


## Tóm tắt nhanh

- 1D → flex, 2D → grid
- gap là bạn của maintainability
- minmax/auto-fit giảm media query

## Tự kiểm tra

1. Căn giữa tuyệt đối 1 nút trong màn hình: flex hay grid?
2. `auto-fit` khác `auto-fill` (mức ý tưởng)?
3. Vì sao không nên dùng float cho layout hiện đại?

## Lỗi thường gặp

- Dùng float/table cho layout mới
- Nhầm trục justify/align
- Hardcode width cột thay vì minmax
