import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { User } from './../../users/entities/users.entity'
import client from '../client';

const putUser = (user: User) => {
  const putUserParams: PutCommandInput = {
    TableName: 'Users',
    Item: {
      PK: 'name',
      SK: 'grade',
      subs: user.subs,
    }
  }
  const command = new PutCommand(putUserParams);
  return client.send(command);
}

export default putUser;
