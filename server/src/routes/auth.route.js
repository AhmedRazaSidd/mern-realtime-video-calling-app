import express from 'express';
import { login, logout, onboard, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);   
router.get('/logout', logout);

router.post('/onboarding', protectRoute, onboard);

// check if user logged in
router.get('/me', protectRoute, (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        console.log('Error in checkAuth controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;