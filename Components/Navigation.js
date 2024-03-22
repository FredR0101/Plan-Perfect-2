import * as React from "react";
import { View, Text, Pressable } from "react-native";   
import {useNavigation} from "@react-navigation/native"

export const Navigation = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Recommendations")}>
        <Text>Recommendations</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </Pressable>
    </View>
  );
};
