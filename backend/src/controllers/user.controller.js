import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.modules.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler( async(req, res) =>{
  
  const {userName, email, role, password, avatar} = req.body
  
  console.log(userName, email, role, password, avatar)
  if([userName, email, role, password].some( ele => ele?.trim() === "")){
    throw new ApiError(400, "All fields are required.")
  }

  const isUserExist = await User.findOne({email}) 

  if(isUserExist){
    throw new ApiError(409, "User with email id already exist.")
  }

  const avatarLocalPath = req?.files.avatar[0]?.path

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required.")
  }

  const avatarImage = await uploadOnCloudinary(avatarLocalPath)
  console.log(avatarImage)
  if(!avatarImage){
    throw new ApiError(500, "Something went wrong while uploading avatar on cloudinary.")
  }

  const user = await User.create({
    userName,
    email,
    role,
    avatar: avatarImage?.url || "",
    password
  })

  const createdUser = await User.findById(user._id).select("-password -refershToken");

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while creating user id into database.")
  }

  return res
  .status(201)
  .json(new ApiResponse(200, createdUser, "User resgistered successfully"))
} )


export {registerUser};