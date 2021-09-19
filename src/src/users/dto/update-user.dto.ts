import { PartialType } from '@nestjs/swagger';
import { CreateSubDto, CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateSubDto extends PartialType(CreateSubDto) {}
