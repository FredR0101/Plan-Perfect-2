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

const ActivityCard = ({ activity, itineraryId, setUserItinerary }) => {
  const handleDeleteButton = (activityName) => {
    const activityRef = doc(db, "test-activities", itineraryId);
    updateDoc(activityRef, {
      activities: arrayRemove(activity),
    })
      .then(() => {
        alert("Activity deleted");
        setUserItinerary((currActivities) => {
          const copyCurrActivities = [...currActivities];
          const activitiesToKeep = copyCurrActivities[0].activities.filter(
            (currActivity) => {
              return currActivity.name !== activityName;
            }
          );
          return [{ activities: activitiesToKeep }];
        });
      })
      .catch(() => {
        alert("Oops! something went wrong!");
        setUserItinerary((currActivities) => {
          return currActivities;
        });
      });
  };


  const handleUpdateButton = (activityName) => {
    console.log("clicked")
  }

  return (
    <View style={styles.activityCard}>
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
