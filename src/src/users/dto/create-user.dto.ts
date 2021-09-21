import { IsDate, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubDto {
  @ApiProperty({ description: '지역' })
  @IsString()
  readonly area: string;

  @ApiProperty({ description: '학교명' })
  @IsString()
  readonly name: string;
  
  @ApiProperty({ description: '구독 시작일' })
  @IsOptional()
  @IsDate()
  readonly sub_start_date?: Date;
  
  @ApiProperty({ description: '구독 취소일' })
  @IsOptional()
  @IsDate()
  readonly sub_end_date?: Date;
  
  @ApiProperty({ description: '구독여부' })
  @IsOptional()
  @IsString()
  readonly is_sub?: string;
}

export class CreateUserDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '권한' })
  @IsString()
  readonly role: string;

  @ApiProperty({ description: '구독들' })
  @IsOptional()
  readonly subs?: Array<CreateSubDto>;
}
