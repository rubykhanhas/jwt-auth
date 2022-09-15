import mongoose from "mongoose";

export async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    await console.log(`MongoDB connected database[${db.connection.db.databaseName}]`);
  } catch (error) {
    console.error(`MongoDB connection failed:\n${error.message}`);
  }
}
