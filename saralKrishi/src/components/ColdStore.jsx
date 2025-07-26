import { StyleSheet, Text, View,TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

const ColdStore = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('ColdStorePage')} >
        <ImageBackground source={require('../assets/coldStore.png')} imageStyle={{borderRadius:hp('1%')}} style={styles.bgcImg}>   
            <View style={{justifyContent:'space-between',flexDirection:'row',alignContent:'center',marginTop:hp('13%')}}>

       <View style={{width:wp('45%'),backgroundColor:'lightgray',borderRadius:3}}>
        <Text style={{fontSize:hp('2%'),fontWeight:'800',marginLeft:hp('2%')}}>Cold Store Near Me</Text>
       </View>
      <TouchableOpacity >
        <Text style={styles.btn}>Contact Now !!</Text>
      </TouchableOpacity>
            </View>
      </ImageBackground>

    </TouchableOpacity>
  )
}

export default ColdStore

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'red',
        paddingVertical:hp('0.56%'),
        paddingHorizontal:hp('1%'),
        fontSize: hp('1.5%'),
        color:'white',
        width:wp('30%'),
        borderRadius:hp('1%'),
        marginRight:hp('1.5%')
    },
    bgcImg:{
        height:hp('20%'),
        width:wp('90%'),
        // borderRadius:hp('5%')
        borderRadius:30
    }
})