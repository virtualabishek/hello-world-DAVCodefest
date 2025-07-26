import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CommonBtn from '../components/CommonBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { userAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';

// The User component
const User = () => {
  const { user, logout } = userAuthStore();
  const defaultAvatar = require('../assets/profile.png');
  const navigation = useNavigation();

  const avatarSource = user?.avatar ? { uri: user.avatar } : defaultAvatar;

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('User logged out');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.loginText}>Please</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.btn}>Go to Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.btn}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View>
        <View style={styles.containerDetail}>
          <View style={styles.imgCont}>
            <Image source={avatarSource} style={styles.img} />
          </View>
          <View>
            <Text style={styles.name}>{user ? user.username : "Guest User"}</Text>
            <Text style={styles.name}>{user ? user.location : 'Birgunj-Ranight'}</Text>
            <Text style={styles.name}>{user ? user.email : 'example@gmail.com'}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <CommonBtn width={wp('80%')} title="Settings" icon={<AntDesign name="setting" size={25} color="white" />} />
          <CommonBtn width={wp('80%')} title="Terms & Conditions" icon={<AntDesign name="book" size={25} color="white" />} />
          <CommonBtn width={wp('80%')} title="Language" icon={<Entypo name="language" size={25} color="white" />} />
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.btn}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default User;

// Styling the UI with an agriculture theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background to give a natural look
  },
  header: {
    alignSelf: 'center',
    marginTop: hp('2%'),
    backgroundColor: '#6a4e23', // Earthy brown color for header
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: '700',
    color: '#fff',
  },
  imgCont: {
    height: hp('22%'),
    width: hp('22%'),
    borderWidth: 2,
    borderColor: '#3a4f33', // Dark green border to give a natural feel
    borderRadius: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c2c2c2', // Light gray to resemble earth tones
    elevation: 5,
  },
  img: {
    height: hp('20%'),
    width: hp('20%'),
    resizeMode: 'contain',
    borderRadius: hp('50%'),
  },
  containerDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('2%'),
    marginVertical: hp('5%'),
  },
  name: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  btnContainer: {
    alignItems: 'center',
    gap: hp('1%'),
    marginTop: hp('3%'),
  },
  btn: {
    fontSize: hp('2%'),
    backgroundColor: '#8e9a5d', // Light olive green for buttons
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: '#fff',
    textAlign: 'center',
    width: wp('80%'),
    marginVertical: hp('1%'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef7e5', // Light greenish background for login/signup
  },
  loginText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#6a4e23', // Dark brown color for text
  },
  login: {
    color: "blue",
    fontSize: 25,
  },
});
