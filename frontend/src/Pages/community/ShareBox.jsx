import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; // Assuming you are using react-hot-toast for notifications
const ShareBox = ({ postId, setShowShareBox }) => {
    const shareBoxRef = useRef(null);
    const shareLink = `${window.location.origin}/community/singlepage/${postId}`;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareBoxRef.current && !shareBoxRef.current.contains(event.target)) {
                setShowShareBox(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowShareBox]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        toast.success("Link copied to clipboard!");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
        >
            <motion.div
                ref={shareBoxRef}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-xs"
            >
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Share this post</h3>
                <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="w-full px-3 py-2 mb-4 border rounded text-gray-800 dark:bg-gray-700 dark:text-white"
                />
                <div className="flex justify-between">
                    <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Copy Link
                    </button>
                    <button
                        onClick={() => setShowShareBox(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ShareBox;
