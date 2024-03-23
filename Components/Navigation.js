import * as React from "react"; 



const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <>
      <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Recommendations" component={Recommendations} />
          <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </>
  );
};
