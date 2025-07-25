import { News } from "../models/news.model.js";
import User from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.utility.js";
export const addNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // Assuming user is added to req by auth middleware
  let image = null;
    if (req.file) {
        // If avatar is uploaded, upload to Cloudinary
        const imagePath = req.file.path;
        image = await uploadoncloudinary(imagePath, { folder: 'user' });
        console.log(image)
      }
    // Check if user is admin
    const user = await User.findById(userId);

    // Create and save news
    const news = new News({ title, content, image:image.url });
    await news.save();

    res.status(201).json({ message: "News added successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getNews = async (req, res) => {
  try {
const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};