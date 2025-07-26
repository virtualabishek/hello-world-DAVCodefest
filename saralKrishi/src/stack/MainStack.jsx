import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelComePage from '../screen/WelComePage';
import Navigation from './Navigation';
import Home from '../screen/Home';

import Shopping from '../screen/Shopping';

import Market from '../screen/Market';
import ProductDetails from '../screen/ProductDetails';
import Tips from '../screen/Tips';

import CameraPage from '../components/CameraPage';
import User from '../screen/User';
import Friends from '../screen/Friends';
import NewsPage from '../screen/NewsPage';
import NewsScreen from '../screen/NewsScreen';
import SecondUser from '../screen/SecondUser';
import FrendsMsg from '../screen/FrendsMsg';
import LoginPage from '../screen/LoginPage';
import SignUpPage from '../screen/SignUpPage';
import Verification from '../screen/Verification';
import Expert from '../screen/Expert';
import NotificationsScreen from '../components/NotificationItem';
import ColdStorePage from '../screen/ColdStorePage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const ShoppingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Market">
      <Stack.Screen
        name="Market"
        component={Market}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen
        name="Shopping"
        component={Shopping}
        options={{ headerShown: true }}
      />
      <Stack.Screen component={ColdStorePage} name='ColdStorePage' />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
      <Stack.Screen component={NotificationsScreen} name="Notification" />
      <Stack.Screen component={Expert} name='Expert' />
      <Stack.Screen component={Friends} name="Friends" />
      <Stack.Screen component={NewsPage} name="News" />
      <Stack.Screen component={NewsScreen} name="NewsScreen" />

    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelComePage" component={WelComePage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen component={SignUpPage} name='SignUpPage' />
      <Stack.Screen component={Verification} name='Verification' />
      <Stack.Screen name="ShoppingStack" component={ShoppingStack} />
      <Stack.Screen name="Navigation" component={Navigation} />
      <Stack.Screen component={User} name="User" />
      <Stack.Screen
        component={SecondUser}
        name="SecondUser"
        options={{
          headerShown: true,
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        component={FrendsMsg}
        name="FrendsMsg"
        options={{
          headerShown: true,
          headerTitle: 'Message'
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
