import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


const NewsContainer = ({ item }) => {
  const navigation = useNavigation();
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('News', { item })}>
      <Image source={imageSource} style={styles.img} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.txtContainer} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsContainer;

const styles = StyleSheet.create({
  title: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('10%'),
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: hp('1.5%'),
    marginLeft: wp('3.75%'),
    elevation:5,
  },
  img: {
    height: hp('15%'),
    width: hp('10%'),
    resizeMode: 'contain',
    // borderRadius: wp('2.5%'),
    borderRadius:20,
  },
  txtContainer: {
    width: wp('50%'),
    opacity: 0.7,
    fontSize: hp('1.3%')
  },
});