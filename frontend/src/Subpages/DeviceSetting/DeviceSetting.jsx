import React, { useState } from 'react';

const sensors = [
    {
        icon: "https://img.icons8.com/?size=100&id=ebhYZuRS01Tm&format=png&color=000000",
        name: "Water Level Sensor",
    },
    {
        icon: "https://img.icons8.com/?size=100&id=auyw7PbehiKM&format=png&color=000000",
        name: "Soil Moisture Sensor",
    },
    {
        icon: "https://img.icons8.com/?size=100&id=zD-VLZTPKlpb&format=png&color=000000",
        name: "Fire Alert Sensor",
    },
    {
        icon: "https://img.icons8.com/?size=100&id=sywI4C9b9kIg&format=png&color=000000",
        name: "Security Breach Sensor",
    },
    {
        icon: "https://img.icons8.com/?size=100&id=1FI1LBZjjT7U&format=png&color=000000",
        name: "Smoke Alert Sensor",
    }, {
        icon: "https://img.icons8.com/?size=100&id=CyykfBbRJdlk&format=png&color=000000",
        name: "Camera Surveillance",
    },

    { icon: "https://img.icons8.com/?size=100&id=deuhxm4eQhCV&format=png&color=000000", name: "living presense" },

    
];

const DeviceSetting = () => {
    const [sensorStates, setSensorStates] = useState({
        "Water Level Sensor": true,
        "Soil Moisture Sensor": true,
        "Fire Alert Sensor": false,
        "Security Breach Sensor": true,
        "Smoke Alert Sensor": false,
        "Camera Surveillance": true,
        "living presense": true,
    });

    const toggleSensor = (name) => {
        setSensorStates((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-center">Sensor Control Panel</h1>
            <div className="w-full max-w-md space-y-4">
                {sensors.map((sensor) => (
                    <div
                        key={sensor.name}
                        className="flex items-center justify-between bg-white px-5 py-4 rounded-xl shadow"
                    >
                        <div className="flex items-center gap-3">
                            <img src={sensor.icon} alt={sensor.name} className="w-6 h-6" />
                            <span className="text-lg font-medium">{sensor.name}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={sensorStates[sensor.name]}
                                onChange={() => toggleSensor(sensor.name)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceSetting;
