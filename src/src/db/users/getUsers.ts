import { User } from '../../users/entities/user.entity';
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import client from '../client';
import { userProcessing } from '../../common/helper/dynamo.helper';

const getUsers = async (): Promise<User[]> =>  {
  const getUserParams: ScanCommandInput = {
    TableName: process.env.DYNAMO_USER,
  }
  
  const command = new ScanCommand(getUserParams);
  const { Items } = await client.send(command);

  return userProcessing(Items);
}

export default getUsers;
