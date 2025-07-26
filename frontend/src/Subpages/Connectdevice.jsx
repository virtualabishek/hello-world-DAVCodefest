import React, { useState } from "react";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { DevicePhoneMobileIcon, KeyIcon } from "@heroicons/react/24/outline";

const Connectdevice = ({ refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [deviceNo, setDeviceNo] = useState("");
  const [deviceCode, setDeviceCode] = useState("");

  const { deviceLogin, isLoading, user } = userAuthStore();
  const userId = user?._id;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to connect a device.");
      return;
    }
    try {
      await deviceLogin(deviceNo, deviceCode, userId);
      toast.success("Device connected successfully!");
      if (refetch) refetch();
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Device login failed");
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-600 to-green-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:from-green-700 hover:to-green-600"
      >
        <DevicePhoneMobileIcon className="h-6 w-6" />
        Connect Device Now
      </button>
    );
  }

  return (
    
    <div className="w-full max-w-sm mx-auto mt-2 rounded-2xl bg-white border border-slate-200 p-8 shadow-xl">
        
      <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <DevicePhoneMobileIcon className="h-7 w-7 text-green-600" />
        Connect Your Device
      </h2>
      <p className="mb-6 text-slate-500 text-sm">
        Enter your device number and code to connect your farm device and start
        receiving live data.
      </p>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="deviceNo"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Device Number
          </label>
          <div className="relative">
            <DevicePhoneMobileIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              id="deviceNo"
              value={deviceNo}
              onChange={(e) => setDeviceNo(e.target.value)}
              required
              placeholder="e.g. 123456"
              className="pl-10 pr-3 py-2 w-full rounded-lg border border-slate-300 focus:border-green-500 focus:ring-green-500 text-base shadow-sm transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="deviceCode"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Device Code
          </label>
          <div className="relative">
            <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              id="deviceCode"
              value={deviceCode}
              onChange={(e) => setDeviceCode(e.target.value)}
              required
              placeholder="e.g. ABCD1234"
              className="pl-10 pr-3 py-2 w-full rounded-lg border border-slate-300 focus:border-green-500 focus:ring-green-500 text-base shadow-sm transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-lg bg-gradient-to-br from-green-600 to-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-green-700 hover:to-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connecting..." : "Connect"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connectdevice;