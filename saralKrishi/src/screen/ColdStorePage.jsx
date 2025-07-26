import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ColdStoreComponent from '../components/ColdStoreComponent';

const ColdStorePage = () => {
  const data = [
    {
      name: "John Store",
      address: "123 Main St, New York, NY",
      image: require('../assets/profile.png'), // Updated property name
    },
    {
      name: "Jane Store",
      address: "456 Elm St, Los Angeles, CA",
      image: require('../assets/profile.png'), // Updated property name
    },
    {
      name: "Michael Store",
      address: "789 Oak St, Chicago, IL",
      image: require('../assets/profile.png'), // Updated property name
    },
    {
      name: "Emily Store",
      address: "101 Pine St, Houston, TX",
      image: require('../assets/profile.png'), // Updated property name
    },
    {
      name: "David Brown",
      address: "202 Maple St, Miami, FL",
      image: require('../assets/profile.png'), // Updated property name
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ColdStoreComponent item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ColdStorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
});