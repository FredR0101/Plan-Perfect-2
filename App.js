import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { Home } from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import { Navigation } from "./Components/Navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./Components/SignUpPage";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
          />
             <Stack.Screen
               options={{ headerShown: false }}
               name="Nav"
               component={Navigation}
             />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

