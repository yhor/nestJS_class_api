import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

class News {
  @ApiProperty({ description: 'id' })
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ description: '제목' })
  @IsString()
  readonly subject: string;

  @ApiProperty({ description: '내용' })
  @IsString()
  readonly content: string;
  
  @ApiProperty({ description: '생성일' })
  @IsOptional()
  @IsDate()
  readonly reg_date?: Date;
  
  @ApiProperty({ description: '수정일' })
  @IsOptional()
  @IsDate()
  readonly update_date?: Date;
  
  @ApiProperty({ description: '삭제여부' })
  @IsOptional()
  @IsString()
  readonly is_delete?: string;
}

export class CreateSchoolDto {
  @ApiProperty({ description: '지역' })
  @IsString()
  readonly area: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '뉴스' })
  @IsOptional()
  readonly news?: Array<News>;
}