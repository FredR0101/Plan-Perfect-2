import { Image, StyleSheet, Text, View } from "react-native";

export const EventCard = ({ event }) => {
  return (
    <View style={styles.eventCard}>
      <Image
        style={{
          height: "200%",
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
    </View>
  );
};

export const styles = StyleSheet.create({
  eventCard: {
    flex: 1,
    marginTop: "40%",
    marginBottom: "40%",
    paddingTop: '30%',
    height: "100%",
    width: "100%",
    
  },
  eventInfo: {
    textAlign: "left",
    color: 'white',
    
  },
});
