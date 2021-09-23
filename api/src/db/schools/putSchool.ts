import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { School } from '../../schools/entities/school.entity';
import client from '../client';

const putSchool = (school: School) => {
  const Item = {
    area: school.area,
    name: school.name,
  }

  if(school.news) {
    Item['news'] = JSON.stringify(school.news);
  }

  const putSchoolParams: PutCommandInput = {
    TableName: process.env.DYNAMO_SCHOOL,
    Item
  }
  const command = new PutCommand(putSchoolParams);
  return client.send(command);
}

export default putSchool;
