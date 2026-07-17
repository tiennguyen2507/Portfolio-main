import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @IsString({ message: 'Mô tả phải là chuỗi' })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @IsString({ message: 'Thumbnail phải là chuỗi URL' })
  @IsNotEmpty({ message: 'Thumbnail không được để trống' })
  thumbnail: string;

  @IsArray({ message: 'Skills phải là danh sách chuỗi' })
  @IsString({ each: true, message: 'Mỗi skill phải là chuỗi' })
  @IsOptional()
  skill?: string[];

  @IsBoolean({ message: 'Trạng thái phải là boolean' })
  @IsOptional()
  status?: boolean;
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skill?: string[];

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
