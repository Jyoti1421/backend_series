import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js";

 const app = express()
dotenv.config({path :`./.env` })
 connectDB().then(
   ()=>{
      app.listen(process.env.PORT || 8000,()=>{
         console.log(`server is running on this port ${process.env.PORT}`)
      })

   }
 ).catch((err)=>{
   console.log("mongo db conection failed !!" ,err);
 })

/*(async()=>{

 try {
     await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
     app.on("Error",(error)=>{
console.log("Error",error)
     throw error
     })
     app.listen(process.env.PORT ,()=>{
        console.log("app listening")
   
     })
 } catch (error) { 
    console.error("Error",error)
    throw error
    
 }
})()*/