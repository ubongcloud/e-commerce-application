# E-commerce Application Deployment on Amazon ECS

This repository demonstrates how to deploy a simple front-end e-commerce application using Docker containers on Amazon ECS (Elastic Container Service).

## Overview

This guide shows you how to build a Docker image for a web application and deploy it to Amazon ECS using the AWS Management Console.

## Prerequisites

- AWS account
- Docker installed
- AWS CLI installed and configured
- Basic understanding of Docker and ECS

## Steps to Deploy

### 1. Create Docker Image

1. **Prepare Your Application**
   - Ensure your web application files are in the same directory as your Dockerfile. For example, you should have `index.html` and the `Dockerfile` in the same directory.

2. **Create a Dockerfile**
   - Create a `Dockerfile` with the following content:
     ```Dockerfile
     # Use an official Nginx image
     FROM nginx:alpine

     # Copy the HTML file to the Nginx web root
     COPY . /usr/share/nginx/html/

     # Expose port 80
     EXPOSE 80

     # Start Nginx
     CMD ["nginx", "-g", "daemon off;"]
     ```

3. **Build the Docker Image**
   - Open a terminal, navigate to the directory with your Dockerfile, and run:
     ```bash
     docker build -t my-web-app .
     ```

4. **Test the Docker Image Locally**
   - Run the Docker container locally to ensure it works:
     ```bash
     docker run -p 8080:80 my-web-app
     ```
   - Open `http://localhost:8080` in your browser to verify that the application is running correctly.

### 2. Push Docker Image to Amazon ECR

1. **Create an ECR Repository**
   - Go to the **Amazon ECR** service in the AWS Management Console.
   - Click **Create repository** and name it (e.g., `my-web-app-repo`).
   - Click **Create repository**.

2. **Authenticate Docker to ECR**
   - Run the following command to authenticate Docker to your ECR registry:
     ```bash
     aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<your-region>.amazonaws.com
     ```

3. **Tag and Push the Docker Image**
   - Tag the Docker image with the ECR repository URI:
     ```bash
     docker tag my-web-app:latest <account-id>.dkr.ecr.<your-region>.amazonaws.com/my-web-app-repo:latest
     ```
   - Push the image to ECR:
     ```bash
     docker push <account-id>.dkr.ecr.<your-region>.amazonaws.com/my-web-app-repo:latest
     ```

### 3. Deploy to Amazon ECS Using the Console

1. **Create an ECS Cluster**
   - Go to the **Amazon ECS** service in the AWS Management Console.
   - Click **Clusters** and then **Create Cluster**.
   - Choose **EC2 Linux + Networking** and configure your cluster settings.
   - Click **Create**.

2. **Create a Task Definition**
   - Go to **Task Definitions** and click **Create new Task Definition**.
   - Choose **Fargate** and configure the task with:
     - Container name (e.g., `web-app-container`)
     - ECR image URL (e.g., `<account-id>.dkr.ecr.<your-region>.amazonaws.com/my-web-app-repo:latest`)
     - Port Mapping (e.g., port 80)
   - Click **Create**.

3. **Create a Service**
   - In your cluster, go to the **Services** tab and click **Create**.
   - Choose **Fargate**, select your task definition, and configure the service settings.
   - Click **Create Service**.

4. **Access Your Application**
   - Find the load balancer's DNS name in the **EC2** service under **Load Balancers**.
   - Open the DNS name in your browser to view your web application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Amazon ECS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/what-is-amazon-ecs.html)
- [Docker Documentation](https://docs.docker.com/)
- [Amazon ECR Documentation](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
