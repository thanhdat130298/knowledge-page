# 06. JavaScript: Debounce, throttle, memory & pitfalls

> Bài 6/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Phân biệt debounce vs throttle kèm use-case
- Nhận diện memory leak phổ biến trên FE
- Kể các pitfall phỏng vấn hay gặp

## Cách trả lời phỏng vấn

1. Debounce: chờ user ngừng gõ; throttle: giới hạn tần suất scroll.
2. Leak: listener/timer/subscription không cleanup.
3. Pitfall: NaN, floating point, optional chaining misuse.

## Kiến thức cốt lõi

### 1. Debounce

Gọi lại sau khoảng yên lặng — search box, resize end.

```js
function debounce(fn, ms) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}
```

### 2. Throttle

Đảm bảo tối đa 1 lần / khoảng ms — scroll tracking, button spam (hoặc dùng disabled).

### 3. Memory leaks FE

- `addEventListener` không remove
- `setInterval` không clear
- WebSocket/store subscribe không unsubscribe
- Closure giữ DOM/object lớn

Trong Vue/React: cleanup `onUnmounted` / `useEffect` return.

### 4. Pitfalls hay hỏi

- `typeof null === 'object'`
- `NaN !== NaN` → dùng `Number.isNaN`
- `0.1 + 0.2 !== 0.3` → tiền tệ dùng integer/decimal lib
- Optional chaining không thay validation business

### 5. Micro-optimization vs correctness

Mid/senior: đúng và maintainable trước; tối ưu khi đo được bottleneck.

### 6. Câu trả lời mẫu

> “Search dùng debounce, scroll dùng throttle. Em luôn cleanup listener/timer. Biết các trap typeof null, NaN, float. Ưu tiên code đúng và rõ, đo rồi hãy tối ưu.”


## Tóm tắt nhanh

- Debounce ≠ throttle
- Cleanup tránh leak
- Biết pitfall cổ điển JS

## Tự kiểm tra

1. Autocomplete nên debounce hay throttle?
2. Kể 3 nguồn leak trên SPA
3. So sánh tiền tệ bằng float được không?

## Lỗi thường gặp

- Debounce click thanh toán (sai UX/business)
- Quên clearInterval khi unmount
- So sánh tiền bằng số thực thô
