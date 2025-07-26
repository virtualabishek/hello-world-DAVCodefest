import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaComment, FaShareAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ShareBox from "./ShareBox";
import Comments from "./Comments"; 
import MarketplaceSidebar from "../../Subpages/MarketplaceSidebar";
import { userAuthStore } from "../../store/authStore";

const Discussion = ({ totalPosts, user, posts, totalPages }) => {
  const { t } = useTranslation();
  const [like, setLike] = useState(false);
  const [showShareBox, setShowShareBox] = useState(false);
  const [postToShare, setPostToShare] = useState(null);
  const [page, setPage] = useState(1);

  const handleLike = () => setLike(!like);

  // Open share modal for a specific post
  const handleShare = (post) => {
    setPostToShare(post);
    setShowShareBox(true);
  };

  return (
    <div className="flex justify-between">
      <section className="w-full max-w-5xl flex flex-wrap justify-center gap-2">
        {totalPosts === 0 ? (
          <p className="text-gray-600 text-lg mt-5">{t("discussion.noPosts", "No posts available.")}</p>
        ) : (
          posts.map((p) => (
            <div
              key={p._id}
              className="w-full max-w-xl bg-white p-5 rounded-lg shadow-md transition-transform hover:-translate-y-1 mb-8"
            >
              {/* Post Header */}
              <div className="flex items-center mb-4">
                <a href={`/profile/${p.owner?._id}`}>
                  <img
                    src={p.owner?.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                </a>
                <div>
                  <a
                    href={`/profile/${p.owner?._id}`}
                    className="text-lg font-semibold text-gray-800 hover:underline"
                  >
                    {p.owner?.username}
                  </a>
                  <p className="text-xs text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    ..
                    {new Date(p.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-3">{p.title}</p>
              {p.photo && (
                <img
                  src={p.photo}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
              )}

              {/* Post Actions */}
              <div className="flex justify-between border-t pt-3">
                <button
                  className={`flex items-center text-white px-3 py-2 rounded-sm hover:underline ${like ? "bg-green-800" : "bg-green-400"}`}
                  onClick={handleLike}
                >
                  <FaHandHoldingHeart className="mr-1" /> {p.likes}
                </button>
                <button
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  onClick={() => handleShare(p)}
                  aria-label={t("discussion.share", "Share")}
                >
                  <FaShareAlt /> {t("discussion.share", "Share")}
                </button>
              </div>

              {/* Comments always visible under the post, with scroll if too many */}
              <div className="mt-4 max-h-64 overflow-y-auto rounded border border-slate-100 bg-slate-50 p-2">
                <Comments post={p} user={user} />
              </div>
            </div>
          ))
        )}
      </section>

      {/* Marketplace Sidebar */}
      <div className="hidden lg:block w-80 ml-6">
        <MarketplaceSidebar />
      </div>

      {/* Share Modal */}
      {showShareBox && postToShare && (
        <ShareBox postId={postToShare._id} setShowShareBox={setShowShareBox} />
      )}

      {/* Pagination */}
      {totalPosts > 0 && totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {t("discussion.prev", "Previous")}
          </button>
          <span>
            {t("discussion.page", "Page")} {page} {t("discussion.of", "of")} {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {t("discussion.next", "Next")}
          </button>
        </div>
      )}

      
    </div>
  );
};

export default Discussion;