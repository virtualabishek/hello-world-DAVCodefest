import mongoose from "mongoose";
const sensorReadingSchema = new mongoose.Schema({
  readings: [
    {
      distance: {
        type: Number,
        required: true, // Distance in cm
      },
      detected: {
        type: Boolean,
        required: true,
        default: false, // If the distance is within the threshold, animal detected will be true
      },
      timestamp: {
        type: Date,
        default: Date.now, // Automatically set the current time
      },
    },
  ],
});

// Create a model based on the schema
export const SensorReading = mongoose.model(
  "SensorReading",
  sensorReadingSchema
);
