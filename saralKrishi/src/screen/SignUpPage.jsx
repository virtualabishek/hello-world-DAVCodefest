import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { userAuthStore } from '../store/authStore';

const SignUpPage = () => {
  const { signup, error, isLoading } = userAuthStore();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    image: null,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { username, email, password, image, phoneNumber } = formData;
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('number', phoneNumber);

    if (image) {
      data.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }

    try {
    const response=  await signup(data);
    console.log(response)
      navigation.navigate('Verification');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Sign up failed. Please try again.');
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        setFormData({ ...formData, image: response.assets[0] });
      }
    });
  };

  const handleSignUp = () => {
    const { username, email, phoneNumber, password } = formData;

    // Basic validation
    if (!username || !email || !phoneNumber || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Invalid phone number');
      return;
    }

    handleSubmit();
  };

  return (
    <LinearGradient colors={['#0B7645', '#B5C1AE']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={formData.username}
          onChangeText={(value) => handleChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="gray"
          value={formData.phoneNumber}
          onChangeText={(value) => handleChange('phoneNumber', value)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Choose Profile Image</Text>
        </TouchableOpacity>
        {formData.image && <Image source={{ uri: formData.image.uri }} style={styles.image} />}
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </LinearGradient>
  );
};

export default SignUpPage;

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
  imagePicker: {
    width: '100%',
    height: hp('6%'),
    backgroundColor: 'gray',
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  imagePickerText: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: '600',
  },
  image: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    marginBottom: hp('2%'),
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