/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {View} from "react-native"
import MainStack from "./src/stack/MainStack"
const App = () => {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <MainStack />
      </View>
    </NavigationContainer>
  )
}

export default App;
