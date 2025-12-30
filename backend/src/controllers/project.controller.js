import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const createProject = asyncHandler( async(req, res) =>{

  const {title, description, version, owner, assignee} = req.body
  
  if([title].some( ele => ele?.trim() === "")){
    throw new ApiError(400, "All fields are required.")
  }

  const projectexist = await Project.findOne({title}) 

  if(projectexist){
    throw new ApiError(409, "Project with same title already exist.")
  }

  const attachmentsLocalPath = req.files?.attachment?.[0]?.path;

  if(!attachmentsLocalPath){
    throw new ApiError(400, "Attachment is required.")
  }

  const attachmentsImage = await uploadOnCloudinary(attachmentsLocalPath)

  if(!attachmentsImage){
    throw new ApiError(500, "Something went wrong while uploading attachment on cloudinary.")
  }

  console.log(attachmentsImage)

  const getOwner = await User.findOne({userName: owner.trim()})
  
  if(!getOwner){
    throw new ApiError(409, "Owner name doesn't exist in database.")
  }

  const getAssignee = await User.findOne({userName: assignee.trim()})

  if(!getAssignee){
    throw new ApiError(409, "Assignee name doesn't exist in database.")
  }

  const project = await Project.create({
    title,
    description, 
    version, 
    owner: getOwner._id, 
    assignee: getAssignee._id,
    attachment: [{url: attachmentsImage?.url || "", name: attachmentsImage?.original_filename}]
  })

  const createdProject = await Project.findById(project._id);

  if(!createdProject){
    throw new ApiError(500, "Something went wrong while creating project into database.")
  }

  res
  .status(201)
  .json(new ApiResponse(201, "Project created successfully"))
} )

const getAllProject = asyncHandler( async(req, res) =>{
  console.log("request received to fetch all projects data")

  const projects = await Project.find()
  // .sort({ createdAt: -1 }).limit(2)
  // console.log(projects);

  res
  .status(200)
  .json(new ApiResponse(200, projects, "All projects"))

} )

const getProject = asyncHandler( async(req, res) =>{
  
   const { id } = req.params;
  console.log("request received to fetch projects data", id)


  const project = await Project.findById(id)
  // .sort({ createdAt: -1 }).limit(2)
  // console.log(projects);

  if(!project){
    throw new ApiError(404, `Project with id: ${id} is not found`)
  }

  res
  .status(200)
  .json(new ApiResponse(200, project,"All projects"))

} )

export {createProject, getAllProject, getProject}