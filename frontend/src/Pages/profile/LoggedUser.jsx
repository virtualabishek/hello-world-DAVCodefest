import { userAuthStore } from "../../store/authStore";
import { NavLink, Link } from "react-router-dom";
import MoreServices from "./MoreServices";
import {
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export default function LoggedUser() {
  const { t } = useTranslation();
  const { user, logout } = userAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p>{t("profile.loading", "Loading profile...")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">{t("profile.myProfile", "My Profile")}</h1>
          <Link
            to="/chatting"
            aria-label={t("profile.messages", "Messages")}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-green-600"
          >
            <ChatBubbleLeftRightIcon className="h-7 w-7" />
          </Link>
        </header>

        <div className="relative mt-8 rounded-xl bg-white shadow-lg">
          <div className="h-24 rounded-t-xl bg-green-600 bg-gradient-to-r from-green-500 to-green-700"></div>
          <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <img
              src={user.avatar}
              alt={t("profile.avatarAlt", "Profile")}
              className="h-24 w-24 rounded-full border-4 border-white bg-slate-200 object-cover shadow-md"
            />
          </div>
          <div className="px-6 pb-6 pt-16 text-center">
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {user.isVerified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  <CheckBadgeIcon className="-ml-0.5 h-5 w-5" />
                  {t("profile.verified", "Verified")}
                </span>
              ) : (
                <NavLink
                  to="/verify-otp"
                  className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
                >
                  {t("profile.verifyNow", "Verify Now")}
                </NavLink>
              )}
              <Link
                to={`/profile/${user._id}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
              >
                <PencilSquareIcon className="-ml-0.5 h-5 w-5" />
                {t("profile.editProfile", "Edit Profile")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <MoreServices user={user} />
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="px-2 text-sm font-semibold text-slate-500">
            {t("profile.settingsSupport", "Settings & Support")}
          </h3>
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex flex-col divide-y divide-slate-200">
              <Link
                to="/about"
                className="flex items-center gap-4 p-4 text-slate-700 transition-colors hover:bg-slate-50"
              >
                <QuestionMarkCircleIcon className="h-6 w-6 text-slate-400" />
                <span className="font-medium">{t("profile.about", "About")}</span>
              </Link>
              <Link
                to="/report-problem"
                className="flex items-center gap-4 p-4 text-slate-700 transition-colors hover:bg-slate-50"
              >
                <ExclamationTriangleIcon className="h-6 w-6 text-slate-400" />
                <span className="font-medium">{t("profile.reportProblem", "Report a Problem")}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-4 p-4 text-left font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                <span>{t("profile.logout", "Log Out")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}