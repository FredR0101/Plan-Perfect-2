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

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
        <Text style={styles.eventItem}> <Entypo name="location-pin" size={24} color="black" /> {event.location}</Text>
        <Text style={styles.eventItem}> <Ionicons name="pricetags-outline" size={24} color="black" /> £{event.price}</Text>
        <Text style={styles.eventItem}> <FontAwesome name="calendar-o" size={24} color="black" /> {event.date}</Text>
        <Text style={styles.eventItem}> <FontAwesome6 name="people-group" size={24} color="black" /> {event.people}</Text>

        <View style = {styles.whiteContainer}>
          
          <Text style={[styles.eventItem, styles.AddToItinerarySection]}>
            Add this event to one of your itineraries? Select from below:

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

  whiteContainer: {
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    backgroundColor: "#FFFBF5",
    padding: 15,
    borderRadius: 10,
    border: "1px solid #F7EFE5",
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
