import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],

    buyer: {
      type: mongoose.ObjectId,
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
