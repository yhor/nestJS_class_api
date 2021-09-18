import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoClient =  new DynamoDBClient({
  region: 'ap-northeast-2'
})

const docClient = DynamoDBDocumentClient.from(dynamoClient);

export default docClient;