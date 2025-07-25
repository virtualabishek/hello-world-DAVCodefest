#include <ESPAsyncWebServer.h>
#include <LittleFS.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include "secrets.h"
#include "utility.h" // Include utility functions for sensor state management
// #include "wifiManager.h" // Include WiFi Manager library


// Create AsyncWebServer instance on port 80
AsyncWebServer server(80);

IPAddress apIP(192, 168, 69, 69);
IPAddress subnet(255, 255, 255, 0);
String deviceIP; // Global variable to store the IP address

// Global flags


unsigned long lastUserChecked=0;



// Function to update global flags from backend





void setupAPMode() {
    // Disconnect any existing WiFi first
    WiFi.disconnect(true);
    delay(1000);
    
    // Start in AP mode
    WiFi.mode(WIFI_AP);
    WiFi.softAPConfig(apIP, apIP, subnet);

    WiFi.softAP("ESP32-Config", "config1234"); // Change these to your preferred AP credentials
    Serial.println("Access Point Started");
    Serial.print("IP Address: ");
    Serial.println(WiFi.softAPIP());
  }

  void sendIPToBackend(String ip) {
    HTTPClient http;
    http.begin("http://" + String(SERVER_URL) + ":" + SERVER_PORT + "/sensor/device/ip");
    Serial.println("Sending IP to backend: http://" + String(SERVER_URL) + ":" + SERVER_PORT + "/sensor/device/ip");
  
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String urlEncodedPayload = "ip=" + ip + "&deviceId=" + String(deviceId);
  
    int httpResponseCode = http.POST(urlEncodedPayload);
  
    if (httpResponseCode > 0) {
      String response = http.getString();  // Get JSON response as string
      Serial.println("Server response: " + response);
  
      // Parse JSON
      StaticJsonDocument<1024> doc;  // Increase size if needed
      DeserializationError error = deserializeJson(doc, response);
  
      if (!error) {
        String message = doc["message"];
        String receivedIP = doc["ip"];
        String deviceID = doc["deviceId"];
  
        // Sensors
        bool fire = doc["deviceState"]["FireSensor"];
        bool gas = doc["deviceState"]["GasSensor"];
        bool pir = doc["deviceState"]["PIRSensor"];
        bool soil = doc["deviceState"]["SoilSensor"];
        bool water = doc["deviceState"]["WaterLevelSensor"];
        bool cam = doc["deviceState"]["Camera"];
  
        // User ID check
        String userId = doc["deviceState"]["userId"].isNull() ? "" : String(doc["deviceState"]["userId"].as<const char*>());
        Serial.println("userID" + userId);

        // Update global states
        updateSensorStates(userId, fire, gas, pir, soil, water, cam);
      } else {
        Serial.println("Failed to parse JSON response.");
      }
    } else {
      Serial.println("Failed to send IP. Error: " + http.errorToString(httpResponseCode));
    }
  
    http.end();
  }
  void setupWiFi(const char* ssid, const char* password) {
    WiFi.disconnect(true);
    delay(1000);
    
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
  
    Serial.print("Connecting to WiFi");
    int tries = 0;
    while (WiFi.status() != WL_CONNECTED && tries < 20) {
      delay(300);
      Serial.print(".");
      tries++;
    }
  
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nConnected to WiFi!");
      Serial.print("IP address: ");
      Serial.println(WiFi.localIP());
      WiFi.softAPdisconnect(true);  // Stop AP mode
      deviceIP = WiFi.localIP().toString();
      Serial.println("IP address: "+deviceIP);

  // Send IP to backend
  sendIPToBackend(deviceIP);
    } else {
      Serial.println("\nFailed to connect, starting AP mode again.");
      setupAPMode();
    }
  }

  void setUpWebServerManager(){


    if(!LittleFS.begin()){
        Serial.println("an error occurred while mounting LittleFS");
        return;
    }
    Serial.println("LittleFS mounted successfully");





    server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");
      server.on("/connect", HTTP_POST, [](AsyncWebServerRequest *request){},
        NULL,
        [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
          String body = "";
          for (size_t i = 0; i < len; i++) body += (char)data[i];
    
          DynamicJsonDocument doc(512);
          DeserializationError err = deserializeJson(doc, body);
          if (!err) {
            // String ssid = doc["ssid"];
            // String pass = doc["password"];
            const char* ssid = doc["ssid"];
            const char* password = doc["password"];
            // Connect to WiFi (you can store in EEPROM or connect directly)
            Serial.println("Trying to connect to: " );
            // WiFi.begin(ssid.c_str(), pass.c_str());
           setupWiFi(ssid, password); // Call the setupWiFi function to initialize WiFi

          //  WiFi.begin(ssid.c_str(), pass.c_str());

           int attemptTime = 0;
           while (WiFi.status() != WL_CONNECTED && attemptTime < 10) {
             delay(1);
             Serial.print(".");
             attemptTime++;
           }
            if (WiFi.status() == WL_CONNECTED) {
                Serial.println("\n✅ Connected!");
                String ip = WiFi.localIP().toString();
               String message = "Connected to WiFi! IP: " + ip;
                request->send(200, "text/plain", message);
              } else {
                Serial.println("\n❌ Failed to connect.");
                request->send(401, "text/plain", "Failed to connect. Please check SSID or password.");
              }          } else {
            request->send(400, "text/plain", "Invalid JSON");
          }
        }
      );
    

    server.begin();
    Serial.println("Web Server started on port 80");
}

void loopWebServer() {
  static bool apRunning = false;
  static unsigned long lastCheck = 0;

  if (millis() - lastCheck > 2000) {  // check every 2 seconds
    lastCheck = millis();

    if (WiFi.status() != WL_CONNECTED && !apRunning) {
      Serial.println("WiFi lost! Starting AP mode...");
      setupAPMode();
      apRunning = true;
    } else if (WiFi.status() == WL_CONNECTED && apRunning) {
      Serial.println("WiFi connected, stopping AP mode...");
      WiFi.softAPdisconnect(true);
      apRunning = false;

    }



  }
}
void checkUserFromServer() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://" + String(SERVER_URL) + ":" + SERVER_PORT + "/sensor/checkuser?deviceId=" + deviceId);

    int httpCode = http.GET();
    if (httpCode == 200) {
      String response = http.getString();
      DynamicJsonDocument doc(1024);
      DeserializationError error = deserializeJson(doc, response);

      if (!error) {
        if (doc["userId"]) {
          user = true;  // user found
          Serial.println("✅ User linked! Opening WebSocket...");
          Serial.print("Message: ");
          Serial.println(doc["message"].as<String>());
          // startWebSocket(); // optional
        } else {
          user = false;  // user not found
          Serial.println("❌ User not linked (userId is null).");
        }
      } else {
        user = false;
        Serial.println("❌ JSON parsing failed.");
      }
    } else {
      user = false;
      Serial.print("❌ HTTP error code: ");
      Serial.println(httpCode);
    }

    http.end();
  } else {
    Serial.println("❌ WiFi not connected");
  }
}

// void checkUserFromServer() {
//   if (WiFi.status() == WL_CONNECTED) {
//     HTTPClient http;
//     // http.begin("http://your-backend.com/api/device/checkUser?deviceId=123456");
//     http.begin("http://" + String(SERVER_URL) + ":" + SERVER_PORT + "/sensor/checkuser?deviceId=" + deviceId);


//     int httpCode = http.GET();
//     if (httpCode == 200) {
//       String response = http.getString();
//       DynamicJsonDocument doc(1024);
//       deserializeJson(doc, response);
      
//       if (doc["userId"]) {
//         user = true;  // set flag true
//         // Optional: save userId, open WebSocket
//         Serial.println("User linked! Opening WebSocket...");
//         String message = doc["message"];
    
//         Serial.print("message:");
//         Serial.println(message);

//         //   startWebSocket();  // define this to start socket
//       }
//     }
//   if(millis()-lastUserChecked >=4000){
//     Serial.print("NO User found");
// user = false;
//   }
//     http.end();
//   }
// }
