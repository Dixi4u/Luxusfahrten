
import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    idclients: {
      type: Schema.Types.ObjectId,
      ref: "clients",
      require: true,
    },
    idVehicles: {
        type: Schema.Types.ObjectId,
        ref: "vehicles",
        require: true,
    },
    score: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
    },
    comment: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("reviews", reviewSchema);
