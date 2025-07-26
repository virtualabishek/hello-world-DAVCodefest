import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { userAuthStore } from '../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const { login } = userAuthStore();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login response:', response);

      if (response && response.token) {
        await AsyncStorage.setItem('authToken', response.token);
        Alert.alert('Login Success', 'You have successfully logged in.');
        navigation.navigate('Navigation'); // Ensure this route is correctly set up
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'An error occurred during login. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#0B7645', '#B5C1AE']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginPage;

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
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: hp('1%'),
    marginBottom: hp('2%'),
  },
  passwordInput: {
    flex: 1,
    height: hp('6%'),
    paddingHorizontal: wp('4%'),
    fontSize: hp('2%'),
  },
  showButton: {
    position: 'absolute',
    right: wp('4%'),
  },
  showButtonText: {
    color: 'gray',
    fontSize: hp('2%'),
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
});
