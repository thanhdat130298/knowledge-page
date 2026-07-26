# 05. JavaScript: Immutability, arrays & modules

> Bài 5/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích vì sao immutability quan trọng với UI
- Thành thạo map/filter/reduce và immutable update
- Phân biệt ESM vs CommonJS ở mức đủ

## Cách trả lời phỏng vấn

1. Nối sang React/Vue: đổi reference để framework detect update.
2. Spread là shallow — nhắc nested object.
3. Module: side-effect import, tree-shaking.

## Kiến thức cốt lõi

### 1. Vì sao không mutate lung tung?

Framework và memoization dựa vào thay đổi reference. Mutate tại chỗ dễ miss update và khó debug.

```js
// Bad trong React mindset
user.name = 'An'
setUser(user)

// Better
setUser({ ...user, name: 'An' })
```

### 2. Array immutably

```js
const next = [...list, item]
const without = list.filter(x => x.id !== id)
const mapped = list.map(x => x.id === id ? { ...x, done: true } : x)
```

`sort`/`splice` mutate — clone trước nếu cần giữ bản cũ (`toSorted` hiện đại nếu target hỗ trợ).

### 3. Shallow vs deep

Spread/`Object.assign` nông. Nested: spread từng tầng hoặc `structuredClone` khi thật sự cần bản độc lập.

### 4. Modules

- ESM: `import`/`export`, static analyzable, browser/native & bundler
- CJS: `require`/`module.exports` (Node legacy)

### 5. Destructuring & rest

Giúp đọc code rõ; rest gom phần còn lại — hay hỏi kèm function params.

### 6. Câu trả lời mẫu

> “Em update state/object theo hướng immutable để UI detect change và dễ lý luận. Dùng map/filter/spread; nhớ shallow copy. Module theo ESM trong app hiện đại.”


## Tóm tắt nhanh

- Immutable update = reference mới
- map/filter thay mutate
- Spread nông, deep có chủ đích

## Tự kiểm tra

1. Sửa 1 item trong mảng object không mutate gốc?
2. structuredClone khác JSON.parse(JSON.stringify)?
3. Tree-shaking cần điều kiện gì ở module?

## Lỗi thường gặp

- sort tại chỗ rồi setState cùng reference
- Deep clone mọi chỗ → perf kém
- Circular require / side effect import nặng
