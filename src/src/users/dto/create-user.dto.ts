import { IsDate, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubDto {
  @ApiProperty()
  @IsString()
  readonly area: string;

  @ApiProperty()
  @IsString()
  readonly name: string;
  
  @ApiProperty()
  @IsOptional()
  @IsDate()
  readonly sub_start_date?: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsDate()
  readonly sub_end_date?: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly is_sub?: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  readonly subs?: Array<CreateSubDto>;
}
