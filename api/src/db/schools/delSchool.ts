import { DeleteCommand, DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import { School } from '../../schools/entities/school.entity';
import client from '../client';

const delSchool = (school: School) => {
  const Key = {
    name: school.name,
    area: school.area,
  }
  const delUserParams: DeleteCommandInput = {
    TableName: process.env.DYNAMO_SCHOOL,
    Key
  }

  const command = new DeleteCommand(delUserParams);
  return client.send(command);
}

export default delSchool;
