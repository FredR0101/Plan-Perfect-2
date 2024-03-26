import { Image, StyleSheet, Text, View } from "react-native";

const ActivityCard = ({ activity }) => {
  return (
    <View style={styles.activityCard}>
      <Image
        style={{
          height: "200%",
          width: "100%",
          border: "1px solid black",
          borderRadius: "5%",
        }}
        source={{
          uri: activity.image,
        }}
      />
      <Text style={styles.activityInfo}>{activity.name}</Text>
      <Text style={styles.activityInfo}>{activity.description}</Text>
      <Text style={styles.activityInfo}>Location: {activity.location}</Text>
      <Text style={styles.activityInfo}>Price: £{activity.price}</Text>
      <Text style={styles.activityInfo}>Date: {activity.date}</Text>
      <Text style={styles.activityInfo}>
        Number of people: {activity.people}
      </Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  activityCard: {
    flex: 1,
    marginTop: "40%",
    paddingTop: '30%',
    height: "100%",
    width: "100%",
  },
  activityInfo: {
    textAlign: "left",
    
  },
});
export default ActivityCard;
