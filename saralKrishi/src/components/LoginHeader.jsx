import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const LoginHeader = () => {
    const navigation = useNavigation();
return (
    <View style={styles.container}>
    
        <View style={styles.innerCont}>
      <Image source={require('../assets/home.png')} style={styles.image} />
            <Text style={styles.tittle}>Saral Krishi</Text>
        </View>
 
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Navigation')}>
            <Text style={styles.btnTxt}>Skip</Text>
            <AntDesign name="arrowright" size={20} color="gary" />
        </TouchableOpacity>

    </View>
);
};

export default LoginHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 2,
    paddingHorizontal: '2%',
  
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    paddingVertical:10,
    

    
  },
  innerCont:{
    flexDirection:'row',
    gap:5,
    alignItems:'center',
  },
  tittle:{
    fontSize:20,
    fontWeight:'600',
  },
  btn:{
    // paddingVertical:5,
    // paddingHorizontal:15,
    height:40,
    width:80,
    backgroundColor:'white',
    borderRadius:10,
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'row',
   gap:5,
   elevation:2,
  },
  btnTxt:{
    color:'red',
    fontSize:16,
    fontWeight:'600',
  }, image:{
    shadowColor: '#000',
    
  }
});
