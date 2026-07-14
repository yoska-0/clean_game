import mongoose from "mongoose";
import Game from "./gamesModel.js";

const reviewsSchema = new mongoose.Schema(
  {
    nudity: {
      type: Number,
      required: [true, "Nudity is required"],
      min: [0, "Nudity must be between 0 and 10"],
      max: [10, "Nudity must be between 0 and 10"],
    },
    beliefs: {
      type: Number,
      required: [true, "Beliefs are required"],
      min: [0, "Beliefs must be between 0 and 10"],
      max: [10, "Beliefs must be between 0 and 10"],
    },
    homosexuality: {
      type: Number,
      required: [true, "homosexuality is required"],
      min: [0, "homosexuality must be between 0 and 10"],
      max: [10, "homosexuality must be between 0 and 10"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [700, "Comment must be less than 700 characters"],
    },
    game: {
      required: [true, "Game is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    user: {
      required: [true, "User is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

reviewsSchema.statics.calcAverageRatings = async function (gameId) {
  const stats = await this.aggregate([
    { $match: { game: gameId } },
    {
      $group: {
        _id: "$game",
        averageNudity: { $avg: "$nudity" },
        averageBeliefs: { $avg: "$beliefs" },
        averageHomosexuality: { $avg: "$homosexuality" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Game.findByIdAndUpdate(gameId, {
      averageNudity: stats[0].averageNudity,
      averageBeliefs: stats[0].averageBeliefs,
      averageHomosexuality: stats[0].averageHomosexuality,
    });
  } else {
    await Game.findByIdAndUpdate(gameId, {
      averageNudity: null,
      averageBeliefs: null,
      averageHomosexuality: null,
    });
  }
};

// makes changes on save
reviewsSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.game);
});

reviewsSchema.index({ game: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", reviewsSchema);
