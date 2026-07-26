# 13. Vue Reactivity & Composition API

> Bài 13/44 — series **Frontend Mid/Senior Interview**. Trả lời theo hướng dễ hiểu, có ví dụ và trade-off.

## Mục tiêu bài học

- Giải thích ref/reactive và Proxy
- Phân biệt computed / watch / watchEffect
- Nói vì sao Composition API hợp mid+

## Cách trả lời phỏng vấn

1. Nói rõ: UI cập nhật vì dependency tracking, không phải magic.
2. So sánh Options vs Composition theo tổ chức code.
3. Nhắc pitfalls: destructure reactive mất reactivity.

## Kiến thức cốt lõi

### 1. Reactivity hoạt động thế nào (mức phỏng vấn)?

Vue 3 dùng **Proxy** để track read và trigger write. Khi render/computed đọc `ref`/`reactive`, Vue ghi nhận dependency; khi đổi value → update hiệu quả.

### 2. `ref` vs `reactive`

```ts
const count = ref(0)
count.value++

const state = reactive({ open: false })
state.open = true
```

- `ref`: mọi kiểu; cần `.value` trong script.
- `reactive`: object; destructure dễ mất tracking → dùng `toRefs`/`storeToRefs`.

### 3. `computed`

Cache theo dependency; chỉ tính lại khi source đổi. Dùng cho derived state (filter list, label, disabled).

### 4. `watch` vs `watchEffect`

- `watch`: chủ đích theo dõi source cụ thể, có old/new, lazy mặc định.
- `watchEffect`: tự track dependency khi chạy; hợp side effect nhỏ.

Cleanup trong `onInvalidate` / return function — quan trọng với listener/timer.

### 5. Composition API lợi gì?

Gom logic theo **feature** (composable), dễ reuse/test hơn Options API tách data/methods/computed theo option type.

```vue
<script setup lang="ts">
const { users, load } = useUsers()
</script>
```

### 6. Câu trả lời mẫu

> “Vue 3 track dependency qua Proxy. Em dùng ref/reactive đúng chỗ, derived bằng computed, side effect bằng watch có cleanup. Composition + composable giúp tách domain logic cho app lớn.”


## Tóm tắt nhanh

- Proxy → track/trigger
- computed = derived cache
- Composition tổ chức theo feature

## Tự kiểm tra

1. Vì sao destructure `reactive` có thể mất reactivity?
2. Khi nào dùng watch thay computed?
3. Composables giải quyết pain point gì?

## Lỗi thường gặp

- Mutate prop trực tiếp
- watch mọi thứ thay vì computed
- Quên cleanup watch
