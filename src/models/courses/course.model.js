import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    state: {
      type: Boolean,
      required: true,
      default: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 6,
    },

    image: {
      type: String,
      required: false,
    },
    
    content: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);



export default mongoose.model("Course", courseSchema);