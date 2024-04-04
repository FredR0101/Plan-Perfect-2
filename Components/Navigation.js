import * as React from "react"; 
import {createDrawerNavigator} from '@react-navigation/drawer'
import { HomePage } from "./HomePage.js";
import {Recommendations} from './Recommendations'
import {MainProfile} from "./MainProfile"
import { SingleItineraryNav } from "./SingleItineraryNav.js";
import { SingleEvent } from "./SingleEvent.js";



const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <>
      <Drawer.Navigator>
          <Drawer.Screen name="My Trips" component={HomePage} />
          <Drawer.Screen name="Recommendations" component={Recommendations} />
          <Drawer.Screen name="Profile" component={MainProfile} />
          <Drawer.Screen name="My Itinerary" component={SingleItineraryNav} options={{drawerItemStyle: {height: 0}}} />
          <Drawer.Screen name="Single Event" component={SingleEvent} options={{drawerItemStyle: {height: 0}}} />
      </Drawer.Navigator>
    </>
  );
};
