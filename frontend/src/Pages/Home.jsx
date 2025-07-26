import {
  BuildingStorefrontIcon,
  CloudIcon,
  ShieldExclamationIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import Connectdevice from "../Subpages/Connectdevice";
import News from "../Subpages/News";
import SensorData from "../Subpages/SensorData";

const getGreeting = (t) => {
  const hour = new Date().getHours();
  if (hour < 12) return t("home.greeting.morning");
  if (hour < 18) return t("home.greeting.afternoon");
  return t("home.greeting.evening");
};

const ConnectDevicePromptComponent = ({ refetch }) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-green-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.136 12.006a8.25 8.25 0 0 1 13.728 0M2.01 8.94a11.25 11.25 0 0 1 19.98 0M12 21.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.008Z"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-bold text-slate-800">
        {t("home.connect.title")}
      </h3>
      <p className="mb-2 text-slate-500">{t("home.connect.desc")}</p>
      <Connectdevice refetch={refetch} className="mt-4" />
    </div>
  );
};

const QuickActionCard = ({ to, icon: Icon, title, subtitle }) => (
  <Link
    to={to}
    className="group block rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
        <Icon className="h-6 w-6 text-green-700" />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 group-hover:text-green-700">
          {title}
        </h4>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  </Link>
);

// The main Home component
const Home = () => {
  const { t } = useTranslation();
  const { user } = userAuthStore();
  const [weather, setWeather] = useState(null);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  const refetchWeather = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Lalitpur&units=metric&appid=5e0c4d7564f485afbd09ea6e9b55adb4"
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather:", error));
  };

  useEffect(() => {
    refetchWeather();
  }, []);

  useEffect(() => {
    setIsDeviceConnected(!!user?.devices && user.devices.length > 0);
  }, [user]);

  const handleDeviceConnect = () => setIsDeviceConnected(true);
  const handleDeviceDisconnect = () => setIsDeviceConnected(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto space-y-8 p-4 py-8 md:space-y-12 md:p-6 lg:p-8">
        {/* --- Greeting & Weather Card --- */}
        <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-700 p-6 text-white shadow-lg md:p-8">
          <h1 className="text-3xl font-bold lg:text-4xl ">
            {getGreeting(t)},{" "}
            <a className="capitalize">{user?.username || t("home.farmer")}!</a>
          </h1>
          <p className="opacity-90">{t("home.outlook")}</p>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Weather Info */}
            <div>
              <p className="text-sm font-semibold uppercase opacity-80">
                {weather ? weather.city.name : t("home.loading")}
              </p>
              <p className="text-5xl font-bold lg:text-5xl">
                {weather ? `${Math.round(weather.list[0].main.temp)}°C` : "..."}
              </p>
              <p className="capitalize">
                {weather ? weather.list[0].weather[0].description : "..."}
              </p>
            </div>
            {/* Forecast */}
            <div className="flex w-full gap-2 overflow-x-auto pb-2 sm:w-auto sm:justify-end">
              {weather?.list.slice(1, 6).map((entry, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-lg bg-white/20 py-2 px-5 text-center text-sm backdrop-blur-xs"
                >
                  <p className="font-semibold">
                    {new Date(entry.dt_txt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </p>
                  <CloudIcon className="mx-auto my-1 h-8 w-8 opacity-90" />
                  <p>{Math.round(entry.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Live Farm Status --- */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 lg:text-3xl">
            {t("home.liveStatus")}
          </h2>
          <div className="mt-4">
            {isDeviceConnected ? (
              <SensorData onDisconnect={handleDeviceDisconnect} />
            ) : (
              <ConnectDevicePromptComponent refetch={handleDeviceConnect} />
            )}
          </div>
        </section>

        {/* --- Quick Actions Grid --- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            to="/service/diseaseidentifier"
            icon={ShieldExclamationIcon}
            title={t("home.quickActions.disease")}
            subtitle={t("home.quickActions.diseaseSub")}
          />
          <QuickActionCard
            to="/marketplace"
            icon={BuildingStorefrontIcon}
            title={t("navigation.marketplace")}
            subtitle={t("home.quickActions.marketSub")}
          />
          <QuickActionCard
            to="/community"
            icon={UsersIcon}
            title={t("navigation.community")}
            subtitle={t("home.quickActions.communitySub")}
          />
        </div>

        {/* --- "Farming Wisdom" Promotional Banner --- */}
        <div className="relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-lg md:flex-row">
          <div className="flex flex-col justify-center p-8 md:w-2/3 md:p-12">
            <div>
              <h3 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                {t("home.wisdom.title")}
              </h3>
              <p className="mt-4 max-w-lg opacity-90">
                {t("home.wisdom.desc")}
              </p>
            </div>
            <Link
              to="/community"
              className="mt-6 inline-block w-full rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-800 transition hover:bg-slate-200 sm:w-auto"
            >
              {t("home.wisdom.button")}
            </Link>
          </div>
          <div className="relative h-48 md:h-auto md:w-1/3">
            <img
              src="/images/farmer.png"
              className="absolute bottom-0 right-0 h-full w-auto max-w-[80%] object-contain object-bottom md:max-w-none"
              alt="Farmer"
            />
          </div>
        </div>

        {/* --- News Section --- */}
        <section className="">
          <News />
        </section>
      </main>
    </div>
  );
};

export default Home;
