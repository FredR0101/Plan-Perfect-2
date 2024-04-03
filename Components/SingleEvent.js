import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';
import { db } from "../firebase";
import { updateDoc, collection, doc, getDocs, arrayUnion, query, where} from "firebase/firestore";
import { auth } from "../firebase";


export const SingleEvent = ({route: {params: {event}}}) => {
    const navigation = useNavigation()
    const [itineraryId, setItineraryId] = useState("first");
    const [itineraries, setItineraries] = useState([])

    const handleAddToItinerary = () => {
        const eventToAdd = {...event}
        delete eventToAdd.id

        const activityRef = doc(db, 'test-activities', itineraryId);
        updateDoc(activityRef, {
            activities: arrayUnion(eventToAdd)
        })
        .then(() => { alert("Activity added to itinerary")})
        .catch(() => { alert("Error when adding activity")})
    }

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
        <>
        <ScrollView style = {{marginLeft: "5%", marginRight: "5%", marginTop: "5%"}}>
            <View >
            <Pressable onPress = {() => navigation.navigate("Recommendations")}>
                <Text style={styles.button}> Go Back to All Events </Text>
            </Pressable>
            </View>
            <View style={styles.imageBox}>
                <Image
                style= {styles.image}
                source={{
                uri: event.image,
                }}
                />
            </View>
            <Text
                style={{ textAlign: "left", fontWeight: "bold", paddingBottom: 5, fontSize: "110%" }}
            >
                {event.name}
            </Text>
            <Text style={styles.eventInfo}>{event.description}</Text>
            <Text style={styles.eventInfo}>Location: {event.location}</Text>
            <Text style={styles.eventInfo}>Price: £{event.price}</Text>
            <Text style={styles.eventInfo}>Date: {event.date}</Text>
            <Text style={styles.eventInfo}>
                Number of people: {event.people}
            </Text>
           
                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: "20%", fontSize: "110%" }}> Add to An Itinerary </Text>
                {
                itineraries.map(itinerary => {
                    return (
                        <View style={{flexDirection: "row"}} key={itinerary.id}>
                            <RadioButton 
                            value= {itinerary.id}
                            status={ itineraryId === itinerary.id ? 'checked' : 'unchecked' }
                            onPress={() => setItineraryId(itinerary.id)}
                            />
                            <Text style={{paddingTop: "3%"}}> {itinerary.name} </Text>
                        </View>

                    )
                })
                }

                <Pressable onPress = {() => handleAddToItinerary()}>
                    <Text style={styles.button}> Submit </Text>
                </Pressable>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    imageBox: {
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        height: "200px",
        width: "200px",
        border: "4px solid #C3ACD0 ",
        borderRadius: "100%",
        },

    eventInfo: {
        textAlign: "left",
    },
    
    button: {
        marginBottom: "3%",
        backgroundColor: "#7743DB",
        border: "2px solid #C3ACD0 ",
        borderRadius: "5%",
        color: "white",
        width: "50%",
        textAlign: "center",
        padding: "2%",
    }
})


