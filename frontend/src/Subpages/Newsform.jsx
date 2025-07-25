import { useState } from "react";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewsPostForm() {
  const [formData, setFormData] = useState({ title: "", content: "", image: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = userAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:7180/news/add-news",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate('/');
        toast.success("News posted successfully!");
      } else {
        toast.error("Failed to post news.");
      }
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 md:2">
      <div className="flex flex-col md:flex-row gap-5 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left side - Vector image */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex flex-col justify-center items-center hidden md:flex">
          <img
            src="/vectorImg/newsCreate.png"
            alt="News Creation Illustration"
            className="w-full h-auto max-h-96 object-contain"
          />
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Share Your News</h1>
            <p className="text-gray-600 mt-3">
              Inform your audience with the latest updates and stories
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-2">
          <div className="flex items-center mb-2">
            <img
              className="h-14 w-14 rounded-full border-2 border-white shadow-md mr-4"
              src={user.avatar}
              alt="User Avatar"
            />
            <div>
              <p className="text-sm text-gray-500">Creating news as</p>
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">Create News Post</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">News Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter news headline"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">News Content</label>
              <textarea
                name="content"
                placeholder="Write your news content here..."
                value={formData.content}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-blue-300 rounded-lg bg-white hover:bg-blue-50 transition-colors">
                    <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span className="text-sm text-blue-600 font-medium">Upload Image</span>
                    <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </label>
                {preview && (
                  <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Preview" className="w-full h-64 object-contain rounded-lg shadow-sm border border-gray-200" />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : 'Publish News'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}