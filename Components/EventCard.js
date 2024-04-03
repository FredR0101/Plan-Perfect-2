import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons'

export const EventCard = ({ event }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.eventCard}>
        <Image
          style={[
            {
              height: 200,
              width: "fitContent",
              borderRadius: 10,
            },
            styles.eventInfo,
          ]}
          source={{
            uri: event.image,
          }}
        />
        <Text style={[styles.eventInfo, styles.eventName]}>{event.name}</Text>
        <Text style={styles.eventInfo}> <Entypo name="location-pin" size={24} color="black" /> {event.location}</Text>
        <Text style={styles.eventInfo}>
          {event.description && event.description.slice(0, 120)}...
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Single Event", { event });
          }}
        >
          <Text style={styles.btn}>View More</Text>
        </Pressable>
    </View>
  );
};

export const styles = StyleSheet.create({
  eventCard: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    paddingBottom: 5,
    backgroundColor: "#FFFBF5",
    height: "300%",
    padding: 15,
    borderRadius: 10,
    border: "1px solid #F7EFE5",
  },
  eventInfo: {
    alignItems: "center",
    paddingBottom: 20,
  },
  eventName: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  btn: {
    width: "100%",
    backgroundColor: "#7743DB",
    height: 40,
    paddingTop: 10,
    marginBottom: 10,
    color: "white",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "1px solid #7743DB",
    borderRadius: 10,
  },
});

