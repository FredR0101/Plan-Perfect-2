import { Pressable, Text , Button} from "react-native"
import { db } from "../firebase"
import {doc, getDocs, collection, query, where} from 'firebase/firestore'
import { useEffect, useState } from "react"
import { AddItinerary } from "./AddItinerary"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { itinerariesList } from "./ItinerariesList"


export const HomePage = ({navigation}) => {
   
      

    const Tab = createBottomTabNavigator();
    return (
        <>
            
            <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='ItinerariesList'>
            <Tab.Screen name="Itineraries" component={itinerariesList}/>
            <Tab.Screen name="Add Itinerary" component={AddItinerary}/>
            </Tab.Navigator>

        </>
    )
}