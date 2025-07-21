# Firebase Authentication MERN App

## Overview
This is a **MERN stack** (MongoDB, Express.js, React, Node.js) application that demonstrates user authentication using **Firebase Authentication** and **MongoDB** for storing user data. The app allows users to:

- Sign up with email, password, and name.
- Log in with email/password or Google Sign-In.
- Access a protected "Hello World" page that displays the user’s name.
- Log out securely.

The backend uses **Express.js** and **MongoDB** to manage user data, while the frontend uses **React** with **Firebase Authentication** for a seamless user experience. This project is beginner-friendly and great for learning full-stack development!

---

## Features

- **Email/Password Signup and Login**: Users can create an account and log in using email and password.
- **Google Sign-In**: Users can log in with their Google account, no manual input required.
- **Protected Route**: The "Hello World" page is only accessible to logged-in users.
- **Responsive UI**: Clean, user-friendly interface with loading states and error messages.
- **Authentication State Management**: Uses React Context to track user login state.
- **Error Handling**: Displays clear, user-friendly error messages (e.g., "Email already in use").

---

## Prerequisites

Before setting up the project, ensure you have:

- **Node.js** (v16 or higher): [Download here](https://nodejs.org/).
- **MongoDB Atlas**: A free cloud MongoDB database. [Sign up here](https://www.mongodb.com/cloud/atlas).
- **Firebase Project**: Create a project at [Firebase Console](https://console.firebase.google.com/).
- A code editor like **VS Code**.
- Basic knowledge of **JavaScript**, **React**, and terminal commands.

---

## Setup Instructions

### 1. Clone the Project

```bash
# Clone or download the project to your computer
git clone <repository-url>
cd firebase-mern-auth
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g., "MERN Auth").
3. Enable Email/Password and Google sign-in providers:
   - Go to **Build > Authentication > Sign-in method**.
   - Enable **Email/Password** and **Google**, then save.
4. Get your Firebase Client SDK config:
   - Go to **Project Settings > General > Your apps**.
   - Add a new web app, copy the `firebaseConfig` object (e.g., `apiKey`, `authDomain`).
5. Get your Firebase Admin SDK credentials:
   - Go to **Project Settings > Service accounts**.
   - Generate a new private key and download the JSON file (e.g., `firebase-adminsdk.json`).

### 3. Set Up the Backend

```bash
# Navigate to the Backend folder
cd Backend

# Install dependencies
npm install

# Create a .env file in the Backend folder
touch .env
```

Add the following to `.env`:

```env
MONGODB_URI=<your-mongodb-atlas-connection-string>
FIREBASE_ADMIN_CREDENTIALS_PATH=./firebase-adminsdk.json
```

- Replace `<your-mongodb-atlas-connection-string>` with your MongoDB Atlas URI (from **MongoDB Atlas > Connect > Drivers**).
- Place the `firebase-adminsdk.json` file in the Backend folder.

Start the backend server:

```bash
npm start
```

You should see:

```bash
Connected to MongoDB
Server running on port 5000
```

### 4. Set Up the Frontend

```bash
# Open a new terminal and navigate to the Frontend folder
cd Frontend

# Install dependencies
npm install

# Update the Firebase config in src/firebase/firebase.js
# Replace the firebaseConfig object with your Firebase Client SDK config from Step 2

# Start the frontend development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Using the App

### Signup

1. Go to [http://localhost:5173/signup](http://localhost:5173/signup).
2. Enter a name, email, and password (at least 6 characters).
3. Click **Sign Up** to create an account and be redirected to the "Hello World" page.

### Login

1. Go to [http://localhost:5173/login](http://localhost:5173/login).
2. Log in with email/password or click **Sign in with Google**.
3. On success, you’ll see "Hello, [Name]!" on the home page.

### Protected Page

- Visit [http://localhost:5173/](http://localhost:5173/) (home page).
- If not logged in, you’ll be redirected to `/login`.

### Logout

- On the home page, click **Log Out** or use the nav bar to sign out.
- You’ll be redirected to `/login`.

---

## Project Structure

```plaintext
firebase-mern-auth/
├── Backend/                    # Express.js backend
│   ├── controllers/
│   │   └── users.js            # User signup, login, Google Sign-In, profile logic
│   ├── models/
│   │   └── user.js             # MongoDB user schema
│   ├── routes/
│   │   └── users.js            # API routes (/signup, /login, /google-signin, /profile)
│   ├── .env                    # Environment variables (MongoDB URI, Firebase credentials)
│   ├── firebase-adminsdk.json  # Firebase Admin SDK credentials
│   ├── index.js                # Main server file
│   ├── package.json            # Backend dependencies
├── Frontend/                   # React frontend
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Manages user authentication state
│   │   ├── firebase/
│   │   │   └── firebase.js     # Firebase Client SDK config
│   │   ├── pages/
│   │   │   ├── Signup.jsx      # Signup form
│   │   │   ├── Login.jsx       # Login and Google Sign-In form
│   │   │   ├── Home.jsx        # Protected "Hello World" page
│   │   ├── utils/
│   │   │   └── api.js          # Axios instance for API calls
│   │   ├── App.jsx             # Main app with routes and nav
│   │   ├── main.jsx            # Entry point with AuthProvider
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
└── README.md                   # This documentation
```

---

## Key Files

### Backend

- `index.js`: Sets up the Express server and MongoDB connection.
- `controllers/users.js`: Handles signup, login, Google Sign-In, and profile fetching.
- `models/user.js`: Defines the MongoDB user schema (firebaseUid, email, name).

### Frontend

- `src/firebase/firebase.js`: Initializes Firebase Authentication.
- `src/context/AuthContext.jsx`: Manages user state and logout.
- `src/pages/*.jsx`: Contains UI for signup, login, and home pages.
- `src/utils/api.js`: Configures Axios to send Firebase ID tokens to the backend.

---

## Troubleshooting

### Backend not starting

- Check `MONGODB_URI` in `Backend/.env` is correct.
- Ensure `firebase-adminsdk.json` is in the Backend folder.
- Run `npm install` in Backend.

### Frontend errors

- Verify Firebase config in `src/firebase/firebase.js`.
- Ensure backend is running ([http://localhost:5000](http://localhost:5000)).
- Check browser console (F12) for error details.

### Authentication issues

- Ensure Email/Password and Google Sign-In are enabled in Firebase Console.
- Allow popups for `localhost:5173` for Google Sign-In.

### No user data in MongoDB

- Check backend logs for MongoDB connection errors.
- Verify API endpoints (`/users/signup`, `/users/google-signin`) are called.

---

## Next Steps

- Add a password reset feature using Firebase’s `sendPasswordResetEmail`.
- Enhance the UI with a CSS framework like **Tailwind CSS**.
- Add more protected routes or user features (e.g., profile editing).

---

Happy coding! If you need help, check the troubleshooting section or ask a mentor.