import { useEffect, useState } from 'react'
import { View, Text, FlatList } from "react-native";
import { db } from "../firebase";
import { doc, getDocs, collection, query, where} from 'firebase/firestore';
import * as React from 'react';
import { Map } from './Map.js'
import ActivityCard from './ActivityCard.js'


export const Recommendations = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const eventsRef = collection(db, "test-events")
    getDocs(eventsRef)
    .then(snapshot => {
      const eventsArr = []
      snapshot.docs.forEach(doc => {
        eventsArr.push({...doc.data(), id: doc.id})
      })
      setEvents(eventsArr)
    })
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Map/>
      <FlatList
        style={{ width: "90%", height: "70%", padding: "10%" }}
        data={events}
        renderItem={({ item: event }) => (
          <ActivityCard activity={event} />
        )}
      />
    </View>      
  )
}