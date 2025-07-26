import {
  ChevronDownIcon,
  NewspaperIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

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

const NewsCard = ({ news, isExpanded, onToggleExpand }) => {
  const { t } = useTranslation();
  const TRUNCATION_LIMIT = 150;
  const needsTruncation = news.content.length > TRUNCATION_LIMIT;

  const handleReadMoreClick = (e) => {
    e.preventDefault();
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
        <h2 className="text-lg font-bold text-slate-800 group-hover:text-green-600">
          {news.title}
        </h2>
        <p
          className={`mt-2 text-sm text-slate-600 transition-all duration-300 ${
            !isExpanded && "line-clamp-2"
          }`}
        >
          {news.content}
        </p>
        {needsTruncation && (
          <button
            onClick={handleReadMoreClick}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-800"
          >
            <span>
              {isExpanded
                ? t("news.readLess", "Read Less")
                : t("news.readMore", "Read More")}
            </span>
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

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const { user } = userAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

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
    <div className="min-h-screen bg-slate-50 ">
      <div className="container mx-auto  px-4 py-8">
        <header className="mb-8 flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:p-6">
          <div className="flex items-center gap-3">
            <NewspaperIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
              {t("news.latest", "Latest News")}
            </h1>
          </div>

          {user?.role === "admin" && (
            <Link
              to="/news/create"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 sm:w-auto"
            >
              <PlusIcon className="h-5 w-5" />
              <span>{t("news.add", "Add News")}</span>
            </Link>
          )}
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : newsData.map((news) => (
                <NewsCard
                  key={news._id}
                  news={news}
                  isExpanded={!!expandedCards[news._id]}
                  onToggleExpand={() => handleToggleExpand(news._id)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default News;
