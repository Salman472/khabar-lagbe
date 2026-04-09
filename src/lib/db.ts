import mongoose from "mongoose";

const mongodb_Uri=process.env.MONGO_DB_URI
console.log(mongodb_Uri);
if(!mongodb_Uri){
    throw new Error('db error');
}

let cached=global.mongoose
if(!cached){
    cached=global.mongoose={conn:null, promise:null}
}

const connectDb=async ()=>{
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise=mongoose.connect(mongodb_Uri).then((conn)=>conn.connection)
    }

    try{
        const conn = await cached.promise
        return conn
    }
    catch(error){
        console.log(error);
    }
}

export default connectDb