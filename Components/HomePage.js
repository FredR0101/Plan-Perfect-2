import { Pressable, Text , Button} from "react-native"
import { db } from "../firebase"
import {doc, getDocs, collection, query, where} from 'firebase/firestore'
import { useEffect, useState } from "react"
import { AddItinerary } from "./AddItinerary"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { itinerariesList } from "./ItinerariesList"


export const HomePage = () => {
    return (
        <Text>Hello!</Text>
    )
}