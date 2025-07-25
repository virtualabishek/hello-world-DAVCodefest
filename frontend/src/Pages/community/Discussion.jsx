

import React, { useState, useEffect } from "react";
import Comments from "./Comments";
import { FaHandHoldingHeart, FaComment, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShareBox from "./ShareBox";

const Discussion = ({ totalPosts, user, posts, totalPages }) => {
    const [like, setLike] = useState(false);
    const [post, setPost] = useState(null);
    const [ShowShareBox, setShowShareBox] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (posts && posts.length > 0) {
            setPost(posts[0]);
        }
    }, [posts]);

    const handleLike = () => {
        setLike(!like);
        console.log("Post liked:", post?._id);
    };

    const handleCommentView = (clickedPost) => {
        setPost(clickedPost);
    };

    return (
        <>
            
            <div className="flex  justify-between" >
                <div> 
                <section className="w-full max-w-5xl flex flex-wrap justify-center gap-2">
                    {totalPosts === 0 ? (
                        <p className="text-gray-600 text-lg mt-5">No posts available.</p>
                    ) : (
                        posts.map((p) => (
                            <div
                                key={p._id}
                                className="w-full max-w-xl bg-white p-5 rounded-lg shadow-md transition-transform hover:-translate-y-1"
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
                                        onClick={() => handleCommentView(p)}
                                    >
                                        <FaComment /> Comment
                                    </button>
                                    <button
                                        className="flex items-center gap-2 text-blue-600 hover:underline"
                                        onClick={() => {
                                            setPost(p);
                                            setShowShareBox(true);
                                        }}
                                    >
                                        <FaShareAlt /> Share
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </section>
</div>
                {/* Comments Sidebar */}
                                   <div className="sticky absolute  top-30 right-10 w-1/3 h-full  p-5 overflow-y-auto shadow-lg hidden md:block">
                {post && <Comments post={post} />}
                </div>

                {/* Share Modal */}
                {ShowShareBox && post && (
                    <ShareBox postId={post._id} setShowShareBox={setShowShareBox} />
                )}

                {/* Pagination */}
                {totalPosts > 0 && totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-5">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Create Post Button */}
                {user && (
                    <Link to={`/post/${user._id}`}>
                        <button className="fixed bottom-20 right-5 bg-green-700 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center shadow-md hover:bg-green-800 transition">
                            +
                        </button>
                    </Link>
                )}
            </div>
        </>
    );
};

export default Discussion;





// adasdasdasdas
// import React from 'react'
// import Comments from "./Comments"; // Assuming you have a Comments component for handling comments
// import { useState,useEffect } from "react";
// import { FaHandHoldingHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { FaComment } from "react-icons/fa";
// import { FaShareAlt } from "react-icons/fa";
// import ShareBox from "./ShareBox"; // Assuming you have a ShareBox component for sharing posts
// import { motion, AnimatePresence } from 'framer-motion';

// const Discussion = ({ totalPosts, user, posts, totalPages }) => {

//     const [like, setLike] = useState(false);
//     const [post, setPost] = useState(null);
//     const [ActiveComment, setActiveComment] = useState(null);
//     const [ShowShareBox, setShowShareBox] = useState(false);
//     // setposts(posts[0]);
//     useEffect(() => {
//         if (posts && posts.length > 0) {
//             setPost(posts[0]);
//             setActiveComment(posts[0])
//         }
//     }, [posts]); // Run this effect only when 'posts' changes
//     const handleLike = () => {
//         setLike(!like);
//         console.log("Post liked:", post._id);
//     };
  

//     const handleCommentView = (clickedPost) => {
//         console.log("View comments for post:");
//         console.log(post._id);  
//         console.log("View comments for post:", post);
//         setPost(clickedPost)
//         console.log("updated post:", post);
//     }



//     return (

//         <>
//             <div className="flex  items-center justify-center mb-5">
//                 <div className="flex justify-between">



//                     <div>
//                         <section className="w-full max-w-5xl flex flex-wrap justify-center  gap-5">
//                             {totalPosts === 0 ? (
//                                 <p className="text-gray-600 text-lg mt-5">No posts available.</p> // Graceful fallback
//                             ) : (
                                    
                                    
//                                 posts.map((post) => (
//                                     <div
//                                         key={post._id}
//                                         className="w-full max-w-xl bg-white p-5 rounded-lg shadow-md transition-transform hover:-translate-y-1"
//                                     >
//                                         {/* Post Header */}
//                                         <div className="flex items-center mb-4">
//                                             <a href={`/profile/${post.owner ? post.owner._id : null}`}>
//                                                 <img
//                                                     src={post.owner.avatar}
//                                                     alt="Profile"
//                                                     className="w-12 h-12 rounded-full object-cover mr-3"
//                                                 />
//                                             </a>
//                                             <div>
//                                                 <a
//                                                     href={`/profile/${post.owner ? post.owner._id : null}`}
//                                                     className="text-lg font-semibold text-gray-800 hover:underline"
//                                                 >
//                                                     {post.owner.username}
//                                                 </a>
//                                                 <p className="text-xs text-gray-500">
//                                                     {new Date(post.createdAt).toLocaleDateString("en-US", {
//                                                         year: "numeric",
//                                                         month: "short",
//                                                         day: "numeric",
//                                                     })}{" "}
//                                                     ..
//                                                     {new Date(post.createdAt).toLocaleTimeString("en-US", {
//                                                         hour: "2-digit",
//                                                         minute: "2-digit",
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         {/* Post Content */}
//                                         <p className="text-gray-800 mb-3">{post.title}</p>
//                                         {post.photo && (
//                                             <img
//                                                 src={post.photo}
//                                                 alt="Post"
//                                                 className="w-full h-64 object-cover rounded-md mb-3"
//                                             />
//                                         )}

//                                         {/* Post Actions */}
//                                         <div className="flex justify-between border-t pt-3">
//                                             <button
//                                                 className={`flex items-center text-white p-2 g-2 rounded-sm hover:underline ${like ? `bg-green-800` : `bg-green-400`
//                                                     }`}
//                                                 onClick={handleLike}
//                                             >
//                                                 <FaHandHoldingHeart /> : {post.likes}
//                                             </button>
//                                             <button className="flex items-center gap-2 text-blue-600 hover:underline"
//                                                 onClick={()=> handleCommentView(post)}
//                                             >
//                                                 <FaComment/> Comment
//                                             </button>
//                                             <button className="text-blue-600 hover:underline">
//                                                 <i className="fa-solid fa-link"></i>
//                                             </button>
//                                             <button className="flex items-center gap-2 text-blue-600 hover:underline"
                                            
//                                                 onClick={() => { 
//                                                     setShowShareBox(true);
//                                                 }}
//                                             >
//                                                 <FaShareAlt/> Share
//                                             </button>

//                                             {ShowShareBox && (
                                                

//                                                 <ShareBox postId={post._id} setShowShareBox={setShowShareBox} />

                                            
//                                             )}


//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </section>
//                     </div>
//                     {/* comments */}
//                     <div className="sticky absolute  top-30 right-10 w-1/3 h-full  p-5 overflow-y-auto shadow-lg hidden md:block">
//                          {/* <AnimatePresence> */}

//                      {post && <Comments post={post} className=""/>}
//                             {/* </AnimatePresence> */}



//                     </div>

//                 </div>
//                 {/* Posts Section */}








//                 {/* Pagination Controls */}
//                 {totalPosts > 0 && totalPages > 1 && (
//                     <div className="flex justify-center gap-3 mt-5">
//                         <button
//                             onClick={() => setPage(page - 1)}
//                             disabled={page === 1}
//                             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//                         >
//                             Previous
//                         </button>
//                         <span>
//                             Page {page} of {totalPages}
//                         </span>
//                         <button
//                             onClick={() => setPage(page + 1)}
//                             disabled={!hasNextPage} // Disable Next if no posts exist
//                             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 )}

//                 {/* Create Post Button */}
//                 {user && (
//                     <button className="fixed bottom-17 right-5 bg-green-700 text-white w-12 h-12 rounded-full text-2xl transition-transform transform md:bottom-5">
//                         <Link to={`/post/${user._id}`}>+</Link>
//                     </button>
//                 )}
//             </div>
//         </>

//     )
// }
// export default Discussion;