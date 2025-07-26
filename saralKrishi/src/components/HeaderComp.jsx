import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { userAuthStore } from '../store/authStore';
const { width } = Dimensions.get('window');

const HeaderComp = ({ title }) => {
  const { user } = userAuthStore();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <TouchableOpacity style={styles.LCTBTN}>
            <Image source={require('../assets/loco.png')} style={styles.LocationIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={{ color: 'lightgray' }}>Bara-Nepal,4:40 PM</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
          <AntDesign name='message1' size={25} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <FontAwesome name='bell-o' size={25} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <Image
            source={user && user.avatar ? { uri: user.avatar } : require('../assets/person.png')}
            style={styles.img}
          />


        </TouchableOpacity>
        {/* <Image source={{ uri: user ? user.avatar : null }} style={styles.img} /> */}

      </View>
    </View>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.025,
    gap: heightPercentageToDP('2%'),
    marginTop: heightPercentageToDP('1%'),
  },
  innerContainer: {
    flexDirection: 'row',
  },
  LCTBTN: {
    padding: width * 0.025,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: width * 0.04,
    elevation: 3,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: "white",

  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.05
  },
  img: {
    height: heightPercentageToDP('5%'),
    width: widthPercentageToDP('10%'),
    borderRadius: 50,
  },
  LocationIcon: {
    height: heightPercentageToDP('2.8%'),
    width: widthPercentageToDP('5.5%'),
  }
})