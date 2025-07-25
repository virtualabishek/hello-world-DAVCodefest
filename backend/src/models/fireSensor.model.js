import mongoose from 'mongoose';
import IoTDevice from './iotDevice.model.js'; // Import the IoTDevice model
const fireSensorSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  readings: [
    {
      fireDetected: { type: Boolean, required: true }, // True if fire is detected
      timestamp: { type: Date, default: Date.now },
    }
  ], state: {
    type: Boolean,
    default: true
  }
});
fireSensorSchema.post('save', async function () {
  try {

    await IoTDevice.findByIdAndUpdate(this.deviceId, {
      FireSensor: this.state
    });
  } catch (err) {
    console.error('Error updating PIRSensor state in device:', err);
  }
});

export const FireSensor=  mongoose.model('FireSensor', fireSensorSchema);