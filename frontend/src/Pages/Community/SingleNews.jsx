import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const LoadingSkeleton = () => (
  <div className="mx-auto max-w-3xl animate-pulse p-4">
    <div className="h-8 w-1/4 rounded-md bg-slate-200"></div>
    <div className="mt-8 h-12 w-full rounded-md bg-slate-200"></div>
    <div className="mt-4 h-6 w-1/2 rounded-md bg-slate-200"></div>
    <div className="mt-8 aspect-video w-full rounded-xl bg-slate-200"></div>
    <div className="mt-8 space-y-4">
      <div className="h-5 w-full rounded-md bg-slate-200"></div>
      <div className="h-5 w-full rounded-md bg-slate-200"></div>
      <div className="h-5 w-11/12 rounded-md bg-slate-200"></div>
      <div className="h-5 w-full rounded-md bg-slate-200"></div>
      <div className="h-5 w-3/4 rounded-md bg-slate-200"></div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
    <h2 className="mt-4 text-xl font-semibold text-slate-800">
      An Error Occurred
    </h2>
    <p className="mt-2 text-slate-500">{message}</p>
    <Link
      to="/news"
      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      Back to News
    </Link>
  </div>
);

const SingleNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:7180/news/getsingle-news/${id}`
        );
        setNews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch news article.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  const splitIntoParagraphs = (text, wordsPerParagraph = 60) => {
    if (!text) return [];
    const words = text.split(" ");
    const paragraphs = [];
    for (let i = 0; i < words.length; i += wordsPerParagraph) {
      paragraphs.push(words.slice(i, i + wordsPerParagraph).join(" "));
    }
    return paragraphs;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : (
        news && (
          <main className="mx-auto max-w-3xl px-4">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition-colors hover:text-green-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to all news</span>
            </Link>

            <article className="mt-6">
              <header>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                  {news.title}
                </h1>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <span>
                    Published on {new Date(news.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </header>

              {news.image && (
                <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl bg-slate-200 shadow-lg">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg prose-slate mx-auto mt-8 max-w-none">
                {splitIntoParagraphs(news.content).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          </main>
        )
      )}
    </div>
  );
};

export default SingleNews;