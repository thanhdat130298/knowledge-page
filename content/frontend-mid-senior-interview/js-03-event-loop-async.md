# 03. JavaScript: Event loop, Promise & async/await

> Bài 3/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích call stack / microtask / macrotask
- So sánh Promise.all vs allSettled
- Dùng async/await kèm error handling đúng

## Cách trả lời phỏng vấn

1. Vẽ nhanh: stack trống → microtask hết → macrotask tiếp.
2. Luôn có ví dụ `setTimeout(0)` vs `Promise.then`.
3. Nói race condition khi search/API.

## Kiến thức cốt lõi

### 1. Event loop (mức phỏng vấn)

JS chạy single-thread trên call stack. Web API/timer/network xong đẩy callback vào queue.

- **Microtask**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`
- **Macrotask**: `setTimeout`, `setInterval`, I/O, UI event (khái niệm)

Sau mỗi turn stack trống: **xử lý hết microtask** rồi mới macrotask.

```js
console.log('A')
setTimeout(() => console.log('B'), 0)
Promise.resolve().then(() => console.log('C'))
console.log('D')
// A D C B
```

### 2. Promise

States: pending → fulfilled / rejected. Chain tạo microtask.

### 3. `async/await`

`async` function luôn trả Promise. `await` pause hàm (không block thread), phần sau chạy như microtask khi resolve.

```js
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`)
    if (!res.ok) throw new Error('Failed')
    return await res.json()
  } catch (e) {
    // normalize error
    throw e
  }
}
```

### 4. `Promise.all` vs `allSettled`

- `all`: fail-fast, cần mọi request thành công
- `allSettled`: chờ tất cả, hợp widget độc lập trên dashboard

### 5. Race khi search

Request cũ trả về sau request mới → UI sai. Fix: abort controller, sequence id, hoặc ignore stale.

### 6. Câu trả lời mẫu

> “Em giải thích A/D/C/B để chứng minh microtask trước timeout. async/await giúp đọc Promise, vẫn phải try/catch. Dashboard dùng allSettled; search có abort để tránh race.”


## Tóm tắt nhanh

- Microtask trước macrotask
- all vs allSettled theo use-case
- Abort/stale guard cho search

## Tự kiểm tra

1. In ra thứ tự với nested Promise + timeout?
2. Khi nào không dùng Promise.all?
3. AbortController giúp gì?

## Lỗi thường gặp

- Nói setTimeout(0) chạy trước Promise
- Quên catch → unhandled rejection
- Fire nhiều request search không hủy
