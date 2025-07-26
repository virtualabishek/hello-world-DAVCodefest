import { Image, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import LoginHeader from '../components/LoginHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginFooter from '../components/LoginFooter';

const WelComePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LoginHeader />

        <View style={styles.imageContainer}>
          <Image source={require('../assets/farmer.png')} style={styles.image} />
        </View>
       <LoginFooter />
      </View>
    </SafeAreaView>
  );
};

export default WelComePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    flex: 1,
    // padding: wp('5%'),
  },
  imageContainer: {
    height: hp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    // backgroundColor:'pink',
   
  },
  image: {
    width: wp('80%'),
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight:wp('15%')
  },
  footer: {
    height: hp('50%'),
    backgroundColor: 'green',
    borderTopRightRadius: wp('30%'),
    borderTopLeftRadius: wp('30%'),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: wp('2.5%'),
    width: '100%',
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  line: {
    width: wp('30%'),
    height: 1,
    backgroundColor: 'white',
  },
  socialContainer: {
    width: wp('90%'),
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: hp('6%'),
    width: wp('40%'),
    borderRadius: wp('10%'),
    padding: wp('1%'),
    marginVertical: hp('1%'),
  },
  socialTitle: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  socialInnerCom: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  btnContaineSign: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: hp('7%'),
    borderRadius: wp('10%'),
    padding: wp('1%'),
    marginVertical: hp('1%'),
  },
  signInContainer: {
    alignSelf: 'center',
    marginTop: hp('1%'),
  },
  signInText: {
    color: 'white',
    fontSize: hp('2%'),
  },
});
