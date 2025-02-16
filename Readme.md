# Jobs API

## Overview

The **Jobs API** is a RESTful service that enables management of job postings and applications. It offers endpoints for creating, retrieving, updating, and deleting job listings, as well as handling candidate applications.

## Features

- **Job Listings**: Manage job postings with full CRUD (Create, Read, Update, Delete) operations.
- **Application Handling**: Submit and track applications for various job postings.
- **User Authentication**: Secure API endpoints using JSON Web Tokens (JWT).

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RofixWork/jobs-api.git
   cd jobs-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the root directory with the following content:

   ```env
   LOCAL_PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE_DATE=7d
   ```

4. **Start the server**:

   ```bash
   [npm run dev] or [npm start]
   ```

   The API will be running at `http://localhost:8000`.

## API Endpoints

### Authentication

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Authenticate a user and obtain a token.

### Jobs

- `GET /api/v1/jobs`: Retrieve all job postings.
- `POST /api/v1/jobs`: Create a new job posting.
- `GET /api/v1/jobs/:id`: Get details of a specific job.
- `PUT /api/v1/jobs/:id`: Update an existing job posting.
- `DELETE /api/v1/jobs/:id`: Remove a job posting.


## Deployment

The API is deployed on Vercel and accessible at: [https://jobs-api-ruby.vercel.app](https://jobs-api-ruby.vercel.app)


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or support, please contact [mailto:woutkout123@gmail.com](mailto:woutkout123@gmail.com).