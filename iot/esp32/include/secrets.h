#ifndef SECRETS_H
#define SECRETS_H

#include <Arduino.h>

// // WiFi credentials
extern const char* WIFI_SSID;
extern const char* WIFI_PASSWORD;

// // WebSocket server configuration
extern const char* SERVER_URL;  // Server URL for WebSocket connection
// extern const char* WEBSOCKET_URL;
extern const int SERVER_PORT;
extern const int ESPSERVER_PORT;
// // Device ID
    extern const String deviceId;

// // Sensor pins
extern const int WATER_SENSOR_PIN;
extern const int SOIL_SENSOR_PIN;
extern const int PIR_SENSOR_PIN;
extern const int FIRE_SENSOR_PIN;
extern const int GAS_SENSOR_PIN;
// extern const int SOIL_MOISTURE_SENSOR_PIN;
// extern const int SENSOR_PIN;

// // Advance Security pins
// extern const int pirPin;  // PIR sensor input pin
// extern const int irPin;   // IR sensor input pin
// extern const int alertPin; // Pin to trigger alert (e.g., an LED or buzzer)
// extern const int IR_SENSOR_PIN;
// extern const int ALERT_PIN;

// // Other configurations
// extern const unsigned long SENSOR_READ_INTERVAL;

extern  bool user;
extern  bool pirSensor;
extern  bool fireSensor;
extern  bool gasSensor;
extern  bool soilSensor;
extern  bool waterSensor;
extern  bool camera;

#endif