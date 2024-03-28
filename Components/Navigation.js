import * as React from "react"; 
import {createDrawerNavigator} from '@react-navigation/drawer'
import { HomePage } from "./HomePage.js";
import {NavRecommendations} from './NavRecommendations'
import {MainProfile} from "./MainProfile"



const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <>
      <Drawer.Navigator>
          <Drawer.Screen name="My Trips" component={HomePage} />
          <Drawer.Screen name="Recommendations" component={NavRecommendations} />
          <Drawer.Screen name="Profile" component={MainProfile} />
      </Drawer.Navigator>
    </>
  );
};
