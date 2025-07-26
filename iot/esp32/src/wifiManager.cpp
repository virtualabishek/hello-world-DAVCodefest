#include "wifiManager.h"
#include <WiFi.h>
#include "secrets.h"

void setupWiFii(const char* WIFI_SSID, const char* WIFI_PASSWORD) {
  unsigned long connectStart = 0;
  unsigned long retryWaitStart = 0;
  bool tryingToConnect = false;
  bool waitingToRetry = false;

  while (WiFi.status() != WL_CONNECTED) {
    if (!tryingToConnect && !waitingToRetry) {
      Serial.println("Attempting to connect to WiFi...");
      WiFi.disconnect(true);  // Disconnect before new attempt
      WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
      connectStart = millis();
      tryingToConnect = true;
    }

    // Check if WiFi connected 
    if (WiFi.status() == WL_CONNECTED) {
      break;
    }

    // If trying to connect and time exceeds 10 seconds (10000ms)
    if (tryingToConnect && millis() - connectStart >= 10000) {
      Serial.println("\n❌ Failed to connect. Retrying in 5 seconds...");
      retryWaitStart = millis();
      tryingToConnect = false;
      waitingToRetry = true;
    }

    // Wait 5 seconds before retrying
    if (waitingToRetry && millis() - retryWaitStart >= 5000) {
      waitingToRetry = false;
    }

    // Keep WiFi stack and WebSocket alive (optional)
    delay(1);  // safe 1ms delay (or call wsClient.loop() here if needed)
  }

  Serial.println("✅ Connected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}


