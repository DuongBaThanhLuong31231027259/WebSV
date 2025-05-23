// This file contains the JavaScript code for the frontend application.
// It handles user interactions, makes API calls to the backend, and updates the DOM based on responses.

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Adjust the URL as needed

    // Example function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Function to display users in the DOM
    const displayUsers = (users) => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Clear existing users
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.email}`; // Adjust based on user properties
            userList.appendChild(li);
        });
    };

    // Call fetchUsers on page load
    fetchUsers();
});