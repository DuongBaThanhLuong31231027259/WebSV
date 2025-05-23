# HomeStay Project

HomeStay is a web application designed to provide a platform for users to find and book accommodations. This project is structured into two main parts: the backend and the frontend.

## Project Structure

```
HomeStay
├── backend
│   ├── src
│   │   ├── app.js          # Entry point for the backend application
│   │   ├── db
│   │   │   └── connection.js # Database connection setup
│   │   ├── models
│   │   │   └── user.js      # User model definition
│   │   └── routes
│   │       └── index.js     # API routes definition
│   ├── package.json         # Backend dependencies and scripts
│   └── README.md            # Documentation for the backend
├── frontend
│   ├── index.html           # Main HTML file for the frontend
│   ├── css
│   │   └── style.css        # Styles for the frontend application
│   └── js
│       └── main.js          # JavaScript for frontend interactions
└── README.md                # Documentation for the entire project
```

## Backend

The backend is built using Node.js and Express. It handles API requests, connects to a SQL database, and manages user data.

### Setup Instructions

1. Navigate to the `backend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the server with:
   ```
   npm start
   ```

### API Usage

The backend exposes several API endpoints for user management and accommodation listings. Refer to the `backend/README.md` for detailed API documentation.

## Frontend

The frontend is built using plain HTML, CSS, and JavaScript. It provides a user-friendly interface for interacting with the HomeStay platform.

### Setup Instructions

1. Open `frontend/index.html` in a web browser to view the application.
2. Modify `css/style.css` and `js/main.js` as needed to customize the appearance and functionality.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.