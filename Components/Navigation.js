import * as React from "react"; 
import {createDrawerNavigator} from '@react-navigation/drawer'
import { Home } from "./Home";
import {Recommendations} from './Recommendations'
import {MainProfile} from "./MainProfile"


const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <>
      <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Recommendations" component={Recommendations} />
          <Drawer.Screen name="Profile" component={MainProfile} />
      </Drawer.Navigator>
    </>
  );
};
