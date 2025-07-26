import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const api = () => {
    const getCityName = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
      
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || "City not found";
            console.log("City:", city);
            return { city, fullAddress: data.display_name };
          } else {
            console.log("City not found");
            return { city: null, fullAddress: null };
          }
        } catch (error) {
          console.error("Error fetching city name:", error);
          return { city: null, fullAddress: null };
        }
      };
      
      // Example usage
      getCityName(27.005915, 84.859085).then((location) => console.log(location));
      
  return (
    <View>
      <Text>api</Text>
    </View>
  )
}

export default api

const styles = StyleSheet.create({})