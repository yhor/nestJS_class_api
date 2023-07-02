import { ApiProperty } from '@nestjs/swagger';

export class bad {
  @ApiProperty({ description: '메시지~' })
  message: string;
}
