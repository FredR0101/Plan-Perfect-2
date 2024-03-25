const { View, Text } = require("react-native");
import * as React from "react";
import { auth } from "../firebase";
import { Pressable } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const navigation = useNavigation();


  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
      <Pressable onPress={handleSignout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};
