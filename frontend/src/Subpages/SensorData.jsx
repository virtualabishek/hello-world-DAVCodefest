import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { userAuthStore } from "../store/authStore";
import axios from "axios";
import {
  FireIcon,
  ShieldExclamationIcon,
  CloudIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { WiHumidity, WiRaindrop, WiThermometer } from "weather-icons-react"; // A good icon library for this

const SensorGauge = ({ value, label, icon: Icon }) => {
    let color = "#3b82f6"; // Blue
    if (label === "Moisture") color = "#a5b4fc"; // Indigo
    if (label === "Humidity") color = "#60a5fa"; 

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28">
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    strokeWidth={8}
                    styles={buildStyles({
                        textSize: "20px",
                        pathColor: color,
                        textColor: "#1e293b", // slate-800
                        trailColor: "#e2e8f0" // slate-200
                    })}
                />
            </div>
             <p className="text-sm font-semibold text-slate-600 mt-2">{label}</p>
        </div>
    )
};

const AlertBox = ({ label, active, icon: Icon }) => (
    <div className={`rounded-lg p-3 text-center transition-colors ${
        active ? 'bg-red-100 border border-red-300' : 'bg-slate-100'
    }`}>
        <Icon className={`h-7 w-7 mx-auto ${active ? 'text-red-600' : 'text-slate-500'}`} />
        <p className="mt-1 text-xs font-bold">{label}</p>
        <p className={`text-sm font-semibold ${active ? 'text-red-700' : 'text-slate-600'}`}>
            {active ? "Alert!" : "Normal"}
        </p>
    </div>
);


const SensorData = ({ onDisconnect }) => {
    const [sensorData, setSensorData] = useState({ moisture: 0, waterLevel: 0, fireAlert: false, securityBreach: false, smokeAlert: false });
    const [weather, setWeather] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const { deviceLogout } = userAuthStore();
    const socketRef = useRef(null); 

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get("http://localhost:7180/user/weather");
                if (response.data.data?.list?.length > 0) {
                    setWeather(response.data.data.list[0]);
                }
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        };
        fetchWeather();
    }, []);

    useEffect(() => {
        const socket = io("http://localhost:7180", { reconnection: true });
        socketRef.current = socket; 

        socket.on("connect", () => setConnectionStatus('Connected'));
        socket.on("disconnect", () => setConnectionStatus('Disconnected'));
        socket.on("connect_error", () => setConnectionStatus('Connection Error'));

        const events = {
            "pir_data": "securityBreach", "soil_moisture_data": "moisture",
            "water_level_data": "waterLevel", "fire_data": "fireAlert", "gas_data": "smokeAlert"
        };

        for (const [event, key] of Object.entries(events)) {
            socket.on(event, (data) => setSensorData(prev => ({ ...prev, [key]: data.value })));
        }
        return () => socket.disconnect();
    }, []);

    const handleDisconnect = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            setConnectionStatus('Disconnected');
        }
        deviceLogout();
        if (onDisconnect) onDisconnect(); 
    };

    const moistureValue = parseFloat((((sensorData.moisture > 3000 ? 0 : sensorData.moisture / 1271.0)) * 100).toFixed(2));
    const waterLevelValue = parseFloat(((sensorData.waterLevel / 622) * 100).toFixed(2));
    const humidityValue = weather?.main?.humidity || 0;

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                     <p className={`flex items-center gap-2 text-sm font-semibold ${connectionStatus === 'Connected' ? 'text-green-600' : 'text-amber-600'}`}>
                        <span className={`h-2 w-2 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        Device {connectionStatus}
                    </p>
                </div>
                <button
                    onClick={handleDisconnect}
                    className="w-full sm:w-auto rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300"
                >
                    Disconnect
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-slate-200 pt-6 sm:grid-cols-3">
                <SensorGauge value={waterLevelValue} label="Water Level" />
                <SensorGauge value={moistureValue} label="Soil Moisture" />
                <SensorGauge value={humidityValue} label="Air Humidity" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 md:grid-cols-4">
                <AlertBox label="Fire Alert" active={sensorData.fireAlert} icon={FireIcon} />
                <AlertBox label="Security" active={sensorData.securityBreach} icon={ShieldExclamationIcon} />
                <AlertBox label="Smoke" active={sensorData.smokeAlert} icon={CloudIcon} />
                <AlertBox label="Weather" active={false} icon={CpuChipIcon} /> 
            </div>
        </div>
    );
};

export default SensorData;