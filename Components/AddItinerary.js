import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);
import { DatePickerInput } from "react-native-paper-dates";
import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

export const AddItinerary = () => {
  const [startDate, setStartDate] = React.useState(undefined);
  const [endDate, setEndDate] = React.useState(undefined);
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");

  const navigation = useNavigation();

  const handleOnPress = () => {
    if (startDate) {
      const stringifiedStartDate = JSON.stringify(startDate);
      const stringifiedEndDate = JSON.stringify(endDate);
      const finalStartDate = stringifiedStartDate.slice(1, 11);
      const finalEndDate = stringifiedEndDate.slice(1, 11);
      const uid = auth.currentUser.uid;

      addDoc(collection(db, "test-itineraries"), {
        name: nameText,
        location: locationText,
        startDate: finalStartDate,
        endDate: finalEndDate,
        uid: uid,
      })
        .then((docRef) => {
          const itineraryAddedId = docRef.id
          const activities = []
          setDoc(doc(db, "test-activities", itineraryAddedId), {activities})          
          navigation.navigate("My Trips");
          alert("Itinerary has been added");
        })
        .catch(() => {
          alert("Something went wrong, itinerary not added");
        });
    }
  };

  return (
    <View>
      <View>
        <Text>Add Trip</Text>
      </View>
      <View>
        <TextInput
          placeholder="Name of Trip"
          onChangeText={(newNameText) => setNameText(newNameText)}
          defaultValue={nameText}
        ></TextInput>
        <TextInput
          placeholder="Location"
          onChangeText={(newLocationText) => setLocationText(newLocationText)}
          defaultValue={locationText}
        ></TextInput>
      </View>
      <SafeAreaProvider>
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <DatePickerInput
            locale="en-GB"
            label="Start Date"
            value={startDate}
            onChange={(d) => setStartDate(d)}
            inputMode="start"
          />
        </View>
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <DatePickerInput
            locale="en-GB"
            label="End Date"
            value={endDate}
            onChange={(d) => setEndDate(d)}
            inputMode="start"
          />
        </View>
      </SafeAreaProvider>

      <View>
        <Pressable onPress={handleOnPress}>
          <Text>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};
