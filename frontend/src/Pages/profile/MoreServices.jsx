import { Link } from "react-router-dom";
import {
  ComputerDesktopIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  SparklesIcon,
  CameraIcon,
  ShieldExclamationIcon,
  SignalIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

export default function MoreServices({ user }) {
  const services = [
    { name: "Farm Monitor", Icon: ComputerDesktopIcon, link: `/devicesetting/${user?.devices}` },
    { name: "Friends Chat", Icon: ChatBubbleLeftRightIcon, link: "/chatting" },
    { name: "Expert Chat", Icon: AcademicCapIcon, link: "/chat/expert" },
    { name: "AI Helper", Icon: SparklesIcon, link: "/chat/ai" },
    { name: "Plant ID", Icon: CameraIcon, link: "/service/plantidentifier" },
    { name: "Disease ID", Icon: ShieldExclamationIcon, link: "/service/diseaseidentifier" },
    { name: "Live Sensor", Icon: SignalIcon, link: `/devicesetting/${user?.devices}` },
    { name: "Loan Form", Icon: BanknotesIcon, link: "/services/loan-form" },
    { name: "Subsidy Info", Icon: CurrencyDollarIcon, link: "/services/subsidy" },
    { name: "Device Setup", Icon: Cog6ToothIcon, link: `/devicesetting/${user?.devices}` },
    { name: "My Purchases", Icon: ShoppingCartIcon, link: "/profile/purchases" },
    { name: "News Feed", Icon: NewspaperIcon, link: "/news" },
  ];

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg sm:p-6">
      <h3 className="px-2 text-lg font-bold text-slate-800">Your Services</h3>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
        {services.map((service, idx) => (
          <Link
            to={service.link}
            key={idx}
            className="group flex flex-col items-center rounded-lg p-2 text-center transition-colors duration-200 hover:bg-slate-100"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200">
              <service.Icon className="h-6 w-6 text-green-700" />
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-600">
              {service.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}