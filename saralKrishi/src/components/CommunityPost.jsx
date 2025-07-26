import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const CommunityPost = ({ item }) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileCon} onPress={() => navigation.navigate('SecondUser')}>
        <Image source={{ uri: item.userPhoto || require('../assets/person.png') }} style={styles.img} />
        <Text >{item.owner.username}</Text>
      </TouchableOpacity>
      <View style={{alignSelf:'flex-start',width:wp('70%'),marginLeft:hp('2%')}}>
        <Text numberOfLines={2} >{item.title}</Text>
      </View>
      {item.photo && <Image source={{ uri: item.photo }} style={styles.postImg} />}
      <TouchableOpacity style={styles.btnContainer} onPress={handleLike}>
        <EvilIcons name="like" size={25} color={liked ? 'green' : 'black'} />
        <Text>{likesCount} Like{likesCount !== 1 ? 's' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityPost;

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('0.5%'),
    padding: hp('2%'),
    borderRadius: hp('1%'),
    elevation: 4,
    marginVertical: hp('1%'),
    alignSelf: 'center',
  },
  profileCon: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('1%'),
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: wp('5%'),
    gap: wp('2%'),
  },
  img: {
    height: hp('3.8%'),
    width: hp('3.8%'),
    resizeMode: 'contain',
    borderRadius: hp('2.5%'),
  },
  postImg: {
    height: hp('15%'),
    width: wp('70%'),
    // width:500,
    resizeMode: 'contain',
    borderRadius: hp('1%'),
  },
});
