import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String }, // e.g., "Kg"
  category: { type: String, required: true },
  productLocation: { type: String, required: true },
  image: { type: String, required: true }, // URL of the image
    quantity: { type: Number, default: 1 },
    location: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }


});

export const Product = mongoose.model("Product", productSchema);