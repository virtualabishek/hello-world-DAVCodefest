import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { userAuthStore } from '../store/authStore';

const Verification = () => {
  const verifyEmail = userAuthStore((state) => state.verifyEmail);
  const error = userAuthStore((state) => state.error);
  const isLoading = userAuthStore((state) => state.isLoading);
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP');
      return;
    }

    try {
      await verifyEmail(otp);
      Alert.alert('Success', 'OTP verified successfully');
      navigation.navigate('Navigation'); // Navigate to Home after successful verification
    } catch (err) {
      Alert.alert('Error', error || 'OTP verification failed');
    }
  };

  return (
    <LinearGradient colors={['#0B7645', '#B5C1AE']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit OTP"
          placeholderTextColor="gray"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </LinearGradient>
  );
};

export default Verification;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: hp('2%'),
    padding: hp('3%'),
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: '700',
    marginBottom: hp('2%'),
  },
  input: {
    width: '100%',
    height: hp('6%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: hp('1%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: hp('6%'),
    backgroundColor: 'darkgreen',
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: hp('1%'),
  },
});
