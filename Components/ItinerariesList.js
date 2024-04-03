import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, SafeAreaView } from "react-native";
import { db } from "../firebase";
import { doc, getDocs, collection, deleteDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SingleItineraryNav } from "./SingleItineraryNav";
import { auth } from "../firebase";
import Ionicons from '@expo/vector-icons/Ionicons';
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
      <ScrollView style={styles.background}>
        {itinerary.map((data) => {
          return (
            <View style={styles.card} key={data.id}>
                <Text style={styles.cardTitle}>Name: {data.name} </Text>
                <Text style={styles.cardLocation}>Location: {data.location}</Text>
                <Text style={styles.cardDates}>
                  Dates: {data.startDate} to {data.endDate}
                </Text>
              <Pressable style={styles.viewTripButton}
                onPress={() => {
                  navigation.navigate("Single Itinerary", {
                    screen: "My Itinerary",
                    params: {
                      itineraryId: data.id,
                      itineraryName: data.name
                    },
                  });
                  <SingleItineraryNav tripId = {data.id}/>
                }}
              >
                <Text>View Trip</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={() => handleOnPress(data.id)}>
                <Text>
                  Delete
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
  },
  background: {
    backgroundImage: 'linear-gradient(to bottom right, transparent, #7743DB)',
  },
  card: {
    color: '#7743DB',
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: '#FFFBF5',
    borderColor: "#FFFBF5",
    padding: 20,
    marginHorizontal: 25,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#7743DB',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 2,
    shadowColor: '#7743DB',
    textShadowColor: '#7743DB'
  },
  cardLocation: {
    fontSize: 16,
    fontWeight: '450',
    color: '#7743DB',
    textAlign: 'center'
  },
  cardDates: {
    color: '#7743DB',
    justifyContent: 'center',
    margin: 2,
    marginBottom: 7,
    textAlign: 'center'
  },
  deleteButton: {
    color: '#7743DB',
    borderRadius: 5,
    borderWidth: -3,
    backgroundColor: '#F7EFE5',
    borderColor: "#F7EFE5",
    padding: 10,
    marginRight: 250,
    alignItems: 'center',
    alignContent: 'center',
    width: 38,
    position: 'absolute',
    bottom: 2,
    right: 20,
    height: 36,
    elevation: 5
  },
  viewTripButton: {
    width: "80%",
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
    bottom: -10,
    left: 33
  },
});