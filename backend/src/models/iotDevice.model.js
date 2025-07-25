import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true, 
    unique: true, 
  },
  deviceName: {
    type: String,
    required: true, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    default: null,  
  },  password: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  }, ip: {
    type:String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',  // Default status is 'active'
  },
  FireSensor: {
    type: Boolean,
    default: true,  // Default value is false (not triggered)
  },
  GasSensor: {
    type: Boolean,
    default: true,  // Default value is false (not triggered)
  },
  PIRSensor: {
    type: Boolean,
    default: true,  // Default value is false (not triggered)
  }, SoilSensor: {
    type: Boolean,
    default: true,  
  }
, WaterLevelSensor: {
    type: Boolean,
    default: true,  
  },  
  Camera: {
    type: Boolean,
    default: false,  
  },



  createdAt: {
    type: Date,
    default: Date.now,  
  },                                
},{timestamps: true});

const IoTDevice = mongoose.model('IoTDevice', deviceSchema);

export default IoTDevice;