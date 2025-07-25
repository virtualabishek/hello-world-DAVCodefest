import { userAuthStore } from "../../store/authStore";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { FaFacebookMessenger } from "react-icons/fa6";
import MoreServices from "./MoreServices";

export default function LoggedUser() {
  const { user, logout } = userAuthStore();
  console.log("User data:", user);
 const  handleLogout=async()=>{
   await logout()
 }
    return (
      <div className="p-5 bg-gray-100 min-h-screen flex flex-col">
        <div> 
          <div className="flex justify-between">
            <div>          <h2 className="text-2xl font-bold mb-5">Profile</h2>
            </div>
            <div className="text-2xl font-bold mb-5"> <Link to="/chatting">  <FaFacebookMessenger /> </Link>
              </div>
          </div>
          



        <div className="relative bg-gray-800 text-white p-5 rounded-lg shadow-lg mt-10">
          <img
            src={user.avatar}
            alt="Profile"
            className="absolute top-[-40px] left-5 w-20 h-20 border-4 border-white rounded-full"
          />
          <div className="mt-10 pl-3">
            <div className="text-lg font-bold">{user.username}</div>
            <div className="text-sm leading-6 ">

                <div className="flex flex-row items-center gap-7">        
                    
                    
                    <div className="text-nowrap flex">
                        <div> Verified: </div>
                          <div className="text-nowrap">  {   user.isVerified? <div className=" flex flex-row gap-2 items-center "> <div> Verified </div> <div className="text-white bg-green-400 rounded-full text-md" ><SiTicktick/> </div>  </div>: <div>  "Not-verified "</div>} </div>  </div>    
                   
                  {user.isVerified?"":<div>    <NavLink to='/verify-otp' className="text-white  bg-green-600 cursor p-2 rounded-xl text-md">Verify Now</NavLink>   </div>}    
                </div>
              Address:Ranighat Birgunj<br />
              Email:  {user.email}
              </div>
    
            <div>  <div className="text-blue-400 text-left cursor-pointer hover:text-blue-600 transition duration-300">
              <Link to={`${user._id}`}> ..more</Link>
            </div>
            <div className="text-blue-400 text-right cursor-pointer hover:text-blue-600 transition duration-300">
              Edit Profile
            </div></div>
           
          </div>
          </div>
          <div className="flex justify-center">
            <MoreServices user={user} />
          </div>
        <div className="mt-10 space-y-4">
          <a href="#" className="block bg-white shadow-md rounded-lg p-3 text-center hover:shadow-lg transition">
            About
          </a>
          <a href="#" className=" bg-white shadow-md rounded-lg p-3 flex items-center justify-center gap-2 hover:shadow-lg transition">
            <i className="fas fa-exclamation-circle text-blue-400"></i> Report Problem
          </a>

          <button 
          className="block bg-red-600 text-white font-bold shadow-md rounded-lg p-3 text-center  w-full hover:bg-red-700 transition"
           onClick={handleLogout}> Log Out</button>

          </div>
        </div>
      </div>
    );
  }
  
