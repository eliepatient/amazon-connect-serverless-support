# Amazon Connect Serverless Support

A serverless contact center support solution built with Amazon Connect, AWS Lambda, Amazon DynamoDB, and Amazon CloudWatch.

## Project Overview

This project demonstrates how AWS serverless services can be integrated to build an automated customer support workflow.

Customers call an Amazon Connect contact center and interact with an IVR. Based on the customer's selection and information, the contact flow invokes AWS Lambda functions to retrieve customer information, determine the appropriate support queue, generate a unique support reference number, and store call information in DynamoDB.

CloudWatch is used for Lambda logging and troubleshooting.

## Architecture

Customer Call
↓
Amazon Connect
↓
Contact Flow / IVR
↓
AWS Lambda
↓
Amazon DynamoDB
↓
Amazon CloudWatch

## Features

- Amazon Connect contact center configuration
- IVR-based customer interaction
- Technical Support and General Support routing
- AWS Lambda integration with Amazon Connect
- Customer lookup from DynamoDB
- Dynamic queue selection based on support type
- Unique support reference generation (CNX-XXXXXX)
- Caller phone number capture
- Call date/time logging
- DynamoDB call record storage
- CloudWatch logging and troubleshooting
- IAM permissions for Lambda access to DynamoDB

## AWS Services Used

| Service | Purpose |
|---|---|
| Amazon Connect | Contact center, IVR, and call routing |
| AWS Lambda | Serverless backend processing |
| Amazon DynamoDB | Customer and support call data storage |
| Amazon CloudWatch | Lambda logs and troubleshooting |
| AWS IAM | Permissions and access control |

## Lambda Functions

### Customer Lookup

The customer lookup Lambda retrieves customer information from the `ConnexCustomers` DynamoDB table.

It can return information such as:

- Customer name
- Support type
- Appropriate support queue

Example routing:

`Technical support → Technical Support queue`

`General support → General Support queue`

### Support Reference

The support reference Lambda generates a six-digit reference number for a support interaction.

Example:

`CNX-575713`

The function also records:

- Reference number
- Caller phone number
- Creation timestamp

The information is stored in the `connexsupportcall` DynamoDB table.

Example record:

```text
referencenumber: CNX-575713
callernumber: +15144624992
createdate: 2026-08-26T21:18:39.307Z

## Architecture

Amazon Connect Serverless Support Architecture(architecture.jpeg.jpg)
