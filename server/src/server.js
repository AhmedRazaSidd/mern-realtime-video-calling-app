import express from 'express';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import { connectDb } from './lib/db.js';

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server is running on this port:${PORT}`);
    console.log('====================================');
    connectDb();
})