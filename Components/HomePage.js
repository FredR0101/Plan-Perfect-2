import { Pressable, Text , Button} from "react-native"
import { db } from "../firebase"
import {doc, getDocs, collection, query, where} from 'firebase/firestore'
import { useEffect, useState } from "react"
import { View } from "react-native-web"
import { AddItinerary } from "./AddItinerary"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export const HomePage = ({navigation}) => {
    const [itinerary, setItinerary] = useState([])

    useEffect(() => {
        const fetchData = collection(db, "test-itineraries")
        getDocs(fetchData).then((data) => {
            const itineraryData = []
            data.docs.forEach((doc) => {
                itineraryData.push({...doc.data(), id:doc.id})
            })
            setItinerary(itineraryData)
        }) 
        
       

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        //   } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        //   }

    }, [])
      

    const Tab = createBottomTabNavigator();
    return (
        <>
            <Text>Your Itineraries</Text>

            <View>
                <Text>{itinerary.map((data) => {
                    console.log(data);
                    return (
                    <View key={data.id}>
                        <Text>Name: {data.name} </Text>
                        <Text>Location: {data.location}</Text>
                        <Text>Dates: {data.startDate} to {data.endDate}</Text>
                        </View>
                    )
                })}</Text>
            </View>
            
            <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='HomePage'>
            <Tab.Screen name="Add Itinerary" component={AddItinerary}/>
            </Tab.Navigator>

        </>
    )
}