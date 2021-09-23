import { School } from './../../schools/entities/school.entity';
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import client from '../client';
import { schoolProcessing } from './../../common/helper/dynamo.helper';

const getSchools = async (): Promise<School[]> =>  {
  const getSchoolParams: ScanCommandInput = {
    TableName: process.env.DYNAMO_SCHOOL,
  }
  
  const command = new ScanCommand(getSchoolParams);
  const { Items } = await client.send(command);

  return schoolProcessing(Items);
}

export default getSchools;
