import { User } from './../../users/entities/user.entity';
import client from '../client';
import { GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';
import { NotFoundException } from '@nestjs/common';
import { userProcessing } from './../../common/helper/dynamo.helper';

const getUser = async (user: User, overCheck = true): Promise<User> => {
  const getUserParams: GetCommandInput = {
    TableName: process.env.DYNAMO_USER,
    Key: {
      name: user.name,
      role: user.role,
    }
  }
  const command = new GetCommand(getUserParams);
  const { Item } = await client.send(command);

  if (!overCheck && Item) {
    throw new NotFoundException(`중복된 유저입니다.`);
  } else if (overCheck && !Item) {
    throw new NotFoundException(`존재하지 않는 유저입니다..`);
  } else {
    return userProcessing([Item], true);
  }
}

export default getUser;
