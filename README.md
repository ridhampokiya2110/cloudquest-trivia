PROJECT NAME: CloudQuest Trivia
TYPE: Serverless Web Application (AWS)

DESCRIPTION:
CloudQuest Trivia is a browser-based quiz game designed to test knowledge of Amazon Web Services (AWS). It is built using a fully serverless architecture, meaning it requires no server management and runs entirely within the AWS Free Tier.

The application connects a static frontend hosted on S3 to a backend logic layer using AWS Lambda and API Gateway. Quiz questions are dynamically fetched from a NoSQL database (DynamoDB), ensuring real-time data retrieval.

KEY FEATURES:
- Interactive User Interface: Simple, responsive design for playing the game.
- Real-time Data: Questions are not hardcoded; they are pulled from a database.
- Automated Deployment: Uses GitHub Actions (CI/CD) to automatically update the website when code is pushed.
- Cost-Free: Optimized to run 100% on the AWS Free Tier.

TECHNOLOGY STACK:
1. Frontend: HTML, CSS, JavaScript (Hosted on AWS S3)
2. API Layer: AWS API Gateway (HTTP API)
3. Backend Logic: AWS Lambda (Python 3.12)
4. Database: Amazon DynamoDB
5. DevOps: GitHub Actions for CI/CD pipeline

LIVE DEMO:
htpps://d3s7gaidpnlw9m.cloudfront.net/
