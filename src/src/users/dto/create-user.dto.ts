import { IsDate, IsOptional, IsString } from "class-validator";

class Subs {
  @IsString()
  readonly area: string;

  @IsString()
  readonly name: string;
  
  @IsDate()
  readonly sub_start_date: Date;
  
  @IsOptional()
  @IsDate()
  readonly sub_end_date?: Date;
  
  @IsString()
  readonly is_sub: string;
}

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly grade: string;

  @IsOptional()
  readonly subs?: Array<Subs>;
}
