import { ApiProperty } from '@nestjs/swagger';

export class good {
  @ApiProperty({ description: '굿이지~' })
  message: string;
}
