import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const generateAccessAndRefreshToken =  async (userId)=>{
  try {
    const user = await User.findById(userId)
    const refreshToken = await user.generateRefreshToken()
    const accessToken = await user.generateAccessToken()
    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went worng while generating tokens", error)
  }
}

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

const loginUser = asyncHandler( async(req, res) =>{

  const {email, password} = req.body
  
  if([email, password].some( ele => ele?.trim() === "")){
    throw new ApiError(409, "Email and password is required");
  }

  const user = await User.findOne({email})

  if (!user){
    throw new ApiError(401, "Invalid user credentials")
  }

  const isVaidPassword = await user.isPasswordCorrect(password)

  if(!isVaidPassword){
    throw new ApiError(401, "Invalid user credentials")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password")

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json (new ApiResponse(200, loggedInUser, "User logged in successfully"))
})

const logoutUser = asyncHandler( async(req, res)=>{
  await User.findByIdAndUpdate(req.user._id, {$set:{refreshToken: undefined}}, {new: true})

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User Logged Out"))
} )

export {registerUser, loginUser, logoutUser};