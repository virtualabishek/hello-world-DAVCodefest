import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { userAuthStore } from "../../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Postform() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const { user } = userAuthStore();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.post(
        `http://localhost:7180/community/post/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Posted successfully");
      } else if (response.status >= 400) {
        toast.error("Post unsuccessful");
      }

      setTitle("");
      setPhoto(null);
      setPhotoPreview(null);
      navigate('/community');
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left side - Vector image */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex flex-col justify-center items-center">
          <img
            src="/vectorImg/communityPost.png"
            alt="Community Post Illustration"
            className="w-full h-auto max-h-96 object-contain"
          />
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Connect With Your Community</h1>
            <p className="text-gray-600 mt-3">
              Share your thoughts, ideas, and moments with your community
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-8">
          <div className="flex items-center mb-8">
            <img
              className="h-14 w-14 rounded-full border-2 border-white shadow-md mr-4"
              src={user.avatar}
              alt="User Avatar"
            />
            <div>
              <p className="text-sm text-gray-500">Creating post as</p>
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                name="title"
                maxLength="100"
                rows="3"
                placeholder="What's on your mind?"
                value={title}
                onChange={handleTitleChange}
                required
              />
              <div className="flex justify-between mt-1">
                <small className="text-gray-500">Max 100 characters</small>
                <small className={`font-medium ${title.length >= 90 ? 'text-red-500' : 'text-gray-500'}`}>
                  {100 - title.length} remaining
                </small>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Photo</label>
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
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>
                </label>
                {photoPreview && (
                  <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link
                to="/community"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </span>
                ) : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}