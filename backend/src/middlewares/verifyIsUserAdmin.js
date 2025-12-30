import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"


export const verifyIsUserAdmin =  asyncHandler( async (req, res, next)=>{
  try {

    const {user} = req
    console.log(user.role)
    if (!(user.role === "admin")){
      throw new ApiError(401, "Only admin have access to create project.")
    }
    console.log(user.role)
      
    next()

  } catch (error) {
    throw new ApiError(401, error?.message || "role")
  }
})

