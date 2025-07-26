import { Image, StyleSheet, Text,  TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


const SecondProfileDetailContainer = () => {
  const [isfollow,setIsFollow] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.imgCont}>
        <Image source={require('../assets/profile.png')} style={styles.img} />
        </View>
     <View style={styles.textConatiner}>
        <Text style={{fontSize:hp('2.5%'),fontWeight:'bold',textAlign:'center'}}>
            Sanjit Devi
        </Text>
        <Text style={styles.subTitle}>Farmer/Seller/Service Man/Export</Text>
        </View>
        <Text style={styles.description}>A short bio of the user will be added here so give space for manual bio A short bio of the user will be added here so</Text>
     <View style={{flexDirection:'row',justifyContent:'center',alignSelf:'flex-end'}}>
     <TouchableOpacity onPress={()=>navigation.navigate('FrendsMsg')}><Text style={[styles.btn]}>Message</Text></TouchableOpacity>

     {
        isfollow ? <TouchableOpacity onPress={()=>setIsFollow(!isfollow)}><Text style={[styles.btn,{backgroundColor:'darkgreen'}]}>following</Text></TouchableOpacity> : <TouchableOpacity  onPress={()=>setIsFollow(!isfollow)}><Text style={[styles.btn,{backgroundColor:'red'}]}>Follow</Text></TouchableOpacity>
     }
     
     </View>
    </View>
  )
}

export default SecondProfileDetailContainer

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: hp('2%'),
        marginVertical: hp('2%'),
        backgroundColor:'white',
        elevation:5,
        borderRadius:hp('2%'),
        padding:hp('2%'),
        marginTop:hp('8%')
      },
    imgCont: {
        height: hp('13.7%'),
        width: wp('30.5%'),
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: hp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        elevation: 5,
        position:'absolute',
        top:hp('-4%'),
        left:hp('2%'),
        borderWidth:2,
        borderColor:'darkgreen',
        // borderColor:'goldenrod'
      },
      img: {
        height: hp('12.5%'),
        width: wp('25.5%'),
        
      },
      textConatiner:{
        width:wp('54%'),
        alignSelf:'flex-end',
        // marginTop:hp('8%'),
        // gap:hp('0.8%')
      },
      subTitle:{
        color:'gray',
        fontSize:hp('1.5%'),
        marginLeft:hp('1%')
      },
      description:{
        marginTop:hp('3%'),
      },
      btn:{
        backgroundColor:'gray',
        padding:hp('0.5%'),
        paddingHorizontal:hp('2.5%'),
        borderRadius:hp('1%'),
        margin:hp('1%'),
        color:'white',
        fontWeight:'700',
        marginTop:hp('2%')
        
      }
})