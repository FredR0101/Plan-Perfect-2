import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const EventCard = ({ event }) => {
  const navigation = useNavigation()
  return (
    <>
    <View style={styles.eventCard}>
    <Pressable onPress={() => {navigation.navigate("Single Event", {event})}}> 
      <Image
        style={{
          height: "120%",
          width: "100%",
          border: "4px solid #C3ACD0",
          borderRadius: "5%",
        }}
        source={{
          uri: event.image,
        }}
      />
      <Text style={styles.eventInfo}>{event.name}</Text>
      <Text style={styles.eventInfo}>{event.description}</Text>
      <Text style={styles.eventInfo}>Location: {event.location}</Text>

      <Text style={styles.button}> Click On Event Card To View More </Text>
    </Pressable>
    </View>
    </>
  );
};

export const styles = StyleSheet.create({
  eventCard: {
    flex: 1,
    marginBottom: "85%",
    paddingTop: '30%',
    height: "100%",
    width: "100%",
    
  },
  eventInfo: {
    textAlign: "left",
  },
  button: {
    backgroundColor: "#7743DB",
    border: "4px solid #C3ACD0 ",
    borderRadius: "10%",
    color: "white",
    width: "100%",
    textAlign: "center",
    float: "center",
    padding: "5%",
    fontSize: "80%"
}
});
