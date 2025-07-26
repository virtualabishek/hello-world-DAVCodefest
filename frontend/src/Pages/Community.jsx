import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import {
  UsersIcon,
  GlobeAltIcon,
  ShareIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  PlusIcon
} from "@heroicons/react/24/solid";
import Discussion from "./Community/Discussion"; 
import Media from "./Community/Media";
import ShareBox from "./Community/ShareBox";
import { useTranslation } from "react-i18next";

const Community = () => {
  const { t } = useTranslation();
  const { user } = userAuthStore();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Discussion");
  const [postToShare, setPostToShare] = useState(null);
  const [showShareBox, setShowShareBox] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:7180/community/post?page=${page}&limit=5`);
        const postsData = response.data.post || [];
        setPosts(page === 1 ? postsData : (prev) => [...prev, ...postsData]);
        setTotalPosts(response.data.total);
        setTotalPages(Math.ceil(response.data.total / 5));
      } catch (err) {
        setError("Could not fetch posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    if (activeTab === "Discussion") fetchPosts();
  }, [page, activeTab]);

  const handleShare = (post) => {
    setPostToShare(post);
    setShowShareBox(true);
  };

  const TABS = [t("community.tabs.discussion", "Discussion"), t("community.tabs.media", "Media"), t("community.tabs.people", "People")];

  return (
    <>
      <div className="min-h-screen w-full bg-slate-50">
        <header className="relative h-48 w-full bg-[url('/vectorImg/community.jpg')] bg-cover bg-center md:h-56">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-black/20" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="flex items-center gap-4">
              <UsersIcon className="h-12 w-12 text-green-600" />
              <h1 className="text-4xl font-bold text-slate-800 md:text-5xl">{t('community.title', 'Community')}</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-7xl px-4 pb-16">
          <div className="relative z-20 -mt-12 w-full rounded-xl bg-white p-4 shadow-lg sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{t('community.welcome', 'Welcome to the saralKrishi Community')}</h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <GlobeAltIcon className="h-5 w-5" />
                  <span>{t('community.publicGroup', 'Public Group')} • {totalPosts} {t('community.posts', 'posts')}</span>
                </div>
              </div>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 sm:w-auto">
                  <ShareIcon className="h-5 w-5" />
                  <span>{t('community.shareGroup', 'Share Group')}</span>
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 sm:w-auto">
                  <CheckIcon className="h-5 w-5" />
                  <span>{t('community.joined', 'Joined')}</span>
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-1 overflow-x-auto">
                {TABS.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(["Discussion", "Media", "People"][idx])}
                    className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${activeTab === ["Discussion", "Media", "People"][idx] ? "bg-green-100 text-green-700" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button aria-label={t('community.search', 'Search')} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
                <button aria-label={t('community.moreOptions', 'More options')} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <main className="mt-8">
            {isLoading && page === 1 ? (
              <p className="py-12 text-center text-slate-500">{t('community.loading', 'Loading feed...')}</p>
            ) : error ? (
              <p className="py-12 text-center text-red-500">{error}</p>
            ) : activeTab === "Discussion" ? (
              <Discussion posts={posts} user={user} totalPosts={totalPosts} totalPages={totalPages} onShare={handleShare} />
            ) : activeTab === "Media" ? (
              <Media />
            ) : (
              <p className="py-12 text-center text-slate-500">{t('community.comingSoon', 'This section is coming soon.')}</p>
            )}
            {activeTab === 'Discussion' && page < totalPages && !isLoading && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-md transition-colors hover:bg-slate-50"
                >
                  {t('community.loadMore', 'Load More Posts')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      {showShareBox && postToShare && <ShareBox postId={postToShare._id} setShowShareBox={setShowShareBox} />}
    
        {/* Create Post Button */}
      {user && (
        <Link to={`/post/${user._id}`}>
          <button className="fixed bottom-20 right-5 bg-green-700 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center shadow-md hover:bg-green-800 transition">
            +
          </button>
        </Link>
      )}
      
    </>
  );
};

export default Community;