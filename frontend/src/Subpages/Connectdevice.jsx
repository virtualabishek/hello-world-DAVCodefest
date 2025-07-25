import React, { useState } from "react";
// import { userAuthStore } from "../store/authStore"; // Import your Zustand store
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Connectdevice = ({ refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [deviceNo, setDeviceNo] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const navigate = useNavigate();

  const { deviceLogin, isLoading, error, user } = userAuthStore(); // Zustand store
  const userId = user ? user._id : null;
  const handleConnectButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await deviceLogin(deviceNo, deviceCode, userId);
      console.log("Device login success:", response);
      refetch()
      // navigate("/news", { state: { refresh: Date.now() } });

      // Toaster.success("device login successful")
      // navigate("/");


    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Device login failed"));
    }
    setShowForm(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <div className="flex justify-center w-full">
        <button
          onClick={handleConnectButtonClick}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          {showForm ? "Cancel" : "Connect Device"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-6">
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="deviceNo" className="block text-sm font-semibold text-gray-700">
                  Device No:
                </label>
                <input
                  type="text"
                  id="deviceNo"
                  value={deviceNo}
                  onChange={(e) => setDeviceNo(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="deviceCode" className="block text-sm font-semibold text-gray-700">
                  Device Code:
                </label>
                <input
                  type="text"
                  id="deviceCode"
                  value={deviceCode}
                  onChange={(e) => setDeviceCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button

                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {isLoading ? "Connecting..." : "Connect"}
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connectdevice;
