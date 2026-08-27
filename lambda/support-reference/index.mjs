import {
  DynamoDBClient,
  PutItemCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-west-2"
});

export const handler = async (event) => {
  console.log( "Amazon Connect event:", JSON.stringify(event)
  );

  const randomNumber =
    Math.floor(100000 + Math.random() * 900000);

  const reference = `CNX-${randomNumber}`;

  console.log("Generated reference:", reference  );

  const callerNumber =
    event?.Details?.ContactData?.CustomerEndpoint?.Address ||
    "UNKNOWN";

  const createdAt =
    new Date().toISOString();

  const command = new PutItemCommand({
    TableName: "connexsupportcall",

    Item: {
      referencenumber: { S: reference },
      callernumber: { S: callerNumber },
      createdate: { S: createdAt }
    }
  });

  await client.send(command); console.log("Saved support call:",reference );

  return {
    reference
  };
};
