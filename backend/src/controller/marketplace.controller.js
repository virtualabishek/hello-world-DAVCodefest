import { Product } from "../models/product.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.utility.js";
export const addProduct = async (req, res) => {
  try {
    const { productName, price, unit, category, productLocation,  quantity, user} = req.body;
    
    if (!productName || !price || !category || !productLocation ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }
     let imageUrl = null;
    if (req.file) {
        // If avatar is uploaded, upload to Cloudinary
        const imagePath = req.file.path;
        imageUrl = await uploadoncloudinary(imagePath, { folder: 'user' });
        console.log(imageUrl)
      }
    const newProduct = new Product({
      productName,
      price,
      unit:unit?unit:null,
      category,
      productLocation,
      image:imageUrl?imageUrl.url:null,
        quantity: quantity || 1, // Default to 1 if not provided
      user:user
    });
    
      const savedProduct = await newProduct.save();
      console.log(savedProduct)
    res.status(201).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getProduct = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Extract unique categories from the products
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ].map((category) => ({ category }));

    // Send response with all products and categories
    res.status(200).json({
      success: true,
      data: {
        products,
        categories,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from request parameters
    const product = await Product.findById(id); // Fetch product by ID

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};