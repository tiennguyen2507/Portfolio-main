import { z } from 'zod'

/**
 * Zod schema cho login form
 * Sử dụng với vee-validate để validate form đăng nhập
 */
export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email là bắt buộc',
      invalid_type_error: 'Email phải là chuỗi',
    })
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .trim(),
  password: z
    .string({
      required_error: 'Mật khẩu là bắt buộc',
      invalid_type_error: 'Mật khẩu phải là chuỗi',
    })
    .min(1, 'Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  rememberMe: z.boolean().optional(),
})

/**
 * Type inference từ schema
 * Sử dụng để type-safe cho form data
 */
export type LoginFormData = z.infer<typeof loginSchema>
