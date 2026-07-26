# 02. JavaScript: Closure, this & bind

> Bài 2/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích closure bằng ví dụ thực tế
- Nắm các quy tắc bind `this`
- Biết stale closure trong UI framework

## Cách trả lời phỏng vấn

1. Closure = function nhớ lexical scope — đừng học thuộc định nghĩa khô.
2. Với `this`: nêu 4–5 rule, rồi arrow function khác gì.
3. Nối sang React/Vue: callback giữ giá trị cũ.

## Kiến thức cốt lõi

### 1. Closure

```js
function createCounter() {
  let count = 0
  return () => ++count
}
const c = createCounter()
c() // 1
c() // 2
```

Dùng cho: private state, factory, debounce, module pattern, custom hooks/composables.

### 2. Stale closure (mid+)

Callback/async giữ biến từ lần tạo cũ, trong khi state đã đổi — rất hay hỏi kèm React `useEffect`.

### 3. Quy tắc `this` (non-strict tóm tắt)

1. Gọi như method: `obj.fn()` → `this = obj`
2. Gọi thường: `fn()` → `undefined` (strict) / global
3. `new Fn()` → `this` instance mới
4. `call/apply/bind` → `this` chỉ định
5. Arrow function: **không có `this` riêng**, lấy lexical `this`

```js
const obj = {
  name: 'Cart',
  regular() { return this.name },
  arrow: () => this?.name,
}
obj.regular() // 'Cart'
obj.arrow()   // không phải 'Cart' như expect method
```

### 4. `bind` / event handler

Mất `this` khi truyền method làm callback → `bind`, arrow bọc, hoặc class field arrow (trade-off).

### 5. Câu trả lời mẫu

> “Closure giúp function giữ biến ngoài. Em dùng cho factory/debounce. `this` phụ thuộc cách gọi; arrow không bind this riêng. Bug UI hay gặp là stale closure khi deps/callback không cập nhật.”


## Tóm tắt nhanh

- Closure = nhớ scope
- this theo cách gọi; arrow = lexical
- Stale closure là điểm mid/senior

## Tự kiểm tra

1. Arrow method trong object literal có `this` thế nào?
2. Cho 1 ví dụ stale closure
3. `bind` khác `call` ở điểm nào?

## Lỗi thường gặp

- Nói arrow luôn 'hơn' regular
- Quên mất this khi pass method
- Không nối được sang framework
