import mangoose, {Mongoose} from 'mongoose';


const MONGODB_URL= process.env.MONGODB_URL ;

interface MoongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached : MoongooseConnection = (global as any).mangoose;
export const connectToDatabase = async () => {
if(!cached){
    cached = (global as any).mangoose = {conn: null, promise: null};
}
if (!MONGODB_URL){
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}
cached.promise = cached.promise||mangoose.connect(MONGODB_URL, {
    dbName:'imaginix',bufferCommands: false,
});

cached.conn = await cached.promise;

return  cached.conn;
}