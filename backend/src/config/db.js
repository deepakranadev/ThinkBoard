import mongoose from 'mongoose'

export const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected succesfuly");
        
        
    } catch (error) {
        console.error("Couldn't connect to Database",error);
        process.exit(1);
    }
};