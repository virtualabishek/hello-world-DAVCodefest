import {
  ChevronDownIcon,
  NewspaperIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

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
      <div className="aspect-[16/10] w-full overflow-hidden">
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
            className="mt-2 inline-flex items-center gap-1 text-lg font-semibold text-green-600 hover:text-green-800"
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
        // Simulating a network request
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Replace with your actual fetch call/*
        // const response = await fetch("http://localhost:7180/news/all-news");
        // const data = await response.json();
        const data = [
          {
            _id: 1,
            title: "Historic Peace Treaty Signed",
            content:
              "After decades of conflict, leaders from the nations of Veridia and Solara have signed a landmark peace treaty, bringing an end to the longest-running war in the continent's history. The agreement, mediated by neutral parties, establishes new borders, trade agreements, and a joint commission to oversee demilitarization efforts. Citizens on both sides are celebrating the dawn of a new era of cooperation and prosperity.",
            image:
              "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: 2,
            title: "Breakthrough in Renewable Energy",
            content:
              "Scientists at the Global Innovations Institute have announced a major breakthrough in solar panel efficiency. Their new prototype can convert sunlight into electricity with over 50% efficiency, nearly doubling the current industry standard. This development could dramatically lower the cost of solar energy and accelerate the global transition away from fossil fuels. The team expects the technology to be commercially available within the next five years, heralding a potential revolution in clean energy production.",
            image:
              "https://images.unsplash.com/photo-1497435334365-65c488ce958a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: 3,
            title: "AI Passes Human Creativity Test",
            content:
              'An advanced artificial intelligence named "Muse" has composed a symphony that music critics are hailing as a masterpiece of contemporary classical music. The piece, titled "Digital Dawn," was performed by the London Philharmonic Orchestra and received a standing ovation. This marks the first time an AI has produced a work of art widely considered to be on par with human genius, raising profound questions about the nature of creativity and the future role of AI in the arts.',
            image:
              "https://images.unsplash.com/photo-1677756119517-756a188d2278?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: 4,
            title: "Lost City Discovered in Amazon",
            content:
              "Archaeologists have uncovered the ruins of a sprawling, ancient city hidden deep within the Amazon rainforest. Using advanced LiDAR technology, the team was able to map a network of pyramids, plazas, and canals beneath the dense jungle canopy. The discovery challenges previous assumptions about pre-Columbian civilizations in the region and suggests a far more complex and populous society than was previously understood. Excavations are now underway to unearth the secrets of this mysterious lost city.",
            image:
              "https://images.unsplash.com/photo-1581464648707-1505d38b2b9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];
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
    <div className="min-h-screen bg-slate-50  ">
      <div className="container mx-auto  ">
        {/* --- Responsive Header --- */}
        <header className="mb-8 flex flex-col items-center justify-between gap-6 rounded-lg bg-white p-2 shadow-sm sm:flex-row sm:p-6">
          <div className="flex items-center gap-3">
            <NewspaperIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
              Latest News
            </h1>
          </div>

          {user?.role === "admin" && (
            <Link
              to="/news/create"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add News</span>
            </Link>
          )}
        </header>

        {/* --- News Grid --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
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
