import { useEffect, useState } from "react";

const Dashboard = () => {
  const [farmData, setFarmData] = useState({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    lightIntensity: 0,
  });

  useEffect(() => {
    // Simulating data fetching from sensors
    const fetchData = () => {
      setFarmData({
        temperature: (Math.random() * 10 + 20).toFixed(1),
        humidity: (Math.random() * 30 + 50).toFixed(1),
        soilMoisture: (Math.random() * 40 + 20).toFixed(1),
        lightIntensity: (Math.random() * 500 + 300).toFixed(1),
      });
    };

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        🌾 Farm Monitoring Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(farmData).map(([key, value]) => (
          <div
            key={key}
            className="bg-blue-400 p-6 rounded-xl shadow-md flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold capitalize text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}
            </h3>
            <p className="text-2xl font-bold text-blue-700 mt-2">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
