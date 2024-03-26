import { View, Text, StyleSheet, Pressable } from "react-native"
import { db } from "../firebase"
import { doc, getDocs, collection, query, where } from 'firebase/firestore'
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";


export const itinerariesList = () => {

    const [itinerary, setItinerary] = useState([])
    const [activity, setActivity] = useState([])

    useEffect(() => {
        const fetchData = collection(db, "test-itineraries")
        getDocs(fetchData).then((data) => {
            const itineraryData = []
            data.docs.forEach((doc) => {
                itineraryData.push({ ...doc.data(), id: doc.id })
            })
            setItinerary(itineraryData)
        })

    }, [])


    const navigation = useNavigation()


    return (
        <>
            <Text>My Trips</Text>

            <View style={styles.container}>
                {itinerary.map((data) => {
                    return (
                        <View style={styles.card} key={data.id}>
                            <Pressable onPress={() => {
                                navigation.navigate('Recommendations', {
                                    screen: 'My Itinerary',
                                    params: { id: data.id }
                                })
                            }}>
                                <Text>Name: {data.name} </Text>
                                <Text>Location: {data.location}</Text>
                                <Text>Dates: {data.startDate} to {data.endDate}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </View>

        </>


    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    card: {
        marginBottom: 50,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#7fffd4',
        padding: 20
    }
})