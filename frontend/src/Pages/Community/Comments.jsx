import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosHeartDislike } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { userAuthStore } from '../../store/authStore';

const Comments = ({ post, user }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [sendComment, setSendComment] = useState("");

  const fetchComments = async () => {
    const response = await axios.get("http://localhost:7180/community/get-comments", { params: { postId: post._id } });
    setComments(response.data.comments || []);
  };

  useEffect(() => {
    fetchComments();
  }, [post]);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (sendComment.trim() === "") {
      return toast.error(t("comments.empty", "Comment cannot be empty!"));
    }
    const response = await axios.post("http://localhost:7180/community/comment", { content: sendComment, postId: post._id, userId: user._id });
    if (response.status !== 200) {
      return toast.error(t("comments.failed", "Failed to send comment!"));
    }
    toast.success(t("comments.success", "Comment sent successfully!"));
    setSendComment("");
    fetchComments();
  };

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{t("comments.title", "Comments")}</h3>
      <div className="h-64 overflow-y-scroll">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4 border-b-2 pb-4">
              <div className="flex items-start gap-3">
                <img
                  src={comment.userId.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {comment.userId.username}
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                    <div className="flex items-center gap-6 mt-2">
                      <p className="flex items-center gap-2"><FaHeart />{comment.like}</p>
                      <p className="flex items-center gap-2"><IoIosHeartDislike />{comment.dislike}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">{t("comments.noComments", "No comments yet.")}</p>
        )}
      </div>
      <form className="flex justify-between p-3" onSubmit={handleSendComment}>
        <input
          placeholder={t("comments.addPlaceholder", "Add a comment...")}
          className="border-none flex-1"
          value={sendComment}
          onChange={(e) => setSendComment(e.target.value)}
        />
        <button type="submit" className="text-white bg-green-700 p-2 rounded">
          {t("comments.send", "Send")}
        </button>
      </form>
    </div>
  );
};

export default Comments;