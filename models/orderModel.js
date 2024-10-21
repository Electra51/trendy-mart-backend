import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirm", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
