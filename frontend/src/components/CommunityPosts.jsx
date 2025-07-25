import { useState } from "react";

const CommunityPosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, author: "Alice", content: "Just planted some tomatoes! 🌱" },
    {
      id: 2,
      author: "Bob",
      content: "Anyone knows how to handle pest issues?",
    },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        { id: posts.length + 1, author: "You", content: newPost },
        ...posts,
      ]);
      setNewPost("");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        📢 Community Posts
      </h2>
      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Share your farming thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          className="mt-3 w-full md:w-auto px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={handlePostSubmit}
        >
          Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 shadow rounded-lg">
            <h3 className="font-semibold text-blue-700">{post.author}</h3>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPosts;
