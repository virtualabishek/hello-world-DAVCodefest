
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Flame, ShieldAlert, Wind, CloudLightning } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { userAuthStore } from "../store/authStore";
import axios from "axios"
import { TiWeatherCloudy } from "react-icons/ti";
const SensorData = ({ refetch }) => {
    const [sensorData, setSensorData] = useState({
        humidity: 0,
        moisture: 0,
        waterLevel: 0,
        fireAlert: false,
        securityBreach: false,
        smokeAlert: false,
        // weatherAlert: false,
        // flameAlert: false,
    });
    const [humidityint, setHumidityInt] = useState()
    const [weatherAlert, setweatherAlert] = useState({})
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const { deviceLogout } = userAuthStore();
    console.log("weatherAlert", weatherAlert)


        
    useEffect(() => {
        const fetchHumidity = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:7180/user/weather"
                );

                console.log("Full API Response:", response.data);
                //  const humiditymain = response.data.data.list[0]?.main?.humidity ;
                //   console.log("humiditymain",humiditymain)

                // Ensure data exists before extracting humidity
                if (response.data.data?.list?.length > 0) {
                    const humidity = response.data.data.list[0]?.main?.humidity ?? 80;

                    setHumidityInt(humidity);
                    const weather = response.data.data.list[0]?.weather[0] ?? 80;


                    setweatherAlert(weather)
                    console.log("Extracted Humidity:", humidity);
                } else {
                    console.error("Humidity data not found in response");
                }
            } catch (error) {
                console.error("Error fetching humidity:", error);
            }
        };

        fetchHumidity(); // Call the async function
    }, []);

    // Log the updated state value
    useEffect(() => {
        console.log("Updated Humidity State:", humidityint);
    }, [humidityint]);






    //end
    useEffect(() => {
        const socket = io("http://localhost:7180", {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socket.on("connect", () => {
            setConnectionStatus('Connected');
            console.log("Connected to WebSocket");
        });

        socket.on("disconnect", () => {
            setConnectionStatus('Disconnected');
            console.log("Socket Disconnected");
        });

        socket.on("connect_error", () => {
            setConnectionStatus('Connection Error');
            console.log("Connection error");
        });

        // Listening for sensor data
        const sensorEvents = {
            "pir_data": (value) => setSensorData((prev) => ({ ...prev, securityBreach: value })),
            "soil_moisture_data": (value) => setSensorData((prev) => ({ ...prev, moisture: value })),
            "water_level_data": (value) => setSensorData((prev) => ({ ...prev, waterLevel: value })),
            "fire_data": (value) => setSensorData((prev) => ({ ...prev, fireAlert: value })),
            "gas_data": (value) => setSensorData((prev) => ({ ...prev, smokeAlert: value })),
            // "weather_alert_data": (value) => setSensorData((prev) => ({ ...prev, weatherAlert: value })),
            // "flame_data": (value) => setSensorData((prev) => ({ ...prev, flameAlert: value })),
        };

        Object.keys(sensorEvents).forEach((event) => {
            socket.on(event, (data) => {
                console.log(`Received ${event}:`, data);
                sensorEvents[event](data.value);
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="p-4 bg-white text-gray-900 rounded-lg shadow-lg max-w-xl mx-auto md:max-w-2xl lg:max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Farm Monitoring</h2>
                <button
                    onClick={deviceLogout}
                    onCLick={() => refetch()}
                    className="bg-red-700 px-4 py-2 rounded-lg text-white text-sm font-semibold">
                    Disconnect Device
                </button>
            </div>
            <p className="mb-4">Status: {connectionStatus}</p>

            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-200 rounded-lg p-7">
                {[
                    { label: "Water Level", value: ((sensorData.waterLevel / 622) * 100).toFixed(2) },

                    { label: "Moisture", value: parseFloat((((sensorData.moisture > 3000 ? 0 : sensorData.moisture / 1271.0)) * 100).toFixed(2)) },

                    { label: "Humidity", value: humidityint || 80 }
                ].map((sensor, index) => (
                    <div key={index} className="bg-white p-1 rounded-lg text-center shadow relative w-24 h-24 md:w-28 md:h-28">
                        <CircularProgressbar
                            value={sensor.value}
                            text={`${sensor.value}`}
                            styles={buildStyles({
                                textSize: "12px",
                                pathColor: "#3b82f6",
                                textColor: "#111827",
                                trailColor: "#e5e7eb"
                            })}
                        />
                        <p className="text-sm text-gray-600 mt-1">{sensor.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-15     mt-6 ">
                {[{
                    label: "Fire Alert",
                    active: sensorData.fireAlert,
                    icon: <Flame className="text-red-600" size={24} />
                }, {
                    label: "Security Breach",
                    active: sensorData.securityBreach,
                    icon: <ShieldAlert className="text-yellow-600" size={24} />
                }, {
                    label: "Smoke Alert",
                    active: sensorData.smokeAlert,
                    icon: <Wind className="text-gray-600" size={24} />
                },
                    // {
                    //     label: "Weather Alert",
                    //     active: sensorData.weatherAlert,
                    //     icon: <CloudLightning className="text-blue-600" size={24} />
                    // },
                    // {
                    //     label: "Flame Alert",
                    //     active: sensorData.flameAlert,
                    //     icon: <Flame className="text-orange-600" size={24} />
                    // }
                ].map((sensor, index) => (
                    <div key={index} className={`p-4 rounded-lg flex flex-col text-center justify-center    ${sensor.active ? 'bg-red-100 border border-red-400' : 'bg-gray-100'}`}>
                        <p className="flex justify-center">  {sensor.icon} </p>
                        <p className="text-sm font-semibold mt-2">{sensor.label}</p>
                        <p className={`text-sm md:text-lg font-bold ${sensor.active ? 'text-red-600' : 'text-gray-600'}`}>
                            {sensor.active ? "Active" : "Normal"}
                        </p>
                    </div>

                ))}
                <div className={"p-4 rounded-lg flex flex-col text-center justify-center bg-gray-100  "}>
                    <p className="flex justify-center">  <TiWeatherCloudy className="text-blue-600" size={24} /></p>
                    <p className="text-sm font-semibold mt-2">{weatherAlert.main}   {console.log("weather alreat main ", weatherAlert.main)} </p>
                    <p className="text-sm md:text-lg font-bold  text-nowrap">
                        {weatherAlert.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SensorData;
