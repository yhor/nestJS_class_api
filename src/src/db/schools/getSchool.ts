import { School } from './../../schools/entities/school.entity';
import client from '../client';
import { GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';
import { NotFoundException } from '@nestjs/common';
import { schoolProcessing } from './../../common/helper/dynamo.helper';

const getSchool = async (school: School, overCheck = true): Promise<School> => {
  const getSchoolParams: GetCommandInput = {
    TableName: process.env.DYNAMO_SCHOOL,
    Key: {
      area: school.area,
      name: school.name,
    }
  }
  const command = new GetCommand(getSchoolParams);
  const { Item } = await client.send(command);

  if (!overCheck && Item) {
    throw new NotFoundException(`중복된 학교입니다.`);
  } else if (overCheck && !Item) {
    throw new NotFoundException(`존재하지 않는 학교입니다..`);
  } else {
    return schoolProcessing([Item], true);
  }
}

export default getSchool;
