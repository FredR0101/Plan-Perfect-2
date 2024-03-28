import {
  updateDoc,
  doc,
  arrayRemove,
} from "firebase/firestore";

import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../firebase";
import { ScrollView } from "react-native-web";
//{activity}
const ActivityCard = ({userItinerary}) => {

 
  const handleDeleteButton = (value) => {
    console.log(value);
  };

  const allActivities = userItinerary[0].activities
  const activityId = userItinerary[0].id

  return (
    <>
    <ScrollView >
    {allActivities.map((activity) => {
    return(
    <View key={activity.name} style={styles.activityCard}>
      <Image
        style={{
          height: "50%",
          width: "100%",
          border: "1px solid black",
          borderRadius: "5%",
        }}
        source={{
          uri: activity.image,
        }}
      />
      <Text
        style={{ textAlign: "center", fontWeight: "bold", paddingBottom: 5 }}
      >
        {activity.name}
      </Text>
      <Text style={styles.activityInfo}>{activity.description}</Text>
      <Text style={styles.activityInfo}>Location: {activity.location}</Text>
      <Text style={styles.activityInfo}>Price: £{activity.price}</Text>
      <Text style={styles.activityInfo}>Date: {activity.date}</Text>
      <Text style={styles.activityInfo}>
        Number of people: {activity.people}
      </Text>
      <Pressable onPress={() => handleDeleteButton(activity.name)}>
        <Text
          style={{
            backgroundColor: "#7743DB",
            border: "1px solid #C3ACD0",
            color: "white",
            height: 30,
            width: 100,
            textAlign: "center",
            marginTop: 10,
            paddingTop: 5,
          }}
        >
          Delete activity
        </Text>
      </Pressable>
      <Pressable onPress={() => handleUpdateButton(activity.name)}>
        <Text
          style={{
            backgroundColor: "#7743DB",
            border: "1px solid #C3ACD0",
            color: "white",
            height: 30,
            width: 150,
            textAlign: "center",
            marginTop: 10,
            paddingTop: 5,
          }}
        >
          Update Activity
        </Text>
      </Pressable>
    </View>
    )
  })}
    </ScrollView>
    </>
  );
};

export const styles = StyleSheet.create({
  activityCard: {
    marginTop: 70,
    border: "1px solid black",
    backgroundColor: "#C3ACD0",
    height: 400,
    width: 500,
  },
  activityInfo: {
    textAlign: "left",
  },
});
export default ActivityCard;
