#include "secrets.h"
void updateSensorStates(String userIdFromResponse, bool fire, bool gas, bool pir, bool soil, bool water, bool cam) {
    user = userIdFromResponse != "";
    fireSensor = fire;
    gasSensor = gas;
    pirSensor = pir;
    soilSensor = soil;
    waterSensor = water;
    camera = cam;
  
    Serial.println("User linked? " + String(user ? "Yes" : "No"));
    Serial.println("PIR Sensor: " + String(pirSensor));
    Serial.println("Fire Sensor: " + String(fireSensor));
    Serial.println("Gas Sensor: " + String(gasSensor));
    Serial.println("Soil Sensor: " + String(soilSensor));
    Serial.println("Water Level Sensor: " + String(waterSensor));
    Serial.println("Camera: " + String(camera));
  }

