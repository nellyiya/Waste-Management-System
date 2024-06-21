## WasteXpert: Smart Waste Management System - Backend
   Welcome to the backend repository for WasteXpert, a smart waste management system that facilitates waste collection scheduling, user management, and authentication functionalities.

## Features
# User Management:
  - Register new users with role-based access: Users can register with roles such as householder, collector, or admin.
  - Authenticate users with JWT tokens: Secure user authentication using JSON Web Tokens.
  - Admin-only user management: Admins have privileges to view all users, assign roles, and delete users.
# Waste Collection Scheduling:
  - Householders can schedule waste collection pickups: Users with the householder role can schedule pickups for waste collection.
  - Admins can assign collectors to scheduled pickups: Admins can assign collectors to the scheduled pickups created by householders.
  - Collectors can view their assigned pickups: Users with the collector role can view pickups assigned to them.
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
To run the project locally, follow these steps:

## Clone the repository:
  git clone https://github.com/nellyiya/Waste-Management-System_Backend.git
  
  cd Backend

Install dependencies:

npm install
Start the server:

## Start the server:
 npm start
