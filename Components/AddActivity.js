import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
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
    <View style={styles.formContainer}>
      <Text style={styles.headerTxt}> Please specify the activity details: </Text>
      <TextInput style = {styles.input}
        placeholder="Name of the activity"
        onChange={(e) => {
          setActivityName(e.target.value);
        }}
      />
      <TextInput style = {styles.input}
        placeholder="Describe the activity"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        multiline="true"
      />
      <TextInput style = {styles.input}
        placeholder="Location"
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
        {err ? (
          <Text> {err} </Text>
        ) : (
          <Text> {msg} </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { 
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    paddingBottom: 5,
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
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    },
  
  datePicker: {
    marginTop: "3%",
    fontSize: "80%",
    backgroundColor: "white",
    borderRadius: "5%,"
  },

  btn: {
    marginTop: "5%",
    backgroundColor: "#7743DB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    },

  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})