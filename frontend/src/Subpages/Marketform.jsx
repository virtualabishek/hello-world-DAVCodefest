import { useState } from "react";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const { user } = userAuthStore();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    unit: "",
    category: "crop", // Default category
    productLocation: "",
    quantity: 1,
    image: null,
    user: user ? user._id : null,
  });

  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ["crop", "fruit", "seed", "fertilizer", "tools", "machineries"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const formDataToSend = new FormData();

//     // Append form fields
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     // Ensure userId is included
//     if (user && user._id) {
//       formDataToSend.append("userId", user._id);
//     }

//     const response = await axios.post(
//       "http://localhost:7180/community/addproduct",
//       formDataToSend,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );

//     toast.success("Product added successfully!"); // ✅ Correct Toaster usage

//     setMessage(response.data.message);
//     setFormData({
//       productName: "",
//       price: "",
//       unit: "",
//       category: "crop",
//       productLocation: "",
//       quantity: 1,
//       image: null,
//       user: user ? user._id : null,
//     });
//     setImagePreview(null);
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Error adding product"); // ✅ Handle errors properly
//   }
    // };
    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();

    // Append form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Ensure userId is included
    if (user && user._id) {
      formDataToSend.append("userId", user._id);
    }

    const response = await axios.post(
      "http://localhost:7180/community/addproduct",
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    toast.success("Product added successfully!"); // ✅ Correct Toaster usage

    setMessage(response.data.message);
    setFormData({
      productName: "",
      price: "",
      unit: "",
      category: "crop",
      productLocation: "",
      quantity: 1,
      image: null,
      user: user ? user._id : null,
    });
    setImagePreview(null);
  } catch (error) {
    toast.error(error.response?.data?.message || "Error adding product"); // ✅ Handle errors properly
  }
};
  return (
    // <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
    //   <h2 className="text-xl font-bold mb-4">Add Product</h2>

    //   {/* Image Upload */}
    //   <input
    //     type="file"
    //     name="image"
    //     accept="image/*"
    //     onChange={handleFileChange}
    //     className="w-full p-2 border rounded mb-2"
    //   />

    //   {/* Image Preview */}
    //   {imagePreview && (
    //     <div className="mb-2">
    //       <p className="text-gray-600">Image Preview:</p>
    //       <img
    //         src={imagePreview}
    //         alt="Preview"
    //         className="w-full h-40 object-cover rounded-lg shadow-md"
    //       />
    //     </div>
    //   )}

    //   {/* {message && <p className="text-red-500">{message}</p>} */}

    //   <form onSubmit={handleSubmit} encType="multipart/form-data">
    //     <input
    //       type="text"
    //       name="productName"
    //       value={formData.productName}
    //       onChange={handleChange}
    //       placeholder="Product Name"
    //       className="w-full p-2 border rounded mb-2"
    //       required
    //     />
    //     <input
    //       type="number"
    //       name="price"
    //       value={formData.price}
    //       onChange={handleChange}
    //       placeholder="Price"
    //       className="w-full p-2 border rounded mb-2"
    //       required
    //     />
    //     <select
    //       name="unit"
    //       value={formData.unit}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded mb-2"
          
    //     >
    //       <option value="">Select Unit</option>
    //       <option value="Kg">Kg</option>
    //       <option value="Litre">Litre</option>
    //     </select>

    //     {/* Category Dropdown */}
    //     <span>Category</span>
    //     <select
    //       name="category"
    //       value={formData.category}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded mb-2"
    //       required
    //     >
    //       {categories.map((cat) => (
    //         <option key={cat} value={cat}>
    //           {cat.charAt(0).toUpperCase() + cat.slice(1)}
    //         </option>
    //       ))}
    //     </select>

    //     {/* Location Input Field */}
    //     <input
    //       type="text"
    //       name="productLocation"
    //       value={formData.productLocation}
    //       onChange={handleChange}
    //       placeholder="Product Location"
    //       className="w-full p-2 border rounded mb-2"
    //       required
    //     />
        
    //     <span>Quantity</span>
    //     <input
    //       type="number"
    //       name="quantity"
    //       value={formData.quantity}
    //       onChange={handleChange}
    //       placeholder="Quantity"
    //       className="w-full p-2 border rounded mb-2"
    //     />

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
    //     >
    //       Add Product
    //     </button>
    //   </form>
    // </div>
    <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white shadow-xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Vector image */}
        <div className="md:w-1/2 flex flex-col justify-center hidden md:flex">
          <img
            src="/vectorImg/addproduct.png"
            alt="Add Product Illustration"
            className="w-full h-auto object-contain"
          />
          <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center md:text-left">
            Expand Your Inventory
          </h1>
          <p className="text-gray-600 mt-2 text-center md:text-left">
            Add your product details and reach more customers
          </p>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              {/* Image Upload with Preview */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-blue-300 rounded-lg bg-white hover:bg-blue-50 transition-colors">
                      <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <span className="text-sm text-blue-600 font-medium">Click to upload</span>
                      <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </label>
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g. Organic Apples"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Select Unit</option>
                      <option value="Kg">Kg</option>
                      <option value="Litre">Litre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="productLocation"
                    value={formData.productLocation}
                    onChange={handleChange}
                    placeholder="Where is this product available?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="How many units are available?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default AddProductForm;
