import axios from "axios";
import { FireSensor } from "../models/fireSensor.model.js";
import { GasSensor } from "../models/gasSensor.model.js";
import IoTDevice from "../models/iotDevice.model.js";
import PIRSensorData from "../models/pirSensor.model.js";
import SoilMoistureSensorData from "../models/soilMoisturizer.model.js";
import User from "../models/user.model.js";
import WaterLevelSensorData from "../models/waterLevel.model.js";

export const handleWaterLevel = async (req, res) => {
  const { deviceId, level } = req.body; // Get deviceId and water level from request body
  console.log(
    "water level-------------------------------------------------------------",
    req.body
  );
  if (!deviceId || level === undefined) {
    return res
      .status(400)
      .json({ message: "Device ID and Water Level are required" });
  }

  try {
    // Find the existing water level data for the deviceId
    let sensorData = await WaterLevelSensorData.findOne({ deviceId });

    if (!sensorData) {
      // If no data exists for this device, create a new document
      sensorData = new WaterLevelSensorData({
        deviceId,
        readings: [{ level }],
      });
    } else {
      // If data exists, just add a new reading to the existing readings array
      sensorData.readings.push({ level });
    }

    // Save the updated (or new) sensor data
    await sensorData.save();

    // Respond with success message
    res.status(200).json({
      message: "Water level reading successfully stored!",
      data: sensorData,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error storing water level data" });
  }
};

export const deviceLogin = async (req, res) => {
  console.log("working");

  const { deviceId, deviceCode, userId } = req.body; // deviceCode is received but not used
  console.log(req.body);
  try {
    const device = await IoTDevice.findOne({ deviceId });

    if (!device) {
      return res
        .status(400)
        .json({ success: false, message: "No device found" });
    }

    // const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user's device field with the found device's _id
    user.devices = device._id;
    await user.save();
    console.log("liked user", user);
    return res
      .status(200)
      .json({ success: true, message: "Device found and linked to user" });
  } catch (error) {
    console.error("Error during device login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deviceLogout = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from JWT middleware

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Set devices field to null
    user.devices = null;
    await user.save();
    console.log(user);
    return res
      .status(200)
      .json({ success: true, message: "Device removed successfully" });
  } catch (error) {
    console.error("Error removing user device:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const handleSoilMoisture = async (req, res) => {
  console.log("soil moisture", req.body);
  console.log(
    "soil-------------------------------------------------------------",
    req.body
  );

  const { deviceId, moistureLevel } = req.body; // Get device ID and moisture level from the request body
  if (!deviceId || moistureLevel === undefined) {
    return res
      .status(400)
      .json({ message: "Device ID and Moisture Level are required" });
  }

  try {
    // Find the existing soil moisture data for the deviceId
    let sensorData = await SoilMoistureSensorData.findOne({ deviceId });

    if (!sensorData) {
      // If no data exists for this device, create a new document
      sensorData = new SoilMoistureSensorData({
        deviceId,
        readings: [{ moistureLevel }],
      });
    } else {
      // If data exists, just add a new reading to the existing readings array
      sensorData.readings.push({ moistureLevel });
    }

    // Save the updated (or new) sensor data
    await sensorData.save();

    // Respond with success message
    res.status(201).json({
      message: "Soil moisture reading successfully stored!",
      data: sensorData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing soil moisture data" });
  }
};

export const handlePIRSensor = async (req, res) => {
  try {
    // Extract the PIR sensor data from the request body
    const { deviceId, detected } = req.body;
    console.log(
      "pir -------------------------------------------------------------",
      req.body
    );

    console.log("device id", deviceId, "detected", detected);

    // Validate input
    if (!deviceId || detected === undefined) {
      return res
        .status(400)
        .json({ message: "DeviceId and detected status are required" });
    }

    // Find existing PIR sensor data for the deviceId
    let pirData = await PIRSensorData.findOne({ deviceId });

    if (!pirData) {
      // If no data exists, create a new document
      pirData = new PIRSensorData({
        deviceId, // Link the data to the device
        readings: [
          {
            detected, // Motion detection status (true or false)
            timestamp: new Date(), // Store the current timestamp
          },
        ],
      });
    } else {
      // If data exists, just add a new reading to the existing readings array
      pirData.readings.push({
        detected,
        timestamp: new Date(),
      });
    }

    // Save the updated (or new) PIR sensor data
    await pirData.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "PIR sensor data saved successfully", pirData });
  } catch (error) {
    console.error("Error saving PIR sensor data:", error);
    res.status(500).json({ message: "Failed to save PIR sensor data" });
  }
};

export const handleFireSensor = async (req, res) => {
  try {
    const { deviceId, flameDetected } = req.body; // Extract data from form-data
    console.log(
      " fire-------------------------------------------------------------",
      req.body
    );

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required" });
    }

    const fireSensor = await FireSensor.findOneAndUpdate(
      { deviceId },
      { $push: { readings: { fireDetected: flameDetected === "true" } } },
      { upsert: true, new: true }
    );

    res
      .status(201)
      .json({ message: "Flame sensor data saved", data: fireSensor });
  } catch (error) {
    console.error("Error saving flame sensor data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const handleGasSensor = async (req, res) => {
  try {
    const { deviceId, gasDetected } = req.body; // Extract data from form-data
    console.log(
      "gas level-------------------------------------------------------------",
      req.body
    );

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required" });
    }

    const gasSensor = await GasSensor.findOneAndUpdate(
      { deviceId },
      { $push: { readings: { gasDetected: gasDetected === "true" } } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Gas sensor data saved", data: gasSensor });
  } catch (error) {
    console.error("Error saving gas sensor data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const handleInitialStateesp = async (req, res) => {
  try {
    const fire = await FireSensor.findOne().sort({ createdAt: -1 });
    const gas = await GasSensor.findOne().sort({ createdAt: -1 });
    const motion = await PIRSensorData.findOne().sort({ createdAt: -1 });
    const soilMoisture = await SoilMoistureSensorData.findOne().sort({
      createdAt: -1,
    });
    const waterLevel = await WaterLevelSensorData.findOne().sort({
      createdAt: -1,
    });
    console.log(fire);
    console.log(gas);
    res.json({
      fireSensor: fire ? fire.state : null,
      gasSensor: gas ? gas.state : null,
      motionSensor: motion ? motion.state : null,
      soilMoistureSensor: soilMoisture ? soilMoisture.state : null,
      waterLevelSensor: waterLevel ? waterLevel.state : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
};

// Handle getting the latest water level based on the ESP32 ID
export const getLatestWaterLevel = async (req, res) => {
  const { esp32Id } = req.body; // Get the ESP32 device ID from the request body
  console.log(
    "water level-------------------------------------------------------------",
    req.body
  );

  if (!esp32Id) {
    return res.status(400).json({ message: "ESP32 ID is required" });
  }

  try {
    // Find the latest water level reading for the provided device ID
    const latestReading = await WaterLevelSensorData.findOne({
      deviceId: esp32Id,
    })
      .sort({ "readings.timestamp": -1 }) // Sort to get the latest reading
      .select("readings") // Select only the readings field
      .limit(1); // Get the most recent reading

    // Check if data is available
    if (!latestReading) {
      return res
        .status(404)
        .json({ message: "No data found for the given ESP32 ID" });
    }

    // Get the latest water level reading from the most recent record
    const latestWaterLevel = latestReading.readings[0].level;

    // Respond with the latest water level
    res.json({ esp32Id, latestWaterLevel });
  } catch (error) {
    console.error("Error fetching water level:", error);
    res.status(500).json({ message: "Server error, unable to fetch data" });
  }
};

// Initialize the device (register or update)
// export const initESP32 = async (req, res) => {
//   const { deviceId, deviceName, location, userId } = req.body;

//   // Ensure all necessary fields are provided
//   if (!deviceId || !deviceName || !location) {
//     return res.status(400).json({ message: 'Device ID, name, and location are required' });
//   }

//   try {
//     // Check if the device already exists by its deviceId
//     let device = await IoTDevice.findOne({ deviceId });

//     if (device) {
//       // If device exists, update the last known details (location and status)
//       device.deviceName = deviceName;
//       device.location = location;
//       device.userId = userId || null;  // Update user association
//       await device.save();
//       return res.json({ message: 'Device already initialized and updated', device });
//     } else {
//       // If device doesn't exist, create a new device entry
//       device = new IoTDevice({
//         deviceId,
//         deviceName,
//         location,
//         userId,
//       });
//       await device.save();
//       return res.json({ message: 'Device initialized successfully', device });
//     }
//   } catch (error) {
//     console.error('Error initializing device:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// export const initESP32 = async (req, res) => {
//   const { deviceId, deviceName, userId } = req.body;

//   // Ensure all necessary fields are provided
//   if (!deviceId || !deviceName) {
//     return res.status(400).json({ message: 'Device ID and name are required' });
//   }

//   try {
//     // Get the IP address from the incoming request
//     const ipAddress = req.ip || req.connection.remoteAddress;

//     // Use a geolocation API to get the location based on the IP address
//     const locationData = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=${process.env.LOCATIONAPIKEY}`);
//     const location = locationData.data.city || 'Unknown Location';  // Extract city (or default if not available)

//     // Check if the device already exists by its deviceId
//     let device = await IoTDevice.findOne({ deviceId });

//     if (device) {
//       // If device exists, update the last known details (location and status)
//       device.deviceName = deviceName;
//       device.userId = userId || null;  // Update user association
//       device.location = location;
//       await device.save();
//       return res.json({ message: 'Device already initialized and updated', device });
//     } else {
//       // If device doesn't exist, create a new device entry
//       device = new IoTDevice({
//         deviceId,
//         deviceName,
//         location,
//         userId,
//       });
//       await device.save();
//       return res.json({ message: 'Device initialized successfully', device });
//     }
//   } catch (error) {
//     console.error('Error initializing device:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

export const getLatestSensorData = async (req, res) => {
  try {
    const { deviceId } = req.body; // Extract deviceId from request body

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required" });
    }

    // Get the latest PIR sensor data for the given deviceId
    const latestPIRData = await PIRSensorData.findOne({ deviceId })
      .sort({ "readings.timestamp": -1 }) // Sort by the most recent timestamp
      .limit(1); // Get the latest reading

    // Get the latest soil moisture data for the given deviceId
    const latestSoilMoistureData = await SoilMoistureSensorData.findOne({
      deviceId,
    })
      .sort({ "readings.timestamp": -1 }) // Sort by the most recent timestamp
      .limit(1); // Get the latest reading

    // Get the latest water level data for the given deviceId
    const latestWaterLevelData = await WaterLevelSensorData.findOne({
      deviceId,
    })
      .sort({ "readings.timestamp": -1 }) // Sort by the most recent timestamp
      .limit(1); // Get the latest reading

    // Combine the results into one response
    const response = {
      pirSensorData: latestPIRData ? latestPIRData.readings[0] : null,
      soilMoistureData: latestSoilMoistureData
        ? latestSoilMoistureData.readings[0]
        : null,
      waterLevelData: latestWaterLevelData
        ? latestWaterLevelData.readings[0]
        : null,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching sensor data." });
  }
};

export const handleAssignIP = async (req, res) => {
  const { ip, deviceId } = req.body;
  console.log(req.body);
  console.log("ip", ip);
  console.log("deviceId", deviceId);

  if (!ip || !deviceId) {
    return res.status(400).json({ message: "IP and Device ID are required" });
  }

  try {
    // Check if the device exists
    let device = await IoTDevice.findOne({ deviceId });

    if (device) {
      // Device exists, update the IP
      device.ip = ip;
      const newDevice = await device.save(); // Save the updated device
      console.log(`Device updated - ID: ${deviceId}, IP: ${ip}`);

      return res.status(200).json({
        message: "Device IP updated successfully",
        deviceId: device.deviceId,
        ip: device.ip,
        deviceState: newDevice,
      });
    } else {
      // Device doesn't exist, create a new one
      device = new IoTDevice({
        deviceId,
        ip,
        deviceName: "New Device", // You could adjust this according to your needs
        location: "Unknown", // Same here
      });

      const oldDevice = await device.save(); // Save the new device
      console.log(`New device added - ID: ${deviceId}, IP: ${ip}`);

      return res.status(201).json({
        message: "New device created",
        deviceId: device.deviceId,
        ip: device.ip,
        deviceState: oldDevice,
      });
    }
  } catch (error) {
    console.error("Error in device update/create:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const handleIntruderAdvance = async (req, res) => {
  console.log(req.body);
  console.log("intruderData", req.body);
  try {
    if (req.body) {
      res.status(200).json({ sucess: true, message: "data is received" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "data is not received" });
  }
};

export const initESP32 = async (req, res) => {
  const { deviceId, deviceName, userId, password } = req.body;
  console.log(req.ip);
  console.log(req.body);
  // Ensure all necessary fields are provided
  if (!deviceId || !deviceName || !password) {
    return res
      .status(400)
      .json({ message: "Device ID, name, and password are required" });
  }

  try {
    // Get the IP address from the incoming request
    const ipAddress = req.ip || req.connection.remoteAddress;
    // Use a geolocation API to get the location based on the IP address
    let location = "Unknown Location"; // Default location if geolocation fails

    try {
      const routerIp = await axios.get("https://api.ipify.org?format=json");
      console.log("Public IP:", routerIp.data);
      const locationData = await axios.get(
        `https://ipinfo.io/${routerIp.data.ip}/json?token=${process.env.LOCATIONAPIKEY}`
      );
      //   //replace with ipaddress when the side is ON
      console.log(locationData.data);
      console.log("location daata", locationData.data);
      location = locationData.data.city || "Unknown Location"; // Extract city, default to 'Unknown Location'
    } catch (geoError) {
      console.error("Geolocation API error:", geoError);
      location = "Unknown Location";
    }

    // Check if the device already exists by its deviceId
    let device = await IoTDevice.findOne({ deviceId });

    if (device) {
      // If device exists, update the last known details (location, name, user, and password)
      device.deviceName = deviceName;
      device.userId = userId || null; // If userId is not provided, set it to null
      device.location = location;
      device.password = password; // Store the password as plaintext for now

      await device.save();
      return res.json({
        message: "Device already initialized and updated",
        device,
      });
    } else {
      // If device doesn't exist, create a new device entry
      device = new IoTDevice({
        deviceId,
        deviceName,
        location,
        userId,
        password, // Store the password as plaintext for now
      });
      await device.save();
      return res.json({ message: "Device initialized successfully", device });
    }
  } catch (error) {
    console.error("Error initializing device:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const handleTogglePirSensor = async (req, res) => {
  console.log("toggle working");
};

// 333333333333##################
// import SensorData from "../models/sensortest.model.js";

// export const saveSensorData = async (data) => {
//   try {
//     const sensorData = new SensorData(data);
//     await sensorData.save();
//     return sensorData;
//   } catch (error) {
//     throw new Error('Failed to save sensor data');
//   }
// };

export const checkUserForDevice = async (req, res) => {
  console.log("workling");
  const deviceId = req.query.deviceId;
  console.log("req.body", req.body);
  console.log("req .qwry ", deviceId);

  try {
    const device = await IoTDevice.findOne({ deviceId });

    if (!device) {
      return res
        .status(404)
        .json({ userId: null, message: "Device not found" });
    }

    return res.status(200).json({
      userId: device.userId, // This will be null if no user is linked,
      message: "user ID found ",
    });
  } catch (error) {
    console.log("error ociocerd", error);
    res.status(400).json({ userId: null, message: "error occured" });
  }
};
