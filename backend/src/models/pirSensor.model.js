import mongoose from 'mongoose';
import IoTDevice from './iotDevice.model.js'; // Import the IoTDevice model
// Define schema for the PIR sensor readings
const pirSensorSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IoTDevice',  // Link the sensor data to an IoT device
    required: true,
  },
  readings: [
    {
      detected: {
        type: Boolean,
        required: true,  // Whether motion was detected or not
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
pirSensorSchema.post('save', async function () {
  try {
    // const Device = require('./path/to/device.model'); // update this path correctly

    // this.device = ObjectId of the IoTDevice
    await IoTDevice.findByIdAndUpdate(this.deviceId, {
      PIRSensor: this.state
    });
  } catch (err) {
    console.error('Error updating PIRSensor state in device:', err);
  }
});
const PIRSensorData = mongoose.model('PIRSensorData', pirSensorSchema);

export default PIRSensorData;
  