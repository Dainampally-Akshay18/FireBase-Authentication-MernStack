import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import admin from 'firebase-admin';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_ADMIN_CREDENTIALS_PATH;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Initialize Express app
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON requests

// Test endpoint
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use('/users',usersRouter); // User routes
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});