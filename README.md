# Natours

## Overview
Natours is a full-stack web application for browsing and booking tours. It allows users to explore available tours, view detailed information, manage bookings, and update their profiles. The system also provides administrative capabilities for managing tours, users, and bookings.
The project is built with a focus on scalability, clean architecture, and secure RESTful API design.

## Features
- User authentication and authorization using JWT
- Browse, filter, and view tour details
- Book tours and manage bookings
- User profile management
- Reviews and ratings system
- Admin panel for managing tours, users, and bookings

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- Pug templating engine
- HTML, CSS, JavaScript
- JWT authentication

## Project Structure
- models: Database schemas and models
- controllers: Application logic
- routes: API route definitions
- views: Pug templates for server-rendered pages
- utils: Helper functions and utilities
- public: Static assets

## API Documentation
The API documentation is available at the following link:
[View Postman API Documentation](https://documenter.getpostman.com/view/37706685/2sBXinHAsh)
It includes all available endpoints such as authentication, tours, bookings, and users, along with request and response examples.

## Installation
1. Clone the repository:
   
`git clone https://github.com/bavlysafwatt/natours.git`

2. Install dependencies:
   
`npm install`

3. Create a `.env` file and configure the following variables:

NODE_ENV=development

PORT=3000

DATABASE=`<your-database-url>`

JWT_SECRET=`<your-secret>`

JWT_EXPIRES_IN=90d

4. Run the application:
   
`npm start`

## Notes
- Ensure MongoDB is running before starting the application.
- This project is intended for learning and portfolio purposes.
