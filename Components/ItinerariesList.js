import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, SafeAreaView } from "react-native";
import { db } from "../firebase";
import { doc, getDocs, collection, deleteDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SingleItineraryNav } from "./SingleItineraryNav";
import { auth } from "../firebase";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
     deleteDoc(doc(db, 'test-activities', deleteId))
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
                <Text style={styles.cardTitle}>{data.name} </Text>

                <View style={styles.locationAlignment}>
                <Entypo name="location-pin" size={24} color="#7743DB" />
                <Text style={styles.cardLocation}>{data.location}</Text>
                </View>
                <View style={styles.dateAlignment}>
                <FontAwesome name="calendar-o" size={22} color="#7743DB" />
                <Text style={styles.cardDates}>
                  {data.startDate} to {data.endDate}
                </Text>
                </View>

                <View style={styles.buttonContainerDelete}>
              <Pressable style={styles.buttonDelete}
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
                <Text style={styles.buttonTextDelete}>View Trip</Text>
              </Pressable>
              <Pressable style={styles.buttonDelete} onPress={() => handleOnPress(data.id)}>
              <Text style={styles.buttonTextDelete}>Delete</Text>
              </Pressable>
              </View>
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
    color: '#C3ACD0',
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: '#FFFBF5',
    borderColor: "#FFFBF5",
    padding: 20,
    marginHorizontal: 25,
    marginTop: 20,
    height: 180
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 2,
    shadowColor: '#7743DB',
    textShadowColor: '#7743DB'
  },
  cardLocation: {
    fontSize: 16,
    fontWeight: '450',
    color: 'black',
    textAlign: 'center',
    top: 5,
    textTransform: 'capitalize'
  },
  locationAlignment: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardDates: {
    color: 'black',
    fontWeight: '450',
    justifyContent: 'center',
    margin: 2,
    marginBottom: 7,
    textAlign: 'center',
    fontSize: 15,
    top: 5,
    left: 3,
  },
  dateAlignment: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainerDelete: {
    flexDirection: 'row',
    flex: 0,
    gap: 10,
    bottom: 70,
    left: -5
  }, 
  buttonDelete: {
    display: "flex", 
    backgroundColor: "#7743DB",
    width: "50%", 
    padding: 15,
    paddingRight: 60,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 80,
    height: 50,
  },
  buttonTextDelete: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    left: "29%",
    textAlign: 'center',
  },
});