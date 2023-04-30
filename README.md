# Covid19-Tracker-Back
This is the backend code for a COVID-19 tracker application, built with Node.js, Express, and MongoDB. The backend allows users to add and search COVID-19 cases by country and region.

# Getting Started

To run the backend, you will need Node.js and MongoDB installed on your system. Once you have these installed, follow these steps:

1 Clone the repository: git clone https://github.com/your-username/covid-tracker-backend.git

2 Install dependencies: npm install

3 Replace  username, password, cluster, database, and your-jwt-secret with your MongoDB Atlas credentials and a secret key for JWT token generation.

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

JWT_SECRET= your-jwt-secret

4 Start the server: npm start

The server should now be running on http://localhost:3000.

# Security

The backend uses JWT tokens for authentication and authorization. The jsonwebtoken package is used to generate and verify JWT tokens.

The MongoDB database is hosted on MongoDB Atlas, which provides built-in security features such as SSL encryption and IP whitelisting.

# Front End 

https://github.com/takijemai/Covid19-Tracker-Front.git

# Authors

@Takieddine Jemai


