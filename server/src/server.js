import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import { connectDb } from './lib/db.js';

const app = express();

const PORT = process.env.PORT || 5000

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);


app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server is running on this port:${PORT}`);
    console.log('====================================');
    connectDb();
})