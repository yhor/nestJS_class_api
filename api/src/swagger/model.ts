import { ApiProperty } from '@nestjs/swagger';

export class swaggerUser {
  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '권한' })
  role: string;
}

export class swaggerSchool {
  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '지역' })
  area: string;
}

export class news {
  @ApiProperty({ description: '제목' })
  subject: string;

  @ApiProperty({ description: '내용' })
  content: string;
}

export class swaggerSchoolNew {
  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '지역' })
  area: string;

  @ApiProperty({ description: '지역' })
  news: news;
}
