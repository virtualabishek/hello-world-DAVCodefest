import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // For icons

// Dummy notifications data
const notifications = [
  { id: "1", type: "like", user: "Sanjit Devi", text: "liked your post", image: require("../assets/profile.png") },
  { id: "2", type: "follow", user: "Sanjit Devi", text: "started to follow you", image: require("../assets/profile.png") },
  { id: "3", type: "trending", text: 'Trending Post! Your post on "Pest Control Methods" is getting lots of engagement!', icon: "bell" },
  { id: "4", type: "order", text: "Order Update! Your request for 50kg of wheat has been accepted by a seller.", image: require("../assets/profile.png") },
  { id: "5", type: "subsidy", text: "New Subsidy Alert! The government has announced a 50% subsidy on irrigation equipment.", icon: "alert-circle" }, // Changed icon to a valid one
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationContainer}>
    {/* Show image or icon */}
    {item.image ? (
      <Image source={item.image} style={styles.avatar} />
    ) : (
      <Icon name={item.icon} size={24} color="black" style={styles.icon} />
    )}

    <View style={styles.textContainer}>
      <Text style={[styles.text, item.type === "follow" && styles.boldText]}>
        {item.user ? <Text style={styles.boldText}>{item.user} </Text> : ""}
        {item.text}
      </Text>
    </View>

    {/* Follow Back Button */}
    {item.type === "follow" && (
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followText}>Follow Back</Text>
      </TouchableOpacity>
    )}
  </View>
);

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4e3",
    padding: 20,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  followButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  followText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default NotificationsScreen;
