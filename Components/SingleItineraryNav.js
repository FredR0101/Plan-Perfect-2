import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Itinerary } from './Itinerary'
import { AddActivity } from './AddActivity';
import { ShareItinerary } from './ShareItinerary'
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDocs, collection } from "firebase/firestore";


export const SingleItineraryNav = ({route}) => {
    const Tab = createBottomTabNavigator();
  
    const tripId = route.params.params.itineraryId

    return (
        <>
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='Itinerary'>
            <Tab.Screen name="My Itinerary" component={Itinerary}/>
            <Tab.Screen name="Add Activity">{() => <AddActivity tripId={tripId}/>}</Tab.Screen>
            <Tab.Screen name="Share Itinerary" component={ShareItinerary}/>
        </Tab.Navigator>
        </>
    )
}


