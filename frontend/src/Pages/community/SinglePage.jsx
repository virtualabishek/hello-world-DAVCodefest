
import React from 'react';
import { useParams } from 'react-router-dom';

import Comments from "./Comments"; // Assuming you have a Comments component for handling comments
import { useState, useEffect } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
import { website_url } from '../../store/authStore'; // Import your user auth store
const SinglePage = () => {
    const { pageId } = useParams();
    console.log("Page ID:", pageId);
    const [post, setPost] = useState(null);
        const [like, setLike] = useState(false);
const [shareLink, setShareLink] = useState(``); // Assuming your app runs on localhost:3000
    useEffect(() => {

        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:7180/community/get-community-post/${pageId}`);
                console.log("Fetched post single page:", response.data);
                if (!response.status === 200) {
                    // throw new Error('Network response was not ok');
                    toast.error('Failed to fetch post');
                }
                setPost(response.data.post);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };


        fetchPost();


    }, [])
    
    const handleLike = () => {
        setLike(!like);
        console.log("Post liked:", post._id);
    };

    console.log("Post data:", post);




    return (
        <>
            <div className="flex items-center flex-col justify-center mb-5      p-5 md:p-0 gap-15 md:flex-row">  
            
<div>
            {post ? (<div
                key={post._id}
                className="w-full max-w-xl bg-white p-5 rounded-lg shadow-md transition-transform hover:-translate-y-1"
            >
                <div className="flex items-center mb-4">
                    <a href={`/profile/${post.owner ? post.owner._id : null}`}>
                        <img
                            src={post.owner.avatar}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                    </a>
                    <div>
                        <a
                            href={`/profile/${post.owner ? post.owner._id : null}`}
                            className="text-lg font-semibold text-gray-800 hover:underline"
                        >
                            {post.owner.username}
                        </a>
                        <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            ..
                            {new Date(post.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>

                <p className="text-gray-800 mb-3">{post.title}</p>
                {post.photo && (
                    <img
                        src={post.photo}
                        alt="Post"
                        className="w-full h-64 object-cover rounded-md mb-3"
                    />
                )}

                <div className="flex justify-between border-t pt-3">
                    <button
                        className={`flex items-center text-white p-2 g-2 rounded-sm hover:underline ${like ? `bg-green-800` : `bg-green-400`
                            }`}
                        onClick={handleLike}
                    >
                        <FaHandHoldingHeart /> : {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-blue-600 hover:underline"
                        // onClick={() => handleCommentView(post)}
                    >
                        <FaComment /> Comment
                    </button>
                    <button className="text-blue-600 hover:underline">
                        <i className="fa-solid fa-link"></i>
                    </button>
                            <button className="flex items-center gap-2 text-blue-600 hover:underline"
                                onClick={() => { 
                                    console.log("Share post:", post._id);
                                    setShareLink(`${website_url}/community/singlepage/${post._id}`);
                                    console.log("Share link:", shareLink);
                                }}>
                        <FaShareAlt /> Share
                    </button>
                </div>
            </div>): <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500 text-lg">Loading post...</p>
                </div>}
            </div>
            
            <div>
                {post && <Comments post={post} className="" />}
            </div>
            </div>
        </>
)

}

export default SinglePage;