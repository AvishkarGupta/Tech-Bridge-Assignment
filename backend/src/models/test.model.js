import mongoose, {Schema} from "mongoose";

const testSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    priority: {
      type: String,
      default: "Low"
    },
    type: {
      type: String,
      default: "Blog"
    },
    testSteps: {
      type: String,
      default: "Test Steps with expected results"
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
  }, {timestamps:true}
)

export const Test = mongoose.model("Test", testSchema)