import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDb } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5000;



// Start server
const startServer = async () => {
    // Middleware
    app.use(cors({
        origin: process.env.APP_URL,
        credentials: true,
    }));
    app.use(express.json());
    app.use(cookieParser());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/chat', chatRoutes);

    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log('====================================');
            console.log(`Server is running on port: ${PORT}`);
            console.log('====================================');
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

startServer();
