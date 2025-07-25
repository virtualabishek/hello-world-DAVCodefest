import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




const MainStack = () => {
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
    <Stack.Screen name="WelComePage" component={WelComePage} />
    </Stack.Navigator>
}

export default MainStack;