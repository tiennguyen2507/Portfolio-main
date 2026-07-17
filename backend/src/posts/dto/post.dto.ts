import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @IsString({ message: 'Nội dung mô tả phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung mô tả không được để trống' })
  description: string;

  @IsString({ message: 'Thumbnail phải là chuỗi URL' })
  @IsNotEmpty({ message: 'Thumbnail không được để trống' })
  thumbnail: string;

  @IsString({ message: 'Danh mục phải là chuỗi' })
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  category: string;

  @IsBoolean({ message: 'Trạng thái phải là boolean' })
  @IsOptional()
  status?: boolean;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
