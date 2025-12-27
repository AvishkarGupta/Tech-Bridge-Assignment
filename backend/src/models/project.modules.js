import mongoose, {Schema, mode} from "mongoose";
import { User } from "./user.modules.js";

const projectSchema = new Schema(
  {
    projectName:{
      type: String,
      required: true,
      trim: true,
    },
    description:{
      type: String
    },
    version:{
      type: String
    },
    Status:{
      type: String,
      
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    assignee:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    attachments:{
      type: String,
    },
  }, {timestamps: true}
)

export const Project = mongoose.model("Project", projectSchema)