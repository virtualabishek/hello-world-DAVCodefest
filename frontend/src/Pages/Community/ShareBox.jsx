import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";

const ShareBox = ({ postId, setShowShareBox }) => {
  const shareBoxRef = useRef(null);
  const shareLink = `${window.location.origin}/post/${postId}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareBoxRef.current && !shareBoxRef.current.contains(event.target)) {
        setShowShareBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowShareBox]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
    setShowShareBox(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        ref={shareBoxRef}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
      >
        <button
          onClick={() => setShowShareBox(false)}
          className="absolute top-3 right-3 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h3 className="text-lg font-bold text-slate-800">Share Post</h3>
        <p className="mt-1 text-sm text-slate-500">
          Copy the link below to share this post.
        </p>

        <div className="relative mt-4">
          <LinkIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={shareLink}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700"
          />
        </div>
        <button
          onClick={copyToClipboard}
          className="mt-4 w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
        >
          Copy Link
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ShareBox;