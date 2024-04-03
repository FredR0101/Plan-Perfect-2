import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { db } from "../firebase";
import { updateDoc, collection, doc, getDocs, arrayUnion, query, where} from "firebase/firestore";
import { auth } from "../firebase";


export const SingleEvent = ({
  route: {
    params: { event },
  },
}) => {
  const navigation = useNavigation();
  const [itineraryId, setItineraryId] = useState("first");
  const [itineraries, setItineraries] = useState([]);

  const handleAddToItinerary = () => {
    const eventToAdd = { ...event };
    delete eventToAdd.id;

    const activityRef = doc(db, "test-activities", itineraryId);
    updateDoc(activityRef, {
      activities: arrayUnion(eventToAdd),
    })
      .then(() => {
        alert("Activity added to itinerary");
      })
      .catch(() => {
        alert("Error when adding activity");
      });
  };

      useEffect(() => {
        const uid = auth.currentUser.uid;
        const fetchData = collection(db, "test-itineraries");
        const userQuery = query(fetchData, where("uid", "==", uid));
        getDocs(userQuery).then((data) => {
          const itineraryData = [];
          data.docs.forEach((doc) => {
            itineraryData.push({ ...doc.data(), id: doc.id });
          });
          setItineraries(itineraryData);
        });
      }, []);

  return (
    <ScrollView style={styles.singleEventPage}>
      <Pressable
        onPress={() => navigation.navigate("Recommendations")}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}> Go Back to All Events </Text>
      </Pressable>
      <View style={styles.singleEventContainer}>
        <View style={styles.imageBox}>
          <Image
            style={[styles.eventItem, styles.image]}
            source={{
              uri: event.image,
            }}
          />
        </View>
        <Text style={[styles.eventName, styles.eventItem]}>{event.name}</Text>
        <Text style={styles.eventItem}>{event.description}</Text>
        <Text style={styles.eventItem}>Location: {event.location}</Text>
        <Text style={styles.eventItem}>Price: £{event.price}</Text>
        <Text style={styles.eventItem}>Date: {event.date}</Text>
        <Text style={styles.eventItem}>Number of people: {event.people}</Text>
        <Text style={[styles.eventItem, styles.AddToItinerarySection]}>
          If you want to add this event to your itinerary, Please choose the
          itinerary from the following and submit:
        </Text>
        {itineraries.map((itinerary) => {
          return (
            <View style={{ flexDirection: "row" }} key={itinerary.id}>
              <RadioButton
                value={itinerary.id}
                status={itineraryId === itinerary.id ? "checked" : "unchecked"}
                onPress={() => setItineraryId(itinerary.id)}
              />
              <Text style={{ paddingTop: "3%" }}> {itinerary.name} </Text>
            </View>
          );
        })}

        <Pressable onPress={() => handleAddToItinerary()} style ={styles.addBtnContainer}>
          <Text style={styles.addBtnText}> Add to Itinerary </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  singleEventPage: {
    backgroundImage: "linear-gradient(to bottom right, transparent, #7743DB)",
  },
  btnContainer: {
    margin: "5%",
  },
  btnText: {
    backgroundColor: "#7743DB",
    border: "2px solid #C3ACD0 ",
    borderRadius: "5%",
    color: "white",
    width: "50%",
    textAlign: "center",
    padding: "2%",
  },
  singleEventContainer: {
    margin: "5%",
    height: "70%",
    marginBottom: "20%",
    fontFamily: "sans-serif-medium",
  },
  eventItem: {
    paddingBottom: 20,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "300px",
    width: "100%",
    border: "1px solid #C3ACD0 ",
    borderRadius: "5%",
  },
  eventName: {
    textAlign: "left",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 25,
  },
  AddToItinerarySection: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 15,
  },
  addBtnContainer: {
    marginTop: '8%',
  },
  addBtnText :{
    backgroundColor: "#7743DB",
    border: "2px solid #C3ACD0 ",
    borderRadius: "5%",
    color: "white",
    width: "50%",
    textAlign: "center",
    padding: "2%",
}
});
