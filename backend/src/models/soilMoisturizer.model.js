import mongoose from 'mongoose';
import IoTDevice from './iotDevice.model.js'; // Import the IoTDevice model
// Define schema for the soil moisture sensor readings
const soilMoistureSensorSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IoTDevice',  // Link the sensor data to an IoT device
  },
  readings: [
    {
      moistureLevel: {
        type: Number,
        required: true,  // Soil moisture percentage (e.g., 0-100)
      },
      timestamp: {
        type: Date,
        default: Date.now,  // Automatically set the current time
      },
    },
  ], state: {
    type: Boolean,
    default: true
  }
});

soilMoistureSensorSchema.post('save', async function () {
  try {
    // const Device = require('./path/to/device.model'); // update this path correctly

    // this.device = ObjectId of the IoTDevice
    await IoTDevice.findByIdAndUpdate(this.deviceId, {
      SoilSensor: this.state
    });
  } catch (err) {
    console.error('Error updating PIRSensor state in device:', err);
  }
});

// Create a model for the soil moisture sensor data
const SoilMoistureSensorData = mongoose.model('SoilMoistureSensorData', soilMoistureSensorSchema);

export default SoilMoistureSensorData;