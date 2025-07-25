import { Link } from "react-router-dom";
import { RiUserCommunityLine } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-3 flex justify-around items-center">
      <Link to="/chat" className="flex flex-col items-center text-gray-500 hover:text-black">
        <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('https://img.icons8.com/?size=100&id=q7wteb2_yVxu&format=png&color=000000')" }}
        ></div>
          </Link>
            <Link to="/community" className="flex flex-col items-center text-gray-500 hover:text-black">
        {/* <RiUserCommunityLine className="w-8 h-8 bg-center bg-contain bg-no-repeat" /> */}
        

        <img src="https://img.icons8.com/?size=100&id=rWegvKYgyOgP&format=png&color=000000" className="w-8 h-8 "/>
                {/* <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('navbarimg/pic2.png')" }}
        ></div> */}
      </Link>
      {/* <Link to="/inventory" className="flex flex-col items-center text-gray-500 hover:text-black">
              <i className="fa-solid fa-box text-2xl"></i>
                <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('navbarimg/pic2.png')" }}
        ></div>
      </Link> */}
      <Link to="/" className="flex flex-col items-center text-green-600">
        <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/images/logo.png')" }}
        ></div>
      </Link>
    
       <Link to="/marketplace" className=" text-gray-500 hover:text-black ">
                      <div
                className="w-8 h-8 bg-center bg-contain bg-no-repeat text-3xl"
                // style={{ backgroundImage: "url('navbarimg/pic2.png')" }}
        >
          {/* <FaBagShopping /> */}
          <img src="https://img.icons8.com/?size=100&id=77118&format=png&color=000000"/>
      </div>
            </Link>
      <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-black">
              <i className="fa-solid fa-user text-2xl"></i>
                <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('https://w7.pngwing.com/pngs/966/53/png-transparent-user-profile-facebook-passport-miscellaneous-silhouette-woman-thumbnail.png')" }}
        ></div>
      </Link>
    </div>
  );
};

export default BottomNavigation;
