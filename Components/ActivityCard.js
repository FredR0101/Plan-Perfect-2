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
          height: 200,
          width: "100%",
          borderRadius: 10,
        }}
        source={{
          uri: activity.image,
        }}
      />
      <Text
        style={styles.activityName}
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
      <View style={styles.btnContainer}>
        <Pressable onPress={() => handleUpdateButton(activity.name)}>
          <Text style={styles.btn}> Update Activity </Text>
        </Pressable>
        <Pressable onPress={() => handleDeleteButton(activity.name)}>
          <Text style={styles.btn}> Delete Activity </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  activityCard: {
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

  activityName: {
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: "bold",
    fontSize: 20

  },

  activityInfo: {
    paddingBottom: 20,
    alignItems: "center",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
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
  }
});
export default ActivityCard;
