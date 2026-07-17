import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateContactDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString({ message: 'Nội dung tin nhắn phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  message: string;
}

export class UpdateContactDto {
  @IsBoolean({ message: 'Trạng thái phải là boolean' })
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  status: boolean;
}
