import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import AntDesign from 'react-native-vector-icon/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ColdStoreComponent = ({item}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row',gap:hp('1%')}}>

      <Image source={require('../assets/profile.png')} style={styles.img} />
      <View>
    
          <Text style={{}}>{item.name}</Text>
          <Text>{item.address}</Text>
        </View>
        </View>
        <TouchableOpacity><AntDesign name='message1' size={25}/></TouchableOpacity>
    </View>
  );
};

export default ColdStoreComponent;

const styles = StyleSheet.create({
  container: {
    height: hp('10%'),
    width: '90%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: hp('1%'),
    margin: 'auto',
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.8%'),
    gap: hp('2%'),
  },
  img: {
    height: hp('5%'),
    width: wp('14%'),
    resizeMode: 'contain',
  },
});
