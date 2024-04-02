import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useNavigation } from "@react-navigation/native";
registerTranslation("en-GB", enGB);

export const AddActivity = ({tripId}) => {
  const navigation = useNavigation();
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [activityName, setActivityName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [inputDate, setInputDate] = useState(undefined);
  const [image, setImage] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [description, setDescription] = useState("");
  
  const itineraryId = tripId

  const handleNumberChange = (text, state) => {
    if (!isNaN(text)) {
      state(text);
    }
  };

  const handleSubmit = (e) => {
    setErr(null)
    setMsg(null)
    if (
      (inputDate && activityName,
      description,
      location,
      image,
      price,
      peopleCount)
    ) {
      const stringified = JSON.stringify(inputDate);
      const slicedInputDate = stringified.slice(1, 11);
      const addedActivity = {
        name: activityName,
        description: description,
        location: location,
        date: slicedInputDate,
        image: image,
        price: Number(price),
        people: Number(peopleCount),
      };

      const activityRef = doc(db, "test-activities", itineraryId);
      updateDoc(activityRef, {
        activities: arrayUnion(addedActivity),
      }).then(() => {
        setMsg("Activity added suceesfully!");
      });
    } else {
      setErr("please fill all the fields.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Name of the activity"
        onChange={(e) => {
          setActivityName(e.target.value);
        }}
      />
      <TextInput
        placeholder="Describe the activity"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        multiline="true"
      />
      <TextInput
        placeholder="Location"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <View style={{ width: "70%" }}>
        <DatePickerInput
          style={{ fontSize: "80%" }}
          locale="en-GB"
          label="Pick a date"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>
      <TextInput
        placeholder="Enter the image url"
        onChange={(e) => {
          setImage(e.target.value);
        }}
        inputMode="url"
      />
      <TextInput
        value={price}
        onChangeText={(e) => handleNumberChange(e, setPrice)}
        keyboardType="numeric"
        placeholder="Price in pounds"
      />
      <TextInput
        placeholder="Number of people"
        value={peopleCount}
        onChangeText={(e) => handleNumberChange(e, setPeopleCount)}
        keyboardType="numeric"
      />

      <Pressable onPress={handleSubmit}>
        <Text>Submit</Text>
        {err ? (
          <Text
            style={{ border: "1px solid red", color: "red", marginTop: 10 }}
          >
            {err}
          </Text>
        ) : (
          <Text
            style={{
              color: "white",
              marginTop: 10,
              backgroundColor: "#7743DB",
              border: "1px solid #C3ACD0",
            }}
          >
            {msg}
          </Text>
        )}
      </Pressable>
    </View>
  );
};
