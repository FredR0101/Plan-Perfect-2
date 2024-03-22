import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./Components/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
 

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


