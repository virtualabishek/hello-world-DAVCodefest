import React, { useState } from "react";
import { userAuthStore } from "../store/authStore";
import toast from 'react-hot-toast';

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
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
        >
            Connect Device Now
        </button>
      )
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg bg-slate-50 border border-slate-200 p-6">
        <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
            <label htmlFor="deviceNo" className="block text-sm font-medium text-slate-700">
                Device Number
            </label>
            <input
                type="text"
                id="deviceNo"
                value={deviceNo}
                onChange={(e) => setDeviceNo(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
            </div>

            <div>
            <label htmlFor="deviceCode" className="block text-sm font-medium text-slate-700">
                Device Code
            </label>
            <input
                type="text"
                id="deviceCode"
                value={deviceCode}
                onChange={(e) => setDeviceCode(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-slate-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
            </div>
            
            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Connecting..." : "Connect"}
                </button>
                 <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
  );
};

export default Connectdevice;