import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

export const AddActivity = ({tripId}) => {
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
        alert("Activity added successfully!");
        setActivityName("")
        setDescription("")
        setLocation("")
        setInputDate(undefined)
        setImage("")
        setPrice("")
        setPeopleCount("")
      });
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <View style={styles.background}>

    <View style={styles.formContainer}>
      <Text style={styles.headerTxt}> Please specify the activity details: </Text>
      <TextInput style = {styles.input}
        placeholder="Name of the activity"
        value = {activityName}
        onChange={(e) => {
          setActivityName(e.target.value);
        }}
      />
      <TextInput style = {styles.input}
        placeholder="Describe the activity"
        value = {description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        multiline="true"
      />
      <TextInput style = {styles.input}
        placeholder="Location"
        value = {location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <View>
        <DatePickerInput style={styles.datePicker}
          locale="en-GB"
          label="Pick a date"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>
      <TextInput style = {styles.input}
        placeholder="Enter the image url"
        value = {image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
        inputMode="url"
      />
      <TextInput style = {styles.input}
        value={price}
        onChangeText={(e) => handleNumberChange(e, setPrice)}
        keyboardType="numeric"
        placeholder="Price in pounds"
      />
      <TextInput style = {styles.input}
        placeholder="Number of people"
        value={peopleCount}
        onChangeText={(e) => handleNumberChange(e, setPeopleCount)}
        keyboardType="numeric"
      />

      <Pressable style = {styles.btn} 
        onPress={handleSubmit}>
        <Text style={styles.btnText}> Add Activity </Text>
      </Pressable>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundImage: 'linear-gradient(to bottom right, transparent, #7743DB)',
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
    fontWeight: "bold",
    marginBottom: "3%",
  },

  input: {
    backgroundColor: "white" ,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    border: "1px solid black"
    },
  
  datePicker: {
    padding: 2,
    marginTop: 5,
    marginBottom: 5,
    fontSize: "80%",
    backgroundColor: "white",
    borderRadius: "5%",
    border: "1px solid black"
  },

  btn: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    backgroundColor: "#7743DB",
    height: 40,
    paddingTop: 5,
    color: "white",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "1px solid #7743DB",
    borderRadius: 10,
  },

  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})