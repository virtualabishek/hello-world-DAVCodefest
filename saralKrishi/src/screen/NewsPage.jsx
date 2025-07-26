import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';

const NewsPage = () => {
  const {item} = useRoute().params;
  console.log(item)

  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <View style={styles.container}>
     <Image source={imageSource} style={styles.img} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.txtContainer}>
        <Text style={styles.text}>
        {
          item.content
        }
        </Text>
      </View>
    </View>
  );
};

export default NewsPage;

const styles = StyleSheet.create({
  container: {
    padding: wp('4%'),
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  img: {
    height: hp('25%'),
    width: '100%',
    resizeMode: 'cover',
    borderRadius: wp('2.5%'),
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: hp('2.5%'),
    fontWeight: '700',
    marginBottom: hp('1%'),
    color: '#333',
  },
  txtContainer: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('2.5%'),
    elevation: 3,
  },
  text: {
    fontSize: hp('1.8%'),
    lineHeight: hp('2.8%'),
    color: '#555',
  },
});
