import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-web";
import React, { useState } from "react";

import { auth } from "../firebase";
import{ db } from "../firebase"
import {updateDoc, doc} from 'firebase/firestore'

const EditUser = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    const uid = auth.currentUser.uid
    const ref = doc(db, "test-users", uid)
   
   updateDoc(ref, { username: username } ).then(() => {
      alert("Username successfully changed")
   }).catch((err)=> {
      alert(err,"Something went wrong")
    })
}

  return (
    <View>
      <TextInput
        value={image}
        placeholder="Image url"
        onChangeText={(text) => setImage(text)}
        style={styles.input}
      />
      <TextInput
        value={username}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
    <Pressable onPress={handleSubmit}>
      <Text>Update</Text>
    </Pressable>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({});
