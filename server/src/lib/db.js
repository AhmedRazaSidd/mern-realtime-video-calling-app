import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb connected:${conn.connection.host}`);
    } catch (error) {
        console.log('Erron in connection to MongoDb', error);
        process.exit(1);
    }
}