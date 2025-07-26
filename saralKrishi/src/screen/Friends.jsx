import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Friends = () => {
  let friends = [
    {
      name: 'John Doe',
      age: 25,
      location: 'Lagos',
      img: require('../assets/profile.png')
    },
    {
      name: 'Jane Doe',
      age: 23,
      location: 'Abuja',
      img: require('../assets/profile.png')
    },
    {
      name: 'James Doe',
      age: 27,
      location: 'Port Harcourt',
      img: require('../assets/profile.png')
    },
    {
      name: 'Jenny Doe',
      age: 21,
      location: 'Kano',
      img: require('../assets/profile.png')
    }
  ];

  const navigation = useNavigation();
  return (
        <LinearGradient
          colors={['#0B7645', '#B5C1AE']}
          style={styles.linearGradient}>
    <View style={styles.container}>
      <View>
        {friends.map((friend, index) => (
          <TouchableOpacity key={index} style={styles.friendContainer} onPress={() =>navigation.navigate('FrendsMsg')}>
            <Image source={friend.img} style={styles.img} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{friend.name}</Text>
              <View style={styles.messageContainer}>
                <Text>recent msg here!!</Text>
                <Text>9:30</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </LinearGradient>
  );
};

export default Friends;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: wp('4%'),
  },
  friendContainer: {
    padding: hp('1%'),
    marginTop: hp('1%'),
    backgroundColor: 'lightgray',
    borderRadius: hp('2%'),
    flexDirection: 'row',
    gap: wp('2%'),
    width: wp('90%'),
    alignSelf: 'center',
    elevation:5,
  },
  img: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('3%'),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('70%'),
  },
});