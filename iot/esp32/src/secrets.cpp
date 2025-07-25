#include "secrets.h"

// // WiFi credentials
// const char* WIFI_SSID = "rupeshkd_fbrgj_2";
// const char* WIFI_PASSWORD = "CLB439A11A";

// // WebSocket server configuration
const char* SERVER_URL = "10.33.217.19";
const int SERVER_PORT = 7180;
const int ESPSERVER_PORT = 8170;

// // Device ID
const String deviceId = "677e12ca3a5e0b452b9c8dbe";


const int WATER_SENSOR_PIN = 34; 
const int SOIL_SENSOR_PIN = 35;   
const int PIR_SENSOR_PIN = 5;    
    const int FIRE_SENSOR_PIN = 4; // GPIO pin for fire sensor
const int GAS_SENSOR_PIN = 36;    // GPIO pin for gas sensor 
// const int FLAME_SENSOR_PIN = 4; 
/* The line `// const int GAS_SENSOR_PIN = 36;` is a commented-out line of code in C++. This means that
it is not active or being used in the program. It is likely that this line was previously used to
define a constant integer variable for a gas sensor pin, but it has been commented out by adding
`//` at the beginning of the line. */
// const int GAS_SENSOR_PIN = 36;    
// // const int SOIL_MOISTURE_SENSOR_PIN = 27; //x


// // Advance Security pins
// // const int pirPin = 38;  // Example pin number
// // const int irPin = 39;   // Example pin number
// const int alertPin1 = 25; // ✅ Valid GPIO
// const int alertPin2 = 26; // ✅ Valid GPIO
// const int alertPin3 = 27; // ✅ Valid GPIO


// // Other configurations
// const unsigned long SENSOR_READ_INTERVAL = 1000; // Example interval

// // Global sensor state variables
// bool pirEnabled = true;
// bool waterSensorEnabled = true;
// bool soilMoistureSensorEnabled = true;
// bool gasSensorEnabled = true;
// bool flameSensorEnabled = true;

bool user = false;
bool pirSensor = false;
bool fireSensor = false;
bool gasSensor = false;
bool soilSensor = false;
bool waterSensor = false;
bool camera = false;