import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    averageNudity: {
      type: Number,
      max: [100, "Nudity must be between 0 and 100"],
      min: [0, "Nudity must be between 0 and 100"],
      default: null,
    },
    averageBeliefs: {
      type: Number,
      max: [100, "Polytheistic beliefs must be between 0 and 100"],
      min: [0, "Polytheistic beliefs must be between 0 and 100"],
      default: null,
    },
    averageHomosexuality: {
      type: Number,
      max: [100, "Homosexuality must be between 0 and 100"],
      min: [0, "Homosexuality must be between 0 and 100"],
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Game", gamesSchema);
