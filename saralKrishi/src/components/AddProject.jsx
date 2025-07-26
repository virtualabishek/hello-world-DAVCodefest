import { Button, Image, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDown from './DropDown';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AddProject = () => {
  const [imageUri, setImageUri] = useState(null);

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
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="choose an Image" onPress={pickImage} color={'darkgreen'} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <TextInput
        placeholder='Product Name'
        style={styles.input}
        placeholderTextColor='gray' // Set placeholder text color
      />
      <TextInput
        placeholder='Product Detail'
        style={styles.input}
        placeholderTextColor='gray' // Set placeholder text color
      />

      <View style={{ width: '100%', flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
        <DropDown />
        <DropDown category={['Crop', 'Fruit', 'Seeds', 'Fertilizer', 'tools', 'Machine']} />
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProject;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    backgroundColor: 'white',
    borderRadius: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('2%'),
    paddingVertical: hp('2%'),
    elevation: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    borderRadius: hp('2%'),
    fontSize: hp('2%'),
    padding: hp('1%'),
    color: 'black',
  },
  btn: {
    backgroundColor: 'darkgreen',
    height: hp('5%'),
    width: hp('10%'),
    borderRadius: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});