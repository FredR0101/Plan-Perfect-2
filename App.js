import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Components/Home';
import AddActivity from './Components/AddActivity';
import { Navigation } from "./Components/Navigation";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Recommendations } from "./Components/Recommendations";
import { Profile } from "./Components/Profile";

const Stack = createNativeStackNavigator();
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen style={styles.container} name="AddActivity" component={AddActivity} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
