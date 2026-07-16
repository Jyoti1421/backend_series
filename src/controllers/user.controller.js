
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/api_error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/api_response.js";





const registerUser = asyncHandler( async(req,res)=>{
//   get User detail from fronted
// validation not empty
// check if user already exist :username,email
// check for images,check for avatar
// upload them to cloudinary avatar
// create user object -create entry in db
// remove password and refresh token field from response
// check for user creation 
// return response
const {fullname,username,email,password} = req.body
if([fullname,username,email,password].some((field)=>field.trim()==="")){
    throw new ApiError(400,"All fields are required")
}
const exitedUser = User.findOne({
    $or :[{username},{email}]
})
if(exitedUser){
    throw new ApiError(49 ,"User with email or username already exist")
}
const avatarLocalPath =req.files.avatar[0]?.path;
const coverImageLocalPath =req.files.coverImage[0]?.path
if(avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage =await uploadOnCloudinary(coverImageLocalPath)
if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}
const user = await User.create({
    fullName,
    avatar :avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()

})
const createdUser = await User.findById(user._id).select("-password -refreshToken")
if(!createdUser){
    throw new ApiError(500,"something went wrong while registering  the user")
}
return res.status(201).json(new ApiResponse(200,createdUser,"User register Successfully"))
})
export {registerUser}