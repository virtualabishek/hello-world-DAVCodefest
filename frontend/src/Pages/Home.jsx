import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import SensorData from "../Subpages/SensorData";
import News from "../Subpages/News";
import Connectdevice from "../Subpages/Connectdevice";
import {
  ShieldExclamationIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const ConnectDevicePromptComponent = ({ refetch }) => (
  <div className="rounded-xl bg-white p-6 text-center shadow-lg ">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-green-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.136 12.006a8.25 8.25 0 0 1 13.728 0M2.01 8.94a11.25 11.25 0 0 1 19.98 0M12 21.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.008Z" />
      </svg>
    </div>
    <h3 className="mt-4 text-xl font-bold text-slate-800">Connect Your Farm</h3>
    <p className="mb-2 text-slate-500">Get live sensor data by connecting your device.</p>
    <Connectdevice refetch={refetch} className="mt-4" />
  </div>
);

const QuickActionCard = ({ to, icon: Icon, title, subtitle }) => (
    <Link to={to} className="group block rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                <Icon className="h-6 w-6 text-green-700" />
            </div>
            <div>
                <h4 className="font-bold text-slate-800 group-hover:text-green-700">{title}</h4>
                <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
        </div>
    </Link>
);

const Home = () => {
  const { user } = userAuthStore();
  const [weather, setWeather] = useState(null);
  const [deviceRefresh, setDeviceRefresh] = useState(false); 
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  const refetch = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Lalitpur&units=metric&appid=5e0c4d7564f485afbd09ea6e9b55adb4")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather:", error));
  }

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setIsDeviceConnected(!!user?.devices && user.devices.length > 0);
  }, [user]);

  const handleDeviceConnect = () => {
    setIsDeviceConnected(true);
  };

  const handleDeviceDisconnect = () => {
    setIsDeviceConnected(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 m-20">
      <main className="container mx-auto space-y-8 p-4 py-8 pb-24">
        <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-700 p-6 text-white shadow-lg">
            <h1 className="text-3xl font-bold">{getGreeting()}, {user?.username || "Farmer"}!</h1>
            <p className="opacity-90">Here's your farm's outlook for today.</p>
            <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider opacity-80">{weather ? weather.city.name : "..."}</p>
                    <p className="text-5xl font-extrabold">{weather ? `${Math.round(weather.list[0].main.temp)}°C` : "..."}</p>
                    <p className="capitalize">{weather ? weather.list[0].weather[0].description : "Loading..."}</p>
                </div>
                <div className="flex w-full gap-2 overflow-x-auto sm:w-auto sm:justify-end">
                    {weather?.list.slice(1, 6).map((entry, index) => (
                        <div key={index} className="flex-shrink-0 rounded-lg bg-white/20 p-3 text-center text-sm backdrop-blur-sm">
                            <p className="font-semibold">{new Date(entry.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric' })}</p>
                            <CloudIcon className="w-8 h-8 mx-auto my-1 opacity-90"/>
                            <p>{Math.round(entry.main.temp)}°</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-slate-800">Live Farm Status</h2>
            <div className="mt-4">
                {isDeviceConnected
                  ? <SensorData onDisconnect={handleDeviceDisconnect} />
                  : <ConnectDevicePromptComponent refetch={refetch} />}
            </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
             <QuickActionCard to="/service/diseaseidentifier" icon={ShieldExclamationIcon} title="Identify Disease" subtitle="Scan plants with your camera" />
             <QuickActionCard to="/marketplace" icon={BuildingStorefrontIcon} title="Marketplace" subtitle="Buy & sell produce" />
             <QuickActionCard to="/community" icon={UsersIcon} title="Community" subtitle="Connect with other farmers" />
        </div>

        <div className="relative flex flex-col md:flex-row overflow-hidden rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-lg">
            <div className="p-8 h-[400px] flex flex-col justify-between md:w-2/3">
            <div className="flex flex-col">

                <h3 className="text-5xl font-bold">Farming Wisdom from the Pros</h3>
                <p className="mt-5 max-w-lg opacity-90">
                    Get in touch with top farmers earning 12+ lakhs per season and learn their secrets!
                </p>
            </div>
                <div className="flex w-full h-15 ">

                <Link to="/community" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-200">
                    Go to Community
                </Link>
                {/* <Link to="/marketplace" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-200">
                    Go to Marketplace
                </Link> */}
                </div>
            </div>
            <div className="relative h-40 md:h-auto md:w-1/3">
                <img
                    src="/images/farmer.png"
                    className="absolute bottom-0 right-0 h-full w-auto object-contain object-bottom"
                    alt="Farmer"
                />
            </div>
        </div>

        <div>
            {/* <h2 className="text-2xl font-bold text-slate-800">Latest News</h2> */}
            <div className="mt-4">
                <News />
            </div>
        </div>
      </main>
    </div>
  );
};

export default Home;