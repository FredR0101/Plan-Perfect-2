import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export const Itinerary = () => {

  const [userItinerary, setUserItinerary] = useState([]);
  return (
    <View style={styles.itinerary}>
      <Text style={{ marginTop: "5%", fontSize: "120%", fontWeight: "bold" }}>
        {" "}
        My Itinerary{" "}
      </Text>
      {userItinerary.length === 0 ? (
        <Text> Empty Itinerary </Text>
      ) : (
        <Text> Itinerary </Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  itinerary: {
    backgroundColor: "lightgrey",
    flex: 1,
    width: "90%",
    alignItems: "center",
    border: "1px solid black",
  },
});
