import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
registerTranslation("en-GB", enGB);

export const AddActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [inputDate, setInputDate] = useState(undefined);
  const [image, setImage] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [description, setDescription] = useState("");
  const itineraryId = "78ruraYl5IjQENjn2S9A";

  const handleNumberChange = (text, state) => {
    if (!isNaN(text)) {
      state(text);
    }
  };

  const handleSubmit = () => {
    if(inputDate) {
      const stringified =JSON.stringify(inputDate);
      const slicedInputDate = stringified.slice(1, 11)
      const addedActivity = {
        name: activityName,
        description: description,
        location: location,
        date: slicedInputDate,
        image: image,
        price: price,
        people: peopleCount,
      };
      const activityRef = doc(db, 'test-activities', itineraryId);
      updateDoc(activityRef, {
       activities: arrayUnion(addedActivity)
      });
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
      </Pressable>
    </View>
  );
};
