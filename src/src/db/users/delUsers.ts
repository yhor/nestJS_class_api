import { User } from './../../users/entities/user.entity'
import client from '../client';
import { DeleteCommand, DeleteCommandInput } from '@aws-sdk/lib-dynamodb';

const delUser = (user: User) => {
  const Key = {
    name: user.name,
    grade: user.grade,
  }
  const delUserParams: DeleteCommandInput = {
    TableName: process.env.DYNAMO_USER,
    Key
  }

  const command = new DeleteCommand(delUserParams);
  return client.send(command);
}

export default delUser;
