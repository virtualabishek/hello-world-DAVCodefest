import { NavLink } from "react-router-dom";
import {
  SparklesIcon,
  ArchiveBoxIcon,
  HomeIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${
      isActive ? "text-green-600" : "text-slate-500 hover:text-green-600"
    }`;

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full border-t border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around">
        <NavLink to="/ai" className={navLinkClasses}>
          <SparklesIcon className="h-6 w-6" />
          <span className="text-xs font-medium">AI Helper</span>
        </NavLink>

        <NavLink to="/inventory" className={navLinkClasses}>
          <ArchiveBoxIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Inventory</span>
        </NavLink>

        <NavLink to="/" className={navLinkClasses}>
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <NavLink to="/community" className={navLinkClasses}>
          <UsersIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Community</span>
        </NavLink>

        <NavLink to="/profile" className={navLinkClasses}>
          <UserCircleIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default Navbar;