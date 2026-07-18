# Design System — Knowledge FStack

## Màu sắc (CSS variables)

- Light background `#f4f7f6`, foreground `#12201c`
- Accent teal `#0f766e` / dark accent `#2dd4bf`
- Card, border, muted, danger, warning, success qua `:root` / `.dark`

## Typography

- Display: Outfit (`--font-display`)
- Body: Source Sans 3 (`--font-sans`) — hỗ trợ tiếng Việt
- Mono: JetBrains Mono

## Spacing & radius

- Radius lớn ~14px (`--radius`)
- Section gaps: `space-y-14`, card padding `p-4`/`p-5`

## Components

- Buttons: primary / secondary / ghost / danger
- Cards: `.surface-card` — dùng khi cần container tương tác hoặc nhóm nội dung list
- Forms: label + input + error text
- Custom content blocks: `.custom-block[data-type=...]`

## Theme

- Light mặc định (không theo OS)
- Lưu `localStorage` key `kf-theme` + boot script chống FOUC

## Responsive

- Mobile-first; filter drawer trên list; TOC collapsible mobile; sidebar desktop

## Accessibility

- Semantic landmarks, focus-visible, modal focus (auth dialog), icon buttons có `aria-label`, respect `prefers-reduced-motion`
