#ifndef UTILITY_H
#define UTILITY_H   

#include <Arduino.h>

void updateSensorStates(String userIdFromResponse, bool fire, bool gas, bool pir, bool soil, bool water, bool cam);

#endif