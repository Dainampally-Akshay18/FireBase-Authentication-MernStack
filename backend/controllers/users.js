import admin from 'firebase-admin';
import User from '../models/user.js';

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; 
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

       
        const user = new User({
            firebaseUid: userRecord.uid,
            email,
            name
        });
        await user.save();

        res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const googleSignIn = async (req, res) => {
    const { idToken } = req.body;
    try {
        
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name } = decodedToken;

        
        let user = await User.findOne({ firebaseUid: uid });
        if (!user) {
            user = new User({
                firebaseUid: uid,
                email: email || `user_${uid}@mernapp.com`, 
                name: name || 'Google User'
            });
            await user.save();
        }

        res.json({ message: 'Google Sign-In successful', user: { uid, email: user.email, name: user.name } });
    } catch (error) {
        res.status(401).json({ error: 'Invalid Google token' });
    }
};

export const login = async (req, res) => {
    const { idToken } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const firebaseUid = decodedToken.uid;

        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ error: 'User not found in database' });
        }

        res.json({ message: 'Login successful', user: { uid: firebaseUid, email: user.email, name: user.name } });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const getProfile = [verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ uid: user.firebaseUid, email: user.email, name: user.name });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}];
