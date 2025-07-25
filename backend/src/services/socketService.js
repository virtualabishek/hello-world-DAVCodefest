
        import http from 'http';
        import { Server as SocketIOServer } from 'socket.io';
        import { WebSocketServer } from 'ws'; 
        import { app } from '../app.js';
        import PIRSensorData from '../models/pirSensor.model.js';
        import SoilMoistureSensorData from '../models/soilMoisturizer.model.js';
        import WaterLevelSensorData from '../models/WaterLevel.model.js';
        import {GasSensor} from "../models/gasSensor.model.js";
    import { FireSensor } from '../models/fireSensor.model.js';
        import { calculatePercentage } from '../utils/percentage.utility.js';

        const setupSocketServer = (server) => {
            const wss = new WebSocketServer({ server });
            const io = new SocketIOServer(server, { cors: { origin: "*" } });
            wss.on('connection', (ws) => {
                console.log('ESP32 WebSocket Connected');

                ws.on('message', async (message) => {
                    try {
                        const data = JSON.parse(message.toString());
                        console.log('Received data from ESP32:', data);
                        const { deviceId, type, value } = data;

                        switch (type) {
                        
                    case 'pir':
                                io.emit('pir_data', data);
                    
                                if (data.value) {
                                    const currentTime = Date.now();
                                    const twoHoursLater = currentTime + 2 * 60 * 60 * 1000; // Current time + 2 hours
                    
                                    const lastEntry = await PIRSensorData.findOne({ deviceId }).sort({ 'readings.timestamp': -1 });
                    
                                    if (!lastEntry || lastEntry.nextAllowedSaveTime <= currentTime) {
                                        const pirData = await PIRSensorData.findOneAndUpdate(
                                            { deviceId },
                                            { 
                                                $push: { readings: { detected: data.value, timestamp: currentTime } },
                                                nextAllowedSaveTime: twoHoursLater // Store the next allowed save time
                                            },
                                            { upsert: true, new: true }
                                        );
                                    }
                                }
                                break;

                    case 'soil':
                          
                                io.emit('soil_moisture_data', data);
                                break;
                    case 'water_level':
                                    io.emit('water_level_data', data);

                                    if (Number(data.value) > 900) {
                                        const currentTime = new Date();
                                        const fiveHoursAgo = new Date(currentTime.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago
                        
                                        // Find the latest water level entry
                                        const lastRecord = await WaterLevelSensorData.findOne(
                                            { deviceId },
                                            { "readings.timestamp": 1 } // Fetch only timestamps for efficiency
                                        ).sort({ "readings.timestamp": -1 });
                        
                                        if (!lastRecord || lastRecord.readings.length === 0 || lastRecord.readings[lastRecord.readings.length - 1].timestamp < fiveHoursAgo) {
                                            // Save water level only if last save was more than 5 hours ago
                                            await WaterLevelSensorData.findOneAndUpdate(
                                                { deviceId },
                                                { $push: { readings: { level: Number(value), timestamp: currentTime } } },
                                                { upsert: true, new: true }
                                            );
                                            console.log("💧 Water level recorded.");
                                        } else {
                                            console.log("⏳ Water level ignored (less than 5 hours since last save).");
                                        }
                                    }
                                    break;

                    case 'fire':
                                    console.log("🔥 Fire detected");
                                    io.emit('fire_data', data);
                        
                                    if (data.value) {
                                        const currentTime = new Date();
                                        const fiveHoursAgo = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000); // 5 hours ago
                        
                                        // Find the latest fire detection entry
                                        const lastRecord = await FireSensor.findOne(
                                            { deviceId },
                                            { "readings.timestamp": 1 } // Only fetch timestamps for efficiency
                                        ).sort({ "readings.timestamp": -1 });
                        
                                        if (!lastRecord || lastRecord.readings.length === 0 || lastRecord.readings[lastRecord.readings.length - 1].timestamp < fiveHoursAgo) {
                                            // Save fire detection only if last save was more than 5 hours ago
                                            await FireSensor.findOneAndUpdate(
                                                { deviceId },
                                                { $push: { readings: { fireDetected: value, timestamp: currentTime } } },
                                                { upsert: true, new: true }
                                            );
                                            console.log("🔥 Fire detected and saved.");
                                        } else {
                                            console.log("⏳ Fire detection ignored (less than 5 hours since last save).");
                                        }
                                    }
                                    break;

                    case 'gas':
                        io.emit('gas_data', data);
            
                        if (data.value) {
                            const currentTime = new Date();
                            const fiveHoursAgo = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000); // 5 hours ago
            
                            // Find the latest gas detection entry
                            const lastRecord = await GasSensor.findOne(
                                { deviceId },
                                { "readings.timestamp": 1 } // Only fetch timestamps for efficiency
                            ).sort({ "readings.timestamp": -1 });
            
                            if (!lastRecord || lastRecord.readings.length === 0 || lastRecord.readings[lastRecord.readings.length - 1].timestamp < fiveHoursAgo) {
                                // Save gas detection only if last save was more than 5 hours ago
                                await GasSensor.findOneAndUpdate(
                                    { deviceId },
                                    { $push: { readings: { gasDetected: value, timestamp: currentTime } } },
                                    { upsert: true, new: true }
                                );
                                console.log("💨 Gas detected and saved.");
                            } else {
                                console.log("⏳ Gas detection ignored (less than 5 hours since last save).");
                            }
                        }
                        break;

                            // case 'flame':
                                const flameSensor = await FireSensor.findOneAndUpdate(
                                    { deviceId },
                                    { $push: { readings: { flameDetected: value } } },
                                    { upsert: true, new: true }
                                );
                                // console.log(flameSensor);
                                io.emit('flame_data', data);
                                break;
                    default:

                                console.log('Unknown sensor type:', type);
                        }
                    } catch (error) {
                        console.error('Error processing ESP32 data:', error);
                    }
                });

                ws.on('close', () => {
                    console.log('ESP32 WebSocket Disconnected');
                });
            });

            // ✅ Handle Socket.IO (React Client)
            io.on('connection', (socket) => {
                console.log('React Client Connected via Socket.IO');

                socket.on('disconnect', () => {
                    console.log('React Client Disconnected');
                });
            });
        };

// const setupSocketServer = (server) => {
            
//     const wss = new WebSocketServer({ server });
//     const io = new SocketIOServer(server, { cors: { origin: "*" } });

//     wss.on("connection", (ws) => {
//         console.log("ESP32 WebSocket Connected");
//         ws.on('message', async (message) => {
//             try {

//                 const data = JSON.parse(message.toString());
//                 console.log('Received data from ESP32:', data);
//                 const { deviceId, type, value } = data;

//                 switch (type) {
//                     case "fire":

//                         console.log("🔥 Fire detected");
//                         console.log("Device ID:", deviceId);
//                         console.log("Value:", value);
//                         io.emit("fire_data", data);


//                 }


                
//             } catch (error) {
//                 console.error('Error processing ESP32 data:', error);
//             }           


//         })

//         ws.on("close", () => {
//             console.log("ESP32 WebSocket Disconnected");
//         })

//     })
 
//     io.on("connection", (socket) => {
//         console.log("React Client Connected via Socket.IO");
//         socket.on("disconnect", () => {
//             console.log("React Client Disconnected");
//         });
//     })


//         }
export { setupSocketServer };
    
    
    
    
