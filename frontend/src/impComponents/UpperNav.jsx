import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userAuthStore } from "../store/authStore";
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UsersIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import LanguageSwitcher from "./LanguageSwitcher";

const UpperNavigation = ({ unreadNotifications }) => {
  const { user } = userAuthStore();
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 z-40 w-full items-center border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Home">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-12" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/marketplace" className={({isActive}) => `flex items-center gap-2 text-base font-medium transition-colors ${isActive ? "text-green-600" : "text-slate-700 hover:text-green-600"}`}>
              <BuildingStorefrontIcon className="h-6 w-6" />
              <span>{t('navigation.marketplace')}</span>
            </NavLink>
            <NavLink to="/community" className={({isActive}) => `flex items-center gap-2 text-base font-medium transition-colors ${isActive ? "text-green-600" : "text-slate-700 hover:text-green-600"}`}>
              <UsersIcon className="h-6 w-6" />
              <span>{t('navigation.community')}</span>
            </NavLink>
            <NavLink to="/chat" className={({isActive}) => `flex items-center gap-2 text-base font-medium transition-colors ${isActive ? "text-green-600" : "text-slate-700 hover:text-green-600"}`}>
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
              <span>{t('navigation.chat')}</span>
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link to={`/notification/${user?._id}`} className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-green-600" aria-label="Notifications">
            <BellIcon className="h-7 w-7" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </Link>

          <Link to="/profile" aria-label="Profile">
            <div className="h-11 w-11 rounded-full bg-slate-200 bg-cover bg-center ring-2 ring-transparent transition-all hover:ring-green-600"
              style={{
                backgroundImage: `url(${ user?.avatar || "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"})`,
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UpperNavigation;