# HomeStay Backend Documentation

## Overview
HomeStay is a web application designed to provide a platform for users to find and book accommodations. This document outlines the setup and usage of the backend portion of the application.

## Technologies Used
- Node.js
- Express.js
- SQL Database (MySQL/PostgreSQL)

## Project Structure
```
backend
├── src
│   ├── app.js          # Entry point of the application
│   ├── db
│   │   └── connection.js # Database connection setup
│   ├── models
│   │   └── user.js      # User model definition
│   └── routes
│       └── index.js     # API routes
├── package.json         # NPM package configuration
└── README.md            # Project documentation
```

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd HomeStay/backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure the database connection**
   - Update the `connection.js` file with your database credentials.

4. **Run the application**
   ```
   npm start
   ```

## API Usage
- The backend exposes various API endpoints for user management and accommodation listings. Refer to the `index.js` file in the `routes` directory for detailed endpoint information.

## Contributing
Feel free to submit issues or pull requests for improvements and bug fixes. 

## License
This project is licensed under the MIT License.