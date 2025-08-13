# Code Formatting & Linting Setup

Project này đã được cấu hình với Prettier và ESLint để đảm bảo code style nhất quán.

## Cài đặt

Các dependencies đã được cài đặt:

- `prettier`: Code formatter
- `eslint`: Code linter
- `eslint-config-prettier`: Tắt các ESLint rules xung đột với Prettier
- `eslint-plugin-prettier`: Chạy Prettier như một ESLint rule

## Scripts

### Format Code

```bash
# Format tất cả files
yarn format

# Kiểm tra format mà không sửa
yarn format:check
```

### Lint Code

```bash
# Lint tất cả files
yarn lint

# Lint và tự động sửa các lỗi có thể sửa được
yarn lint:fix
```

## Cấu hình

### Prettier (.prettierrc)

- `semi: false`: Không thêm dấu chấm phẩy
- `singleQuote: true`: Sử dụng dấu nháy đơn
- `tabWidth: 2`: Indent 2 spaces
- `printWidth: 80`: Độ rộng tối đa 80 ký tự
- `trailingComma: "es5"`: Thêm dấu phẩy cuối cho ES5
- `vueIndentScriptAndStyle: true`: Indent script và style trong Vue files

### ESLint (eslint.config.mjs)

- Sử dụng cấu hình flat config mới của ESLint
- Tích hợp với Prettier
- Bỏ qua các file Vue, TypeScript để tránh lỗi parse
- Định nghĩa các global variables cho Nuxt, Vue, Pinia

### VS Code Settings (.vscode/settings.json)

- Tự động format khi save
- Sử dụng Prettier làm default formatter
- Tự động fix ESLint errors khi save

## Extensions được khuyến nghị

File `.vscode/extensions.json` đã được tạo với các extensions:

- `esbenp.prettier-vscode`: Prettier extension
- `dbaeumer.vscode-eslint`: ESLint extension
- `Vue.volar`: Vue 3 support
- `bradlc.vscode-tailwindcss`: Tailwind CSS support
- `ms-vscode.vscode-typescript-next`: TypeScript support

## Workflow

1. **Khi code**: VS Code sẽ tự động format khi save
2. **Trước commit**: Chạy `yarn format` và `yarn lint` để đảm bảo code sạch
3. **CI/CD**: Có thể thêm `yarn format:check` và `yarn lint` vào pipeline

## Troubleshooting

### ESLint không nhận diện được Vue/TypeScript

- Hiện tại ESLint chỉ được cấu hình cho JavaScript files
- Để hỗ trợ đầy đủ Vue và TypeScript, cần cài đặt thêm parsers và plugins

### Prettier không format được file

- Kiểm tra file có trong `.prettierignore` không
- Đảm bảo file extension được hỗ trợ

### VS Code không tự động format

- Cài đặt Prettier extension
- Kiểm tra settings trong `.vscode/settings.json`
- Restart VS Code sau khi thay đổi settings
