import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import ActivityCard from "./ActivityCard";
import { db } from "../firebase";
import {doc, getDocs,collection} from 'firebase/firestore';

export const Itinerary = () => {
  const itineraryId = '78ruraYl5IjQENjn2S9A';
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
      console.log(itinerary, "From useEffect")
      setUserItinerary(itinerary[0])
    })

  }, [])
  
  return (
    <View style={styles.itinerary}>
      <Text style={{ marginTop: "5%", fontSize: "120%", fontWeight: "bold" }}>
        {" "}
        My Itinerary{" "}
      </Text>
      {userItinerary.length === 0 ? (
        <Text> Empty Itinerary </Text>
      ) : (
        <FlatList
          style={{ width: "90%", height: "70%", padding: "10%" }}
          data={userItinerary.activities}
          renderItem={({ item: activity }) => (
            <ActivityCard activity={activity}/>
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
