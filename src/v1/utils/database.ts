import mongoose from "mongoose";

export const connectMongoDB = () => {
    mongoose.connect(String(process.env.MONGO_URI)).then(res => {
        console.log('Connected to MongoDB')
    }).catch((error) => console.log('error', error));
}