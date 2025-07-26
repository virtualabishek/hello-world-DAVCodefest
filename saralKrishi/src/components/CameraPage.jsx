import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'


const CameraPage = () => {
  const devices = Camera.getAvailableCameraDevices()
  const device = useCameraDevice('back')
  const camera = useRef(null)
  const { hasPermission } = useCameraPermission()

  if (!hasPermission) return <Text>No Camera Device</Text>
  if (device == null) return <Text>Camera is ready</Text>

  const takePhoto = async () =>{
const photo = await camera.current.takePhoto({
  flash:'auto'
});
  }
  return (
    <View style={{flex:1}}>
        <Camera
        ref={camera}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo={true}
    />
    <TouchableOpacity style={styles.btn} onPress={takePhoto}></TouchableOpacity>
    </View>
  )
}

export default CameraPage

const styles = StyleSheet.create({
  btn:{
    height:60,
    width:60,
    borderRadius:50,
    backgroundColor:'red',
    position:'absolute',
    bottom:30,
    alignSelf:'center',
  }
})