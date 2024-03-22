import { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Home ({navigation}) {
    const [userItinerary, setUserItinerary] = useState([])
    return (
        <>
        <View style={styles.itinerary}>
            <Text style={{marginTop: "5%", fontSize: "120%", fontWeight: "bold",}}> My Itinerary </Text>
            { userItinerary.length === 0 ? <Text> Empty Itinerary </Text>  : <Text> Itinerary </Text>  }
            <Pressable style = {{border: "2px solid black", boxShadow: "1px 2px 5px black"}} onPress = {() => {navigation.navigate("AddActivity")}}> 
                <Text>  Add Activity </Text>
            </Pressable>
            <Pressable style = {{border: "2px solid black", boxShadow: "1px 2px 5px black", alignSelf: "flex-end"}} > 
                <Text>  Share Itinerary </Text>
            </Pressable>
        </View>
        </>
    )
}

export const styles = StyleSheet.create({
    itinerary: {
      backgroundColor: "lightgrey",
      flex: 1,
      width: "90%",
      alignItems: "center",
      border: "1px solid black"
    }
  });

