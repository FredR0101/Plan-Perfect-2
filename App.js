import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./Components/Header";
import { Navigation } from "./Components/Navigation";
import { Home } from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Recommendations } from "./Components/Recommendations";
import { Profile } from "./Components/Profile";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
    <Header/>
    <NavigationContainer>
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Recommendations" component={Recommendations} />
        <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
