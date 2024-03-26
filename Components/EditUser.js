import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-web";
import React, { useState } from "react";
import { updateEmail } from "firebase/auth";
import { auth } from "../firebase";
const EditUser = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    const user = auth.currentUser
    updateEmail(user, email).then(() => {
      console.log("Email updated successfully")
    })
}
const update = {
  username: username,
  image: image
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
