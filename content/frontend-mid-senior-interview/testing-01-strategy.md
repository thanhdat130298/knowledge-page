# 40. Testing strategy: unit, component, e2e

> Bài 40/44 — series **Frontend Mid/Senior Interview**. Mid→senior, có ví dụ và trade-off.

## Mục tiêu bài học

- Chọn đúng tầng test theo rủi ro
- Giải thích Testing Library mindset
- Nêu trade-off e2e vs unit

## Cách học / trả lời phỏng vấn

1. Trophy/pyramid: nhiều unit/component, ít e2e đắt.
2. Test hành vi user, không test implementation detail.
3. Mock mạng ở boundary hợp lý.

## Kiến thức cốt lõi

### 1. Tầng test

| Tầng | Ví dụ | Khi nào |
|------|--------|---------|
| Unit | pure function, utils | logic thuần |
| Component | Testing Library | UI tương tác |
| Integration | page + mock API | flow ngắn |
| E2E | Playwright | critical path |

### 2. Testing Library

```ts
await userEvent.click(screen.getByRole('button', { name: /lưu/i }))
expect(screen.getByText(/thành công/i)).toBeInTheDocument()
```

Query theo role/text — gần user & a11y.

### 3. E2E

Chậm, flake nếu không ổn định. Chỉ cover login → tạo entity → logout (hoặc 3–5 flow business).

### 4. Câu trả lời mẫu

> “Em test logic bằng unit, UI bằng Testing Library theo role, e2e vài critical flow. Không screenshot mọi thứ. Ưu tiên test hành vi.”


## Tự kiểm tra

1. Vì sao tránh query bằng class CSS?
2. E2E quá nhiều hại gì?
3. Mock API ở đâu?

## Lỗi thường gặp

- Test snapshot lớn vô nghĩa
- Chỉ e2e không unit
- Test private state thay vì UI
