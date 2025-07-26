import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const LoginFooter = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={[styles.socialTitle, { color: 'white' }]}>Sign in with</Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.socialContainer}>
        <View style={styles.socialInnerCom}>
          <TouchableOpacity style={styles.btnContainer}>
            <FontAwesome name="facebook" size={hp('2.5%')} />
            <Text style={styles.socialTitle}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnContainer}>
            <AntDesign name="google" size={hp('2.5%')} />
            <Text style={styles.socialTitle}>Google</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnContaineSign} onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.socialTitle}>Start With email or Phone</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.signInText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginFooter;

const styles = StyleSheet.create({
  footer: {
    height: hp('40%'),
    backgroundColor: 'green',
    borderTopRightRadius: wp('30%'),
    borderTopLeftRadius: wp('30%'),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: wp('5%'),
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: hp('2%'),
    gap: 10,
  },
  line: {
    width: wp('28%'),
    height: 0.8,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  socialContainer: {
    width: wp('90%'),
    // alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: hp('5%'),
    width: wp('40%'),
    borderRadius: wp('10%'),
    padding: wp('1%'),
    gap: 10
    // marginVertical: hp('1%'),
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
    height: hp('5.8%'),
    borderRadius: wp('10%'),
    padding: wp('1%'),
    // marginVertical: hp('2%'),
  },
  signInContainer: {
    alignSelf: 'center',
    // marginTop: hp('2%'),
  },
  signInText: {
    color: 'white',
    fontSize: hp('2%'),
  },
});
