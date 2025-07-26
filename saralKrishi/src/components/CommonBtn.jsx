import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CommonBtn = ({width, title,icon,color}) => {
  return (
    <TouchableOpacity style={[styles.container, {width: width,backgroundColor:color ? color : 'green' }]}>
      <View>
      {icon}
      </View>
      <Text style={{color: 'white',fontSize:20,fontWeight:'600'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonBtn;

const styles = StyleSheet.create({
  container: {height: 45,
    
      borderRadius: 20,
      justifyContent:'start',
      alignItems:'center',
      alignSelf:'center',
      gap:20,
      flexDirection:'row',
      paddingLeft:30,
      marginBottom:10,
    },
});
