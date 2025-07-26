#ifndef WEBSERVER_MANAGER_H
#define WEBSERVER_MANAGER_H
void setupWiFi(const char* ssid, const char* password);

void setupAPMode();
void setUpWebServerManager();
void loopWebServer();
void checkUserFromServer();
#endif // WEBSERVER_MANAGER_H