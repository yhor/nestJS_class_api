import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

class News {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly subject: string;

  @IsString()
  readonly content: string;
  
  @IsOptional()
  @IsDate()
  readonly reg_date?: Date;
  
  @IsOptional()
  @IsDate()
  readonly update_date?: Date;
  
  @IsOptional()
  @IsString()
  readonly is_delete?: string;
}

export class CreateSchoolDto {
  @IsString()
  readonly area: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  readonly news?: Array<News>;
}