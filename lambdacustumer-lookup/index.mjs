import {
  DynamoDBClient,
  GetItemCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-2"
});

export const handler = async (event) => {
  console.log("Request received:", JSON.stringify(event));

  // Supports both direct Lambda tests and Amazon Connect parameters
  const customerId =
    event?.Details?.Parameters?.customerId ??
    event?.customerId;

  if (!customerId) {
    return {
      statusCode: 400,
      message: "customerId is required"
    };
  }

  const command = new GetItemCommand({
    TableName: "ConnexCustomers",
    Key: {
      customerId: { S: customerId }
    }
  });

  const result = await client.send(command);

  console.log("DynamoDB result:", JSON.stringify(result));

  if (!result.Item) {
    return {
      statusCode: 404,
      message: "Customer not found"
    };
  }

  const customerName = result.Item.customerName?.S ?? "Customer";
  const supportType =
    result.Item["support Type"]?.S ??
    result.Item.supportType?.S ??
    "General support";

  const queue =
    supportType.toLowerCase() === "technical support"
      ? "Technical Support"
      : "General Support";

  return {
    statusCode: 200,
    customerName,
    supportType,
    queue
  };
};
