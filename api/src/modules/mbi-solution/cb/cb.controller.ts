import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
  refs,
} from '@nestjs/swagger';
import { AuthPublic } from 'src/decorator/authPubilc.decorator';
import { GgService } from 'src/ggg/gg/gg.service';
import {
  swaggerSchool,
  swaggerSchoolNew,
  swaggerUser,
} from 'src/swagger/model';
import { SwaggerDefault } from 'src/swagger/swgDefault.decorator';
import { CbService } from './cb.service';
import { bad } from './model/bad';
import { good } from './model/good';

@ApiTags('cb')
@Controller('cb')
@AuthPublic()
@SwaggerDefault()
export class CbController {
  constructor(
    private readonly cbService: CbService,
    private readonly ggService: GgService,
  ) {}

  @ApiOperation({ summary: 'zgzgz ', description: '특정 학교(뉴스) 보기' })
  @ApiOkResponse({
    status: 200,
    description: 'goog',
    content: {
      'application/json': {
        examples: {
          예시1: {
            value: swaggerSchool,
            description: 'ㅐㅏㅐㅏㅐㅏㅐ',
          },
          예시2: {
            value: swaggerUser,
            description: 'ㅐㅏㅐㅏㅐㅏㅐ222',
          },
        },
        schema: {
          anyOf: [
            { $ref: getSchemaPath(swaggerSchool) },
            { $ref: getSchemaPath(swaggerUser) },
          ],
        },
      },
    },
  })
  @Get('/zg')
  findOne() {
    this.cbService.check();
    const result = this.ggService.get();

    console.log('result', result);
    return result;
  }
}
