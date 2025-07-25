import { NavLink } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UsersIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const BottomNavigation = () => {
  const { user } = userAuthStore();

  const navLinkClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${
      isActive ? "text-green-600" : "text-slate-500 hover:text-green-600"
    }`;

  return (
    <footer className="fixed bottom-0 left-0 z-40 block w-full border-t border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around">
        <NavLink to="/chat" className={navLinkClasses}>
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Chat</span>
        </NavLink>

        <NavLink to="/community" className={navLinkClasses}>
          <UsersIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Community</span>
        </NavLink>

        <NavLink to="/" className={navLinkClasses}>
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <NavLink to="/marketplace" className={navLinkClasses}>
          <BuildingStorefrontIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Market</span>
        </NavLink>

        <NavLink to="/profile" className={navLinkClasses}>
          <div
            className="h-7 w-7 rounded-full bg-slate-200 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                user?.avatar ||
                "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              })`,
            }}
          />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default BottomNavigation;