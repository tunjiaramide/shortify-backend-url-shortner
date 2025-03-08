# Shorten URL Service

This project is a serverless URL shortener built using AWS Lambda, DynamoDB, and API Gateway. It allows users to submit a long URL and receive a shortened URL. When a user clicks on the shortened URL, they are automatically redirected to the original URL.

## Features
- **Shorten a URL**: Submit a URL and get a shortened version.
- **Redirect to the original URL**: Clicking the shortened URL redirects users to the original destination.
- **Serverless architecture**: Uses AWS Lambda, API Gateway (HTTP API), and DynamoDB.

## Tech Stack
- **AWS Lambda** (Node.js 20.x runtime)
- **Amazon DynamoDB** (NoSQL database)
- **AWS API Gateway** (HTTP API)
- **Serverless Framework v4**

## Deployment

### Prerequisites
Ensure you have the following installed:
- [Node.js 20.x](https://nodejs.org/en/)
- [Serverless Framework v4](https://www.serverless.com/framework/docs/getting-started)
- AWS credentials configured for deployment

### Steps to Deploy
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the provider profile in `serverless.yml`:
   ```yaml
   provider:
     profile: slsUser  # Update with your AWS profile
   ```

4. Deploy the service:
   ```bash
   sls deploy
   ```

## Configuration

The service is configured in `serverless.yml` with the following key settings:
- **Lambda functions**:
  - `setShortenUrl`: Handles URL shortening (POST `/`)
  - `getShortenUrl`: Redirects to original URL (GET `/{code}`)
- **DynamoDB Table**:
  - Table Name: `${sls:stage}-url-table`
  - Key: `id` (Shortened URL code)

## API Endpoints

| Method | Endpoint         | Description               |
|--------|-----------------|---------------------------|
| POST   | `/`             | Create a shortened URL   |
| GET    | `/{code}`       | Redirect to original URL |

## Example Usage

### Shorten a URL
```bash
curl -X POST https://your-api-url.execute-api.us-east-1.amazonaws.com/ \
     -H "Content-Type: application/json" \
     -d '{ "url": "https://example.com" }'
```

### Redirect to Original URL
```bash
curl -L https://your-api-url.execute-api.us-east-1.amazonaws.com/abc123
```

## Cleanup
To remove the service from AWS:
```bash
sls remove
```

## License
This project is licensed under the MIT License.
