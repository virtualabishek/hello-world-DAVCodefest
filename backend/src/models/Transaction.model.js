import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {product_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
  },
    transaction_uuid: {
      type: String,
    },
    user_id: {
      type:mongoose.Schema.Types.ObjectId, 
      ref: "User", 
    }, paymentMethod: {
      type:String
    },
    amount: {
      type: Number,
      required: true,
      min: 0, 
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    paymentMethod: {
      type:String
    }
  },
  {
    timestamps: true, 
  }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
