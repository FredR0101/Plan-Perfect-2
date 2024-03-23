import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './Components/Home';
import { Recommendations } from "./Components/Recommendations";
import { Profile } from "./Components/Profile";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
    <StatusBar/>
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


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
