import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { TextInput, StyleSheet } from "react-native";
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
          const itineraryAddedId = docRef.id;
          const activities = [];
          setDoc(doc(db, "test-activities", itineraryAddedId), { activities });
          navigation.navigate("My Trips");
          alert("Itinerary has been added");
        })
        .catch(() => {
          alert("Something went wrong, itinerary not added");
        });
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.formContainer}>
        <Text style={styles.headerTxt}>Add your trip here: </Text>
        <TextInput
          style={styles.input}
          placeholder="Name of Trip"
          onChangeText={(newNameText) => setNameText(newNameText)}
          defaultValue={nameText}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          onChangeText={(newLocationText) => setLocationText(newLocationText)}
          defaultValue={locationText}
        />
        <DatePickerInput
          style={styles.datePicker}
          locale="en-GB"
          label="Start Date"
          value={startDate}
          onChange={(d) => setStartDate(d)}
          inputMode="start"
        />
        <DatePickerInput
          style={styles.datePicker}
          locale="en-GB"
          label="End Date"
          value={endDate}
          onChange={(d) => setEndDate(d)}
          inputMode="start"
        />
        <Pressable onPress={handleOnPress} style={styles.btn}>
          <Text style={styles.btnText}>Add Trip</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundImage: "linear-gradient(to bottom right, transparent, #7743DB)",
  },

  formContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 500,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 10,
    backgroundColor: "#FFFBF5",
    height: "300%",
    padding: 15,
    borderRadius: 10,
    border: "1px solid #F7EFE5",
  },

  headerTxt: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 5,
    border: "1px solid black",
  },

  datePicker: {
    marginTop: 10,
    backgroundColor: "white",
    border: "1px solid black",
  },

  btn: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#7743DB",
    height: 40,
    width: "100%",
    paddingTop: 5,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "1px solid #7743DB",
    borderRadius: 10,
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
