import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { RiPriceTag3Fill } from "react-icons/ri";
import { RiUserCommunityLine } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
const UpperNavigation = ({ unreadNotifications }) => {
  const {user}=userAuthStore()
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md py-3 flex justify-between p-10 items-center ">

      
      <div className="logo flex-1">
  <Link to="/">      <img src="/images/logo.png" alt="" className="h-10 w-10" />
 </Link>
  
      </div>
      
      <div className="flex flex-row  flex-1  items-center  "> 

      <Link to="/chat" className="flex flex-col items-center text-gray-500 hover:text-black flex-1">
        <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('https://img.icons8.com/?size=100&id=q7wteb2_yVxu&format=png&color=000000')" }}
        ></div>
          </Link>
          
      <Link to="/marketplace" className="flex flex-col items-center text-gray-500 hover:text-black flex-1">
                <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat text-3xl"
          // style={{ backgroundImage: "url('navbarimg/pic2.png')" }}
          >
            {/* <FaBagShopping /> */}
            <img src="https://img.icons8.com/?size=100&id=77118&format=png&color=000000"/>
</div>
      </Link>
     
      <Link to="/community" className="flex flex-col items-center text-gray-500 hover:text-black flex-1">
            
                <div
          className="w-10 h-8.5 bg-center bg-contain bg-no-repeat text-4xl  "
          // style={{ backgroundImage: "url('navbarimg/pic2.png')" }}
          >
            {/* <RiUserCommunityLine /> */}
            <img src="https://img.icons8.com/?size=100&id=rWegvKYgyOgP&format=png&color=000000" className="w-8 h-8 " />

          
          </div>
        </Link>
        
        <Link
          to={`/notification/${user ? user._id : null}`}
          className="relative flex flex-col items-center text-gray-500 hover:text-black flex-1"
        >
          <div className="relative w-10 h-10 flex items-center justify-center text-2xl">
            <IoIosNotifications />

            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </div>
        </Link>

          <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-black flex-1">
            <div
  className="w-11 h-11 bg-center bg-contain bg-no-repeat bg-cover rounded-full"
  style={{ backgroundImage: `url(${user ? user.avatar : "	https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"})` }}
></div>

      </Link>

        


 </div>




    </div>
  );
};

export default UpperNavigation;
