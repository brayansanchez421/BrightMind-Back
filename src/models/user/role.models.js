import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  nombre: { 
    type: String,
    minlength: 3,
    maxlength: 15,
    trim: true,
    unique: true 
  },
  permisos: [{ type: String }], 
});

export default mongoose.model("Role", roleSchema);
