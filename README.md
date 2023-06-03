# ApiAuthentication

#  Authentication

In the Holiday-Fun Application, the authentication system is designed to provide a seamless experience for users to register, login, and logout. The system is built using Express, Node.js, and leverages JWT (JSON Web Tokens) for managing authentication state. The application also uses the bcrypt library for securely hashing and verifying user passwords.

# File Structure & System Design:
1. server.js - Main server file, containing endpoint definitions and configurations.
2. /routes - Directory containing route handlers for authentication.
- auth.js - Contains route handlers for register, login, and logout endpoints.
3. /controllers - Directory containing controller functions for authentication.
- authController.js - Contains controller functions for handling user registration, login, and logout logic.
4. /middlewares - Directory containing middleware functions.
- authMiddleware.js - Contains middleware functions for JWT verification and
authentication.

5. /models - Directory containing data models.
- userModel.js - Contains user schema and model definition for MongoDB.
  
# Register Functionality:
The registration process begins with the user inputting their desired username and password on the register page. The application enforces password length requirements, with a minimum of 10 characters, ensuring a level of password complexity. Upon form submission, the data is sent to the server's "/register" endpoint. The server then hashes the password using bcrypt and stores the new user's information, including the hashed password, in the database. Once the user is successfully registered, a JWT is created, which includes the user's ID, username, and role. The token is then sent to the client as an HTTP-only cookie to maintain the user's authentication state.

- Login Functionality:

When a user logs in, they provide their username and password on the login page. The data is then sent to the server's "/login" endpoint. The server checks if the provided username exists in the database. If it does, the server compares the provided password with the hashed password stored in the database using bcrypt. If the password matches, a JWT is created, similar to the registration process, and sent to the client as an HTTP-only cookie.

- Logout Functionality:

To log out, the user clicks on the "Logout" link. This action sends a request to the server's "/logout" endpoint. The server then clears the "jwt" cookie by setting its value to an empty string and its max age to 1 millisecond, effectively logging the user out. The user is then redirected to the home page.

- Interaction and Validation:

The register, login, and logout functions interact with each other to maintain a secure and seamless user authentication experience. The client-side code checks if the user is logged in by calling the "/isLoggedIn" endpoint, which verifies the JWT stored in the client's cookie. If the user is logged in, the application displays the user's username and a "Logout" link. Otherwise, the "Login or Register" link is shown. Additionally, the system enforces username and password validations during registration and login, such as checking for missing input and ensuring the password meets the minimum length requirement.
