import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import {
  NewspaperIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

// --- Skeleton for a single news card ---
const CardSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-xl bg-white shadow-md">
    <div className="aspect-[16/10] w-full bg-slate-200"></div>
    <div className="p-4">
      <div className="h-6 w-3/4 rounded-md bg-slate-200"></div>
      <div className="mt-3 h-4 w-full rounded-md bg-slate-200"></div>
      <div className="mt-2 h-4 w-5/6 rounded-md bg-slate-200"></div>
    </div>
  </div>
);

// --- Individual News Card Component ---
const NewsCard = ({ news, isExpanded, onToggleExpand }) => {
  const TRUNCATION_LIMIT = 150; // Show "Read More" if content is longer than this
  const needsTruncation = news.content.length > TRUNCATION_LIMIT;

  const handleReadMoreClick = (e) => {
    e.preventDefault(); // Stop the Link navigation
    onToggleExpand();
  };

  return (
    <Link
      to={`/news/${news._id}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <img
          src={news.image}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-slate-800 group-hover:text-green-700">
          {news.title}
        </h2>
        <p
          className={`mt-2 text-sm text-slate-600 transition-all duration-300 ${
            !isExpanded && needsTruncation ? "line-clamp-2" : ""
          }`}
        >
          {news.content}
        </p>
        {needsTruncation && (
          <button
            onClick={handleReadMoreClick}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-800"
          >
            <span>{isExpanded ? "Read Less" : "Read More"}</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </Link>
  );
};

// --- Main News Component ---
const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const { user } = userAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:7180/news/all-news");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleToggleExpand = (newsId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
          <div className="flex items-center w-full justify-between gap-3">
        

            <div className="flex flex-row">
            <NewspaperIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-slate-800">Latest News</h1>
            </div>

          </div>
      <div className="container mx-auto max-w-5xl px-4">
        <header className="flex items-center justify-between">
          {user?.role === "admin" && (
            <Link
            to="/news/create"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add News</span>
            </Link>
          )}
        </header>

          
        
        

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            newsData.map((news) => (
              <NewsCard
                key={news._id}
                news={news}
                isExpanded={!!expandedCards[news._id]}
                onToggleExpand={() => handleToggleExpand(news._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;