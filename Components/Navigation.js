import * as React from "react"; 
import {createDrawerNavigator} from '@react-navigation/drawer'
import { HomePage } from "./HomePage.js";
import {Recommendations} from './Recommendations'
import {MainProfile} from "./MainProfile"
import { Home } from "./Home.js";



const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <>
      <Drawer.Navigator>
          <Drawer.Screen name="My Trips" component={HomePage} />
          <Drawer.Screen name="Recommendations" component={Home} />
          <Drawer.Screen name="Profile" component={MainProfile} />
      </Drawer.Navigator>
    </>
  );
};
