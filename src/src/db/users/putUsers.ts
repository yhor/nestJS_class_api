import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { User } from './../../users/entities/user.entity'
import client from '../client';

const putUser = (user: User) => {
  const Item = {
    name: user.name,
    grade: user.grade,
  }

  if(user.subs) {
    Item['subs'] = JSON.stringify(user.subs);
  }

  const putUserParams: PutCommandInput = {
    TableName: process.env.DYNAMO_USER,
    Item
  }

  const command = new PutCommand(putUserParams);
  return client.send(command);
}

export default putUser;
