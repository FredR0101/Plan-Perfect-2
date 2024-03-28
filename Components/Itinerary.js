import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import ActivityCard from "./ActivityCard";
import { db } from "../firebase";
import {doc, getDocs,collection, query, where} from 'firebase/firestore';

export const Itinerary = ({route}) => {
const itineraryId = route.params.itineraryId;
const [userItinerary, setUserItinerary] = useState([]);
  
  useEffect(() => {
    const itineraryRef = collection(db, 'test-activities')
    getDocs(itineraryRef)
    .then((snapshot) => {
      const itinerary = []
      snapshot.docs.forEach((doc) => {
        if(doc.id === itineraryId){
          itinerary.push({...doc.data(), id: doc.id})
        }
      })
      setUserItinerary(itinerary)
    })

  }, [])

  return (
    <View style={styles.itinerary}>
      <Text style={{ marginTop: "5%", fontSize: "120%", fontWeight: "bold" }}>
        {" "}
        My Itinerary{" "}
      </Text>
      {userItinerary.length <= 1 ? (
        <Text> Empty Itinerary </Text>
      ) : (
        <FlatList
          style={{ width: "90%", height: "70%", padding: "10%" }}
          data={userItinerary[0].activities}
          renderItem={({ item: activity }) => (
            <ActivityCard activity={activity} itineraryId = {itineraryId} />
          )}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  itinerary: {
    backgroundColor: "lightgrey",
    flex: 1,
    width: "100%",
    alignItems: "center",
    border: "5px solid black",
  },
});
