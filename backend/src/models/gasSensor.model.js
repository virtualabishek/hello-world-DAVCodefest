import mongoose from 'mongoose';
import IoTDevice from './iotDevice.model.js'; // Import the IoTDevice model
const gasSensorSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  readings: [
    {
      gasDetected: { type: Boolean, required: true }, // True if gas is detected
      timestamp: { type: Date, default: Date.now },
    }
  ], state: {
    type: Boolean,
    default: true
  }
});
gasSensorSchema.post('save', async function () {
  try {
    // const Device = require('./path/to/device.model'); // update this path correctly

    // this.device = ObjectId of the IoTDevice
    await IoTDevice.findByIdAndUpdate(this.deviceId, {
      GasSensor: this.state
    });
  } catch (err) {
    console.error('Error updating PIRSensor state in device:', err);
  }
});

export const GasSensor = mongoose.model('GasSensor', gasSensorSchema);

