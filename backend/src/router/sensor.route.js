import express from "express";
import {
  checkUserForDevice,
  deviceLogin,
  deviceLogout,
  getLatestSensorData,
  handleAssignIP,
  handleFireSensor,
  handleGasSensor,
  handleInitialStateesp,
  handlePIRSensor,
  handleSoilMoisture,
  handleTogglePirSensor,
  handleWaterLevel,
  initESP32,
} from "../controller/sensor.controller.js";
import { verifyToken } from "../middleware/verifytoken.middleware.js";
const router = express.Router();

router.post("/water-level", handleWaterLevel);
router.post("/soilmoisturizer-level", handleSoilMoisture);
router.post("/pirsensor", handlePIRSensor);
router.post("/firesensor", handleFireSensor);
router.post("/gassensor", handleGasSensor);
router.get("/api/initial", handleInitialStateesp); //not neccessage right now bro as we have setup ourself rememever senptobackend fucntuion
router.post("/login", deviceLogin); //done y react frontend to login the device
router.post("/logout", verifyToken, deviceLogout); // done by react frontend to logout the device

router.post("/device-initilization", initESP32);
router.post("/device/ip", handleAssignIP);
router.post("/getalllatestsensordata", getLatestSensorData);
router.post("/toggle/pir", handleTogglePirSensor);

router.get("/checkuser", checkUserForDevice);

export default router;
