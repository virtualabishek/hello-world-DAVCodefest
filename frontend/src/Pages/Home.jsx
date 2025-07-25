

import React, { useEffect, useState } from "react";
import { Bell, MapPin, Scan } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import SensorData from "../Subpages/SensorData";
import { FaBagShopping } from "react-icons/fa6";
import { RiUserCommunityLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import News from "../Subpages/News";
import { IoIosNotifications } from "react-icons/io";

import Connectdevice from "../Subpages/Connectdevice";
import { userAuthStore } from "../store/authStore";
const COLORS = ["#3498db", "#ddd"];

const Home = ({ unreadNotifications }) => {

  const [weather, setWeather] = useState(null);
  const user = userAuthStore.getState().user;
  
  useEffect(() => {
    refetch()
  }, []);
  const refetch =()=> fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Birgunj&units=metric&appid=5e0c4d7564f485afbd09ea6e9b55adb4"
  )
    .then((res) => res.json())
    .then((data) => {
      setWeather(data);
    })
    .catch((error) => console.error("Error fetching weather:", error));


  return (
    <div className="bg-gray-100 min-h-screen bg-[url('/images/Frame.png')] bg-cover bg-center">
      <div className="bg-green-500 p-4 text-white flex justify-between items-center rounded-b-2xl">
        <div className="flex items-center space-x-2">
          <MapPin />
          <div>
            <h2 className="font-bold text-lg">{user?user.location:  "Lalitpur,Kathmandu "}</h2>
            <p className="text-sm"> Nepal • {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
     
             
              
        <div className="flex space-x-3 items-center flex md:hidden">
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
          <img
            src={user?user.avatar:"https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
            className="w-10 h-10 rounded-full"
            alt="Profile"
          />
        </div>
      </div>
      <div className="w-full flex justify-center  ">
        <div className="m-4 bg-white p-4 rounded-lg  shadow-md  md:w-[90vw]   md:h-[20vh] md:p-4 bg-[url('/images/Frame.png')] bg-cover bg-center  ">
        <h3 className="font-bold">{weather ? weather.list[0].dt_txt.split(" ")[0] : "Loading..."}</h3>
        <p className="text-gray-600">
          {weather ? `${weather.list[0].main.temp}°C` : "Loading..."}
        </p>
        <div className="flex justify-between mt-2">
          {weather &&
            weather.list.slice(0, 6).map((entry, index) => (
              <div key={index} className="text-center">
                <p>{new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
                <p>🌤 {entry.main.temp}°</p>
              </div>
            ))}
        </div>
      </div>
 </div>

     
      {/* Farm Monitoring */}
       
      
      
      {
        (user ? user.devices : null) ? <SensorData refetch={refetch} /> : <Connectdevice refetch={refetch} className="mt-2"  />

      }
      {/* <SensorData /> */}
            <div className="p-2"> </div>

      {/* {
        !user.devices && 
      <SensorData/> 
      } */}


      {/* Last 5 Days Graph
      <div className="m-4 bg-gray-900 p-6 rounded-lg shadow-md">
        <p className="text-white">Last 5 Days Graph</p>
        <div className="h-32 bg-green-700 mt-2 rounded"></div>
      </div> */}

      {/* Farming Tips */}
      <div className="m-7 bg-white rounded-lg shadow-md flex flex-col md:flex-row relative md:mt-20 text-white  "
      // style={{ backgroundColor: "#0FAF3C", color: "white" }}
      >
  {/* Text Section */}
  <div className="md:w-2/4 p-5 md:p-10 bg-green-900 ">
    <h3 className="font-bold w-[40vw] md:text-2xl">Farming tips from top farmers</h3>
    <p className="text-gray-600 text-sm w-[40vw] md:text-lg text-white">
      Get in touch with the top farmers earning 12+ lakhs per season!!
    </p>
    <button className="mt-2 bg-black text-white px-4 py-2 rounded-lg">
      Contact Now
    </button>
  </div>

  {/* Image Section (Fixed for Mobile & Desktop) */}
  <div className="md:w-1/3 relative flex justify-center md:justify-end items-end">
    <img
      src="/images/farmer.png"
      className="w-30  md:w-50 h-auto rounded-lg absolute bottom-0 right-0"
      alt="Farmer"
    />
  </div>
</div>

      {/* Quick Actions */}
      <div className="m-4 flex justify-between">
        <button className="bg-yellow-400 px-4 py-2 rounded-lg w-1/2 mr-2">
          Get your location-based Farming Tips
        </button>
        <button className="bg-blue-500 px-4 py-2 rounded-lg flex items-center w-1/2 text-white">
          <Scan className="mr-2" />
          Scan to Identify Problem
        </button>
      </div>

      {/* News */}

        <div >   <News /></div>


      {/* </div> */}
   
    </div>
  );
};

export default Home;
