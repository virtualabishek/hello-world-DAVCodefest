import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:7180/news/getsingle-news/${id}`);
        setNews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Function to split content into paragraphs every 50 words
  const splitIntoParagraphs = (text, wordsPerParagraph = 50) => {
    if (!text) return [];

    const words = text.split(" "); // Split text into words
    const paragraphs = [];

    for (let i = 0; i < words.length; i += wordsPerParagraph) {
      paragraphs.push(words.slice(i, i + wordsPerParagraph).join(" "));
    }

    return paragraphs;
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      {news.image && <img src={news.image} alt={news.title} className="w-full h-64 object-cover rounded-lg" />}
      <h2 className="text-2xl font-bold mt-4">{news.title}</h2>

 

      <p className="text-gray-500 mt-2 text-sm">Published on: {new Date(news.createdAt).toLocaleDateString()}</p>
           {/* Render content with paragraphs */}
      <div className="text-gray-700 mt-2 space-y-4">
        {splitIntoParagraphs(news.content).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default SingleNews;
