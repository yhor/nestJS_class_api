import { ApiProperty } from "@nestjs/swagger";


export class swaggerLoginInfo {
    @ApiProperty()
    name: string;

    @ApiProperty()
    role: string;
}