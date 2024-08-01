import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true, 
    required: true,
    minlength: 3,
    trim: true,
  },
  image: { 
    type: String, 
    required: false 
  }, 
  description: { 
    type: String, 
    required: false,
    minlength: 6,
    trim: true, 
  } 
});

export default mongoose.model("Category", categorySchema);
