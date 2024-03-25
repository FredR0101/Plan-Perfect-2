import { View, Text } from "react-native"
import { db } from "../firebase"
import {doc, getDocs, collection, query, where} from 'firebase/firestore'
import { useEffect, useState } from "react"

export const itinerariesList = () => {

    const [itinerary, setItinerary] = useState([])

    useEffect(() => {
        const fetchData = collection(db, "test-itineraries")
        getDocs(fetchData).then((data) => {
            const itineraryData = []
            data.docs.forEach((doc) => {
                itineraryData.push({ ...doc.data(), id: doc.id })
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
    return (
        <>
            <Text>Your Itineraries</Text>

            <View>
                {itinerary.map((data) => {
                    return (
                        <View key={data.id}>
                            <Text>Name: {data.name} </Text>
                            <Text>Location: {data.location}</Text>
                            <Text>Dates: {data.startDate} to {data.endDate}</Text>
                        </View>
                    )
                })}
            </View>

        </>


    )
}