import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const { user } = userAuthStore();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:7180/news/all-news");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-3xl w-full mt-5 mx-auto p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">News</h3>
        {/* Show "Add News" button only if the user is an admin */}
        {user?.role === "admin" && (
          <Link
            to={`/newspost/${user._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            + Add News
          </Link>
        )}
      </div>

      <div className="space-y-3 ">
        {newsData.map((news) => (
          <Link
            key={news._id}
            to={`/news/${news._id}`}
            className="block bg-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="flex h-24 md:h-40  ">
              <div
                className="w-1/4 bg-black bg-cover rounded-lg "
                style={{ backgroundImage: `url(${news.image})` }}
              ></div>
              <div className="w-3/4 p-2">
                <h5 className="text-sm font-semibold md:text-xl">{news.title}</h5>
                <p className="text-xs text-gray-700 md:text-sm">{news.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
