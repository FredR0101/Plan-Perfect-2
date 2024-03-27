import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditUser from "./EditUser";
import { Profile } from "./Profile";
export const MainProfile = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Tab.Screen name="My Profile" component={Profile} />
      <Tab.Screen name="Profile settings" component={EditUser} />
    </Tab.Navigator>
  );
};
