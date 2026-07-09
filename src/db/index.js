import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
     const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) 
       console.log(`\n mongodb is connected !! ${connectionInstance}`)
    } catch (error) {
       console.log(`Mongodb connection error ${process.env.MONGODB_URL}`,error) ;
       process.exit(1)
    }
}
export default connectDB