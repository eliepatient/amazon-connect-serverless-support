# Amazon Connect Serverless Support

A serverless customer support contact center built with Amazon Connect, AWS Lambda, Amazon DynamoDB, Amazon CloudWatch, and AWS IAM.

## Project Overview

This project demonstrates how AWS serverless services can be integrated to build an automated customer support workflow.

Customers call an Amazon Connect contact center and interact with an IVR to select the type of support they need:

- Press 1 for Technical Support
- Press 2 for General Support

Amazon Connect routes the caller to the appropriate support queue based on their selection.

During the interaction, Amazon Connect invokes an AWS Lambda function that generates a unique support reference number, captures call information, and stores the support ticket in Amazon DynamoDB.

The generated reference number is returned to Amazon Connect and announced to the caller before the call is transferred to a support agent.

Amazon CloudWatch provides execution logging and troubleshooting for the Lambda integration.

---

## Call Flow

```text
Customer Call
      ↓
Amazon Connect
      ↓
Welcome Prompt
      ↓
IVR - Choose Support Type
      ↓
 ┌──────────────┴──────────────┐
 ↓                             ↓
Press 1                       Press 2
Technical Support             General Support
 ↓                             ↓
Technical Queue               General Queue
 └──────────────┬──────────────┘
                ↓
AWS Lambda
                ↓
Generate CNX Reference
                ↓
Create Support Ticket
                ↓
Amazon DynamoDB
                ↓
Return Reference to Amazon Connect
                ↓
Announce Reference Number
                ↓
Transfer to Selected Queue
                ↓
Support Agent
```

---

## Features

- Amazon Connect cloud contact center
- Interactive Voice Response (IVR)
- Technical Support and General Support selection
- Queue-based call routing
- AWS Lambda integration with Amazon Connect
- Automatic support ticket creation
- Unique `CNX-XXXXXX` reference number generation
- Caller phone number capture
- Amazon Connect Contact ID capture
- Support type tracking
- Ticket status tracking
- Call creation timestamp
- DynamoDB support ticket storage
- Dynamic Lambda response returned to Amazon Connect
- Support reference announced to the caller
- CloudWatch execution logging and troubleshooting
- IAM-based access between Lambda and DynamoDB

---

## AWS Services Used

| Service | Purpose |
|---|---|
| Amazon Connect | Contact center, IVR, queues, and call routing |
| AWS Lambda | Generates support references and processes call information |
| Amazon DynamoDB | Stores support ticket and call information |
| Amazon CloudWatch | Execution logs, monitoring, and troubleshooting |
| AWS IAM | Controls Lambda permissions and DynamoDB access |

---

## Support Reference Lambda

The Lambda function is invoked from the Amazon Connect contact flow.

It generates a unique six-digit support reference number:

```text
CNX-575713
```

The function captures and stores:

- Support reference number
- Amazon Connect Contact ID
- Caller phone number
- Selected support type
- Ticket status
- Creation timestamp

An example DynamoDB ticket:

```text
referencenumber: CNX-575713
contactId: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
callernumber: +1XXXXXXXXXX
supportType: Technical
status: OPEN
createdate: 2026-08-27T19:30:00.000Z
```

After storing the ticket, Lambda returns the generated reference number to Amazon Connect.

Amazon Connect then announces the reference number to the caller before transferring the call to the selected support queue.

---

## Monitoring and Troubleshooting

Amazon CloudWatch captures Lambda execution logs and provides visibility into the serverless integration.

Logs can be used to verify:

- Amazon Connect events received by Lambda
- Generated support reference numbers
- DynamoDB write operations
- Successful Lambda executions
- Runtime errors and failed operations

Example CloudWatch output:

```text
Amazon Connect event received
Generated reference: CNX-575713
Saved support ticket: CNX-575713
```

---

## Repository Structure

```text
amazon-connect-serverless-support/
│
├── lambda/
│   └── support-reference/
│       └── index.mjs
│
├── architecture2.jpg
├── .gitignore
├── LICENSE
└── README.md
```

---

## Architecture

![Amazon Connect Serverless Support Architecture](architecture2.jpg)

---

## Skills Demonstrated

- Amazon Connect
- AWS Lambda
- Amazon DynamoDB
- Amazon CloudWatch
- AWS IAM
- Node.js / JavaScript
- AWS SDK for JavaScript
- Serverless Architecture
- IVR Development
- Contact Flow Design
- Queue-Based Call Routing
- Cloud Monitoring and Troubleshooting

---

## Future Improvements

- Provision Amazon Connect, Lambda, DynamoDB, and IAM resources using Terraform
- Add CI/CD for automated Lambda deployments
- Add CloudWatch alarms and operational monitoring
- Add ticket lifecycle management (`OPEN`, `IN PROGRESS`, `RESOLVED`)
- Add customer authentication and validation
