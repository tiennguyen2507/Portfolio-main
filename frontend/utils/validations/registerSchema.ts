import { z } from 'zod'

/**
 * Zod schema cho register form
 * Sử dụng với vee-validate để validate form đăng ký
 */
export const registerSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'Họ là bắt buộc',
        invalid_type_error: 'Họ phải là chuỗi',
      })
      .min(1, 'Họ là bắt buộc')
      .min(2, 'Họ phải có ít nhất 2 ký tự')
      .max(50, 'Họ không được vượt quá 50 ký tự')
      .trim(),
    lastName: z
      .string({
        required_error: 'Tên là bắt buộc',
        invalid_type_error: 'Tên phải là chuỗi',
      })
      .min(1, 'Tên là bắt buộc')
      .min(2, 'Tên phải có ít nhất 2 ký tự')
      .max(50, 'Tên không được vượt quá 50 ký tự')
      .trim(),
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
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
      ),
    confirmPassword: z
      .string({
        required_error: 'Xác nhận mật khẩu là bắt buộc',
        invalid_type_error: 'Xác nhận mật khẩu phải là chuỗi',
      })
      .min(1, 'Xác nhận mật khẩu là bắt buộc'),
    agreeTerms: z.boolean().refine(val => val === true, {
      message: 'Bạn phải đồng ý với điều khoản sử dụng',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'], // Lỗi sẽ hiển thị ở field confirmPassword
  })

/**
 * Type inference từ schema
 * Sử dụng để type-safe cho form data
 */
export type RegisterFormData = z.infer<typeof registerSchema>
