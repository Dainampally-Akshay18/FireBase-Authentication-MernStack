import express from 'express';
import { signup, googleSignIn, login, getProfile } from '../controllers/users.js';

const router = express.Router();

// Signup endpoint (Email/Password)
router.post('/signup', signup);

// Google Sign-In endpoint
router.post('/google-signin', googleSignIn);

// Login endpoint (Email/Password)
router.post('/login', login);

// Protected profile endpoint
router.get('/profile', getProfile);

export default router;