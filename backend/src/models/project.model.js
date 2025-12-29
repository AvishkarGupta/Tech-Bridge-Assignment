import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema(
  {
    title:{
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
    status: {
      type: String,
      enum: ["Active", "Completed", "Archived"],
      default: "Active"
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    assignee:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    attachment: [
      {
        url: String,
        name: String
      }
    ],
    testcases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test"
      }
    ]
  }, {timestamps: true}
)

export const Project = mongoose.model("Project", projectSchema)