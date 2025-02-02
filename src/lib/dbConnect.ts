import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};
const dbURI =
  process.env.NEXT_PUBLIC_MONGODB_API!;
export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    // console.log(dbURI)
    // if (!dbURI) {
    //     throw new Error("MONGODB_URI is not defined");
    // }
    const db = await mongoose.connect(dbURI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connection established");
    console.log("Connected to MongoDB:", mongoose.connection.db?.databaseName);
  } catch (error) {
    console.log("Error connecting to database");
    console.error(error);
    process.exit(1);
  }
}
