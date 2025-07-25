import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { IoIosHeartDislike } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast'; // Assuming you are using react-hot-toast for notifications
import { userAuthStore } from '../../store/authStore'; // Adjust the import path as necessary
const Comment = ({post}) => {
    // const post = {
    //     _id: "67dd83b0bf109453b9e92529",
    //     title: "आज मलाई कृषि खेती धेरै राम्रो लाग्यो।",
    //     photo: "http://res.cloudinary.com/dv9noi4np/image/upload/v1742570416/szylglnx3i.jpg",
    //     owner: "http://res.cloudinary.com/dv9noi4np/image/upload/v1742569812/qbu2qlu6u5ip9n1pnihw.jpg",
    //     createdAt: "2025-03-21T15:20:16.186+00:00",
        
    // };
    const { user } = userAuthStore(); // Get the current user from the store

    // const comments = [
    //     {
    //         _id: "6840224cbe88a939b4ff5559",
    //         content: "hello my name is bishal adhikair",
    //         postId: "67dd81e8bf109453b9e924d1",
    //         userId: {
    //             _id: "67dd8155bf109453b9e924be",
    //             username: "bishal",
    //             email: "animezoneamv@gmail.com",
    //             avatar: "http://res.cloudinary.com/dv9noi4np/image/upload/v1742569812/qbu2qlu6u5ip9n1pnihw.jpg"
    //         },
    //         like: 0,
    //         dislike: 0,
    //         __v: 0
    //     },
    //     {
    //         _id: "6840224cbe88a939b4ff5560",
    //         content: "great post! keep it up.",
    //         postId: "67dd81e8bf109453b9e924d1",
    //         userId: {
    //             _id: "67dd8155bf109453b9e924bf",
    //             username: "ram",
    //             email: "ram@example.com",
    //             avatar: "https://i.pravatar.cc/100?img=3"
    //         },
    //         like: 0,
    //         dislike: 0,
    //         __v: 0
    //     }
    // ];
    const [comments, setComments] = useState([]); // Initialize comments state
    const [sendComment, setSendComment] = useState(""); // State for new comment 
    const fetchComments = async () => {
        const response = await axios.get("http://localhost:7180/community/get-comments", { params: { postId: post._id } });
        console.log("commnt jsx repsaone", response.data);
        setComments(response.data.comments || []); // Safely default to empty array if no data
    }
    useEffect(() => {
     
        fetchComments()

    }, [post]);

    const handleSendComment =async (e) => { 
        e.preventDefault(); // prevent page reload
        if (sendComment.trim() === "") {
        return     toast.error("Comment cannot be empty!"); // Show error if comment is empty
        }

        const response = await axios.post("http://localhost:7180/community/comment", { content: sendComment, postId: post._id, userId: user ._id});
        
        if (response.status !== 200) {
            return toast.error("Failed to send comment!"); // Show error if sending comment fails
        } if (response.status == 200) { 
            toast.success(`Comment sent successfully! ${sendComment}`);

        }

        setSendComment(""); // Clear the input field after sending
        fetchComments()
    }
    // console.log("single post in comment", singlePost);

    return (
        <div className="flex flex-col md:flex-col bg-gray-200 shadow-md gap-6 mt-6 ">

            {/* Left Side - Post */}
            <div className="w-full md:w-full bg-white hidden md:block  rounded-lg p-4">
                <div className="text-xl font-bold p-2">Post </div> 
                <div className="flex items-center gap-3 ">
                    <img
                        src={post.owner.avatar }
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="font-semibold text-gray-800">{post.title}</h2>
                        <p className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {/* <img
                    src={post.photo}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-md mt-2"
                /> */}
            </div>

            {/* Right Side - Comments */}
            <div className="w-full md:w-full bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-700 mb-4  ">Comments</h3>
                <div className="h-64 overflow-y-scroll"> 
                {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="mb-4 border-b-2 pb-4  ">
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
                                        <div>  <p className="text-sm text-gray-600">{comment.content}</p>
                                        </div>
                                        <div className="flex items-center   gap-27  mt-2"> 
                                            <p className="flex items-center gap-2">  <FaHeart/>{comment.like}</p>
                                            <p className="flex items-center gap-2"> <IoIosHeartDislike/> {comment.dislike}</p>
                                            </div>
                                      
                                        </div>
                                   

                                </div>
                            </div>
                            
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No comments yet.</p>
                    )}
                </div>
                {/* <button > Add a comment...</button> */}
                <div className="flex justify-between p-3">   <input placeholder="Add a comment..." className="border-none" value={sendComment} onChange={(e) => setSendComment(e.target.value)}
 />
                    <button className="text-white bg-green-700 p-2 rounded" onClick={handleSendComment} > Send</button> </div>

              
            </div>
        </div>
    );
};

export default Comment;
