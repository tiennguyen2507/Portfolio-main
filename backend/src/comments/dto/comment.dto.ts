import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'Avatar phải là chuỗi' })
  @IsNotEmpty({ message: 'Avatar không được để trống' })
  avatar: string;

  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsString({ message: 'Mối quan hệ phải là chuỗi' })
  @IsNotEmpty({ message: 'Mối quan hệ không được để trống' })
  relationship: string;

  @IsString({ message: 'Nhận xét phải là chuỗi' })
  @IsNotEmpty({ message: 'Nhận xét không được để trống' })
  comment: string;

  @IsBoolean({ message: 'Trạng thái phải là boolean' })
  @IsOptional()
  status?: boolean;
}
