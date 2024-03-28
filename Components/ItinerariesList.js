import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, SafeAreaView } from "react-native";
import { db } from "../firebase";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SingleItineraryNav } from "./SingleItineraryNav";
import { auth } from "../firebase";


export const ItinerariesList = () => {
  const navigation = useNavigation();
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const fetchData = collection(db, "test-itineraries");
    const userQuery = query(fetchData, where("uid", "==", uid));
    getDocs(userQuery).then((data) => {
      const itineraryData = [];
      data.docs.forEach((doc) => {
        itineraryData.push({ ...doc.data(), id: doc.id });
      });
      setItinerary(itineraryData);
    });
  }, []);

  const handleOnPress = (deleteId) => {
   deleteDoc(doc(db, 'test-itineraries', deleteId))
   .then(() => {
     navigation.navigate('My Trips')
     alert('Your trip has been deleted')
   })
   .catch((err) => {
    alert(err, 'Something went wrong')
   });
  };

  return (
    <>
      <ScrollView>
        {itinerary.map((data) => {
          return (
            <View style={styles.card} key={data.id}>
              <Pressable
                onPress={() => {
                  navigation.navigate("Single Itinerary", {
                    screen: "My Itinerary",
                    params: {
                      itineraryId: data.id,
                      itineraryName: data.name
                    },
                  });
                }}
              >
                <Text>Name: {data.name} </Text>
                <Text>Location: {data.location}</Text>
                <Text>
                  Dates: {data.startDate} to {data.endDate}
                </Text>
                <Text>View Trip</Text>
              </Pressable>
              <Pressable onPress={() => handleOnPress(data.id)}>
                <Text>
                  Delete Trip
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    marginBottom: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#7fffd4",
    padding: 20,
  },
});
