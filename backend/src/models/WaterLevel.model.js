import mongoose from 'mongoose';
import IoTDevice from './iotDevice.model.js'; 
const waterLevelSensorSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IoTDevice',  
  },
  readings: [
    {
      level: {
        type: Number,
        required: true,  
      },
      timestamp: {
        type: Date,
        default: Date.now, 
      },
    },
  ], state: {
    type: Boolean,
    default: true
  }
});
waterLevelSensorSchema.post('save', async function () {
  try {
    await IoTDevice.findByIdAndUpdate(this.deviceId, {
      WaterLevelSensor: this.state
    });
  } catch (err) {
    console.error('Error updating PIRSensor state in device:', err);
  }
});
const WaterLevelSensorData = mongoose.model('WaterLevelSensorData', waterLevelSensorSchema);

export default WaterLevelSensorData;