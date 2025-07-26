import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


const { width } = Dimensions.get('window');

const IndicatorBox = ({img,label}) => {
  return (
    <View style={styles.container}>
      <View>
      <Image source={img} style={styles.image}/>
      </View>
     
    </View>
  )
}

export default IndicatorBox

const styles = StyleSheet.create({
    container:{
        height: width * 0.176,
        width: width * 0.189,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginBottom: width * 0.02,
        flexDirection:'column',
        justifyContent: 'space-evenly',
        alignItems: 'end',
        padding: width * 0.02,
        elevation: 5,
        // marginTop:heightPercentageToDP('1.8%')
    },
    image: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain'
    },
})