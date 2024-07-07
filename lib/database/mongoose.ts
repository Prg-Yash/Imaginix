import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL ="mongodb+srv://yashdb:g9l5NVvI7ikzk9iP@cluster0.bvo692c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginix', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}