WasteXpert: Smart Waste Management System - Backend
Welcome to the backend repository for WasteXpert, a smart waste management system that facilitates waste collection scheduling, user management, and authentication functionalities.

## Features
- User Management:
- Register new users with role-based access (householder, collector, admin).
- Authenticate users with JWT tokens.
- Admin-only user management (view all users, assign roles, delete users).
- Waste Collection Scheduling:
- Householders can schedule waste collection pickups.
- Admins can assign collectors to scheduled pickups.
- Collectors can view their assigned pickups.
## Technologies Used
- Node.js: Backend JavaScript runtime.
- Express.js: Web framework for Node.js.
- MongoDB: NoSQL database for data storage.
- Mongoose: MongoDB object modeling for Node.js.
- JWT: JSON Web Tokens for authentication.
- bcryptjs: Password hashing and verification.
- Joi: Data validation for incoming requests.
- Nodemailer: Sending emails for notifications.
## Getting Started
- To run the project locally, follow these steps:

## Clone the repository:

bash
Copy code
git clone 
cd Backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

dotenv
Copy code
PORT=3000
MONGO_DATABASE=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret
SENDING_EMAIL=your_email@gmail.com
SENDING_EMAIL_PASSWORD=your_email_password
Start the server:

bash
Copy code
npm start
Testing endpoints:

Use tools like Postman to test the API endpoints:

POST /api/v1/signup: Register a new user.
POST /api/v1/login: Authenticate and login a user.
GET /api/v1/logout: Logout current user.
GET /api/v1/users: Retrieve all users (admin only).
POST /api/v1/users/assign/:id: Assign a role to a user (admin only).
DELETE /api/v1/users/:id: Delete a user (admin only).
POST /api/v1/schedule: Schedule waste collection (householder only).
POST /api/v1/collector/assign: Assign collector to schedule (admin only).
GET /api/v1/collector/assign: View assigned collections (collector only).
GET /api/v1/schedule: View scheduled collections (householder or admin).
Additional Notes
Ensure MongoDB is running (mongod command) before starting the server.
Customize email settings in Nodemailer configurations (SENDING_EMAIL, SENDING_EMAIL_PASSWORD) for sending notifications.
