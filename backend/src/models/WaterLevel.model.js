import mongoose from 'mongoose';
import IoTDevice from './iotDevice.model.js'; // Import the IoTDevice model
// Define schema for the water level sensor readings
const waterLevelSensorSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IoTDevice',  // Link the sensor data to an IoT device
  },
  readings: [
    {
      level: {
        type: Number,
        required: true,  // Water level in percentage (0-100)
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
waterLevelSensorSchema.post('save', async function () {
  try {
    // const Device = require('./path/to/device.model'); // update this path correctly

    // this.device = ObjectId of the IoTDevice
    await IoTDevice.findByIdAndUpdate(this.deviceId, {
      WaterLevelSensor: this.state
    });
  } catch (err) {
    console.error('Error updating PIRSensor state in device:', err);
  }
});
// Create a model for the sensor data
const WaterLevelSensorData = mongoose.model('WaterLevelSensorData', waterLevelSensorSchema);

export default WaterLevelSensorData;