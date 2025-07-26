import {Image, StyleSheet} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AI from '../screen/AI';

import Community from '../screen/Community';
import User from '../screen/User';


import AntDesign from 'react-native-vector-icons/AntDesign';
import { HomeStack, ShoppingStack } from './MainStack';

const Tab = createBottomTabNavigator();
const Navigation = () => {
  return (
    <Tab.Navigator initialRouteName='HomeStack'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#8A9E90',

        tabBarShowLabel: false,
        tabBarStyle: {
          width: '95%',
          marginHorizontal: 'auto',
          borderRadius: 10,
          elevation: 2,
          marginBottom: 10,
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name="AI"
        component={AI}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/AI.png')}
                style={{height: 30, width: 30, borderRadius: 10, marginTop: 10}}
              />
            );
          },
        }}
      />
      <Tab.Screen name="ShoppingStack" component={ShoppingStack} options={{
        tabBarIcon:({focused})=>{{
          return <AntDesign  name="shoppingcart" size={27}/>
        }}
      }} />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/logo.png')}
                style={styles.img}
              />
            );
          },
        }}
      />
      <Tab.Screen name="Community" component={Community}  options={{
        tabBarIcon:({focused})=>{
          return <AntDesign name="team" size={27}/>
        }
      }} />
      <Tab.Screen name="User" component={User} options={{
        tabBarIcon:({focused})=>{
          return <AntDesign name="user" size={27}/>
        }
      }} />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  img: {
    height: 55,
    width: 55,
    // backgroundColor:'red'
    marginTop: 15,
  },
});
