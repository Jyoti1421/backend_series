import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username :{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
         email :{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
       
        },
          fullname :{
            type : String,
            required : true,
            unique : true,
            trim : true,
             index : true
       
        },
        avatar : {
            type : String,
            required : true,
           

        },
          coverImage : {
            type : String,
          
           

        },
        
watchHistory : [
    {
type :Schema.Types.ObjectId,
ref : "Video"
    }
],
password :{
    type : String,
    required :[true,'Password is required']
},
refreshToken :{
    type : String
}
},{
    timestamps : true
}   
)
userSchema.pre("save",function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
   return  await bcrypt.compare(password,this.password)

}
userSchema.methods.isGenerateAccessToken = async function(password){
   return  jwt.sign(
    {
        _id : this.id,
        email : this.email,
        username : this.username,
        fullname : this.fullname,
        password : this.password
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn :process.env.ACCESS_TOKEN_EXPIRY
    }
   )

}
serSchema.methods.isGenerateRefreshToken = async function(password){
   return  jwt.sign(
    {
        _id : this.id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn :process.env.REFRESH_TOKEN_EXPIRY
    }
   )

}
export const User =mongoose.model("User",userSchema)