import mongoose from "mongoose";
import bcrypt from "bcrypt";

const pendingUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
  },

  codeConfirm: {
    type: String,
    required: true,
  },

  codeConfirmExpires: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

pendingUserSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
});

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
export default PendingUser;
