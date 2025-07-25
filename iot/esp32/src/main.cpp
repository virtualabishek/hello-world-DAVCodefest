#include <Arduino.h>
// #include "wifiManager.h"
#include "myWebSocket.h"
// #include <webSocket.h> // Web Server library
#include <WebSocketsClient.h>  // WebSocket Client library
#include "webServerManager.h"
// #include "webServerManager.h" // Web Server Manager library
#include "secrets.h"
#include "mqtt.h"

unsigned long previousMillis = 0;  // store the last time you printed
const unsigned long interval = 40000; //

void setup() {
Serial.begin(921600); // Initialize serial communication at 9600 baud rate
Serial.println("Hello, World!"); // Print "Hello, World!" to the serial monitor
// setupWiFi(); // Call the setupWiFi function to initialize WiFi
setupAPMode();
setUpWebServerManager();
setupMqtt();

setupWebSocket();
}



void loop() {

  loopWebServer();

  loopMqtt();
  loopWebSocket(); // Call the loopWebSocket function to handle WebSocket communication
  
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis; // save the last time you printed
    Serial.println("Hello, World! MAIN LOOP");
  }

}


