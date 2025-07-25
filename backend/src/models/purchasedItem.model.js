import mongoose from "mongoose";

const purchasedItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      ref: "Item",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["khalti"],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const PurchasedItem = mongoose.model("PurchasedItem", purchasedItemSchema);