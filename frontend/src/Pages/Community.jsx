import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaShare } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import Discussion from "./Community/Discussion";
import Media from "./Community/Media"; // Assuming you have a Media component for handling media posts

const Community = () => {
  const [posts, setPosts] = useState([]); // Ensure posts is an array by default
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { user } = userAuthStore();
  const limit = 5; // Number of posts per page


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7180/community/post?page=${page}&limit=${limit}`
        );

        const postsData = response.data.post || []; // Safely default to empty array if no data
        console.log("postsData", postsData);
        
        setPosts(postsData);
        setTotalPosts(response.data.total); // Store total post count
        const total = Math.ceil(response.data.total / limit);
        setTotalPages(total > 10 ? 10 : total); // Restrict pages to max 10

        // Check if next page has posts
        const nextPageResponse = await axios.get(
          `http://localhost:7180/community/post?page=${page + 1}&limit=${limit}`
        );
        setHasNextPage(nextPageResponse.data.post.length > 0);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [page]);


  const [activeTab, setActiveTab] = useState('Discussion');

  return (
    <main className="w-full flex flex-col  bg-gray-100 p-5  ">


      <div className="flex   mb-5">
        <div className="font-bold text-xl flex   flex-col justify-center   items-center h-50 w-full bg-[url('/vectorImg/community.jpg')] bg-cover bg-center">


          <div
            className="text-2xl font-bold  text-black font-serif text-5xl flex gap-3 justify-center bg-gray-200 items-center     rounded">

          {/* //  className="flex  items-center justify-center w-full  " */}
            <img src="https://img.icons8.com/?size=100&id=6Eb4G3wdQwTC&format=png&color=000000" />
            
            
            
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-serif">
                Community
          </span>  </div>

          {/* <div>         123
          </div> */}
          {/* start  */}
          {/* <div className="flex items-center justify-center mb-5    ">
            <div className="w-full max-w-5xl bg-white p-5 rounded-lg shadow-md ">
              <h2 className="text-2xl font-bold mb-4">Welcome to the KhetAI Community</h2>
              <p className="text-gray-600">
                Connect with others, share your experiences, and explore the latest posts.
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center whitespace-nowrap text-gray-600">
                  <img src="https://img.icons8.com/?size=100&id=t0pRVC1Kipju&format=png&color=000000" className="h-7 w-7" />
                  Public Group
                </div>
                <div className="flex flex-row items-center ">
                  <div>
                    <button className="flex m-2 p-2 items-center gap-2 bg-blue-400 rounded rounded-xl">
                      <FaShare /> share
                    </button>
                  </div>
                  <div>
                    <button className="flex m-2 p-2 items-center gap-2 bg-gray-400 rounded rounded-xl">
                      <RiUserCommunityFill /> joined
                    </button>
                  </div>
                </div>

              </div>
              <div className="border-b-3 "> </div>
              <div className="flex justify-between items-center mt-2">

                <div className="flex  gap-17 text-md   font-semibold text-gray-600">
                  <div className={`border-b-3 border-blue-500 text-blue-500 `}> Discussion</div>
                  <div> People</div>
                  <div> Events</div>
                  <div> Media</div>
                  <div> Files</div>


                </div>
                <div className="flex gap-10">
                  <div className="bg-gray-400 p-2 rounded-sm"> search</div>
                  <div className="bg-gray-400 p-2  px-4 rounded-sm">...  </div>

                </div>


              </div>


            </div>


          </div> */}
          {/* end */}

        </div>

      </div>



      {/* top */}
      <div className="flex items-center justify-center mb-5    ">
        <div className="w-full max-w-5xl bg-white p-5 rounded-lg shadow-md ">
          <h2 className="text-2xl font-bold mb-4">Welcome to the KhetAI Community</h2>
          <p className="text-gray-600">
            Connect with others, share your experiences, and explore the latest posts.
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center whitespace-nowrap text-gray-600">
              <img src="https://img.icons8.com/?size=100&id=t0pRVC1Kipju&format=png&color=000000" className="h-7 w-7" />
              Public Group
            </div>
            <div className="flex flex-row items-center ">
              <div>
                <button className="flex m-2 p-2 items-center gap-2 bg-blue-400 rounded rounded-xl">
                  <FaShare /> share
                </button>
              </div>
              <div>
                <button className="flex m-2 p-2 items-center gap-2 bg-gray-400 rounded rounded-xl">
                  <RiUserCommunityFill /> joined
                </button>
              </div>
            </div>

          </div>
          <div className="border-b-3 "> </div>
          {/* <div className="flex justify-between items-center mt-2"> 

            <div className="flex  flex-col gap-10 text-md   font-semibold text-gray-600 md:flex-row md:w-1/2">
              <div className={`border-b-3 border-blue-500 text-blue-500  `}> Discussion</div>
              <div> People</div>
              <div> Events</div>
              <div> Media</div>
              <div> Files</div>


            </div>
            <div className="flex gap-10">
              <div className="bg-gray-400 p-2 rounded-sm"> search</div>
              <div className="bg-gray-400 p-2  px-4 rounded-sm">...  </div>

            </div>


          </div> */}
          <div className="flex justify-between items-start mt-2 flex-col flex-row gap-4">
            {/* Tabs Section */}
            <div className="grid grid-cols-2 gap-4 text-md font-semibold text-gray-600 md:flex md:flex-row md:w-1/2">
              <div
                className={`cursor-pointer px-2 py-1 ${activeTab === 'Discussion' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
                  }`} onClick={() => setActiveTab('Discussion')}>Discussion</div>
              <div
                className={`cursor-pointer px-2 py-1 ${activeTab === 'people' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
                  }`} onClick={() => setActiveTab('people')}>People</div>
              {/* <div>Events</div> */}
              <div className={`cursor-pointer px-2 py-1 ${activeTab === 'Media' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
                }`} onClick={() => setActiveTab('Media')}>Media</div>
            </div>

            {/* Search and Options Section */}
            <div className="flex gap-4  items-center md:gap-10">
              <div className="bg-gray-400 p-2 px-4 py-3 rounded-sm text-white text-sm text-center  "><FaSearch /></div>
              <div className="bg-gray-400 p-2  px-4 py-3 rounded-sm text-white text-sm text-center"> <CiCircleMore />  </div>
            </div>
          </div>

        </div>


      </div>

      {console.log("posts inside of community", posts)}
      {console.log("total post in community", totalPosts)
      }
      {console.log("user in community", user)}


      {activeTab === 'Discussion' && <Discussion totalPosts={totalPosts} user={user} posts={posts} totalPages={totalPages} />
    }
      {activeTab === 'Media' && <Media/>}

    </main>
  );
};

export default Community; 