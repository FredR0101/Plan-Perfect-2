import { Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView, TextInput } from "react-native-web";
import React, { useState } from "react";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const EditUser = () => {
  const navigation = useNavigation()
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = () => {
    const uid = auth.currentUser.uid;
    const ref = doc(db, "test-users", uid);

    updateDoc(ref, { username: username })
      .then(() => {
        alert("Username successfully updated");
        setImage("");
        setUsername("");
      })
      .catch((err) => {
        alert(err, "Something went wrong");
      });
  };

  const handleImageSubmit = () => {
    const uid = auth.currentUser.uid;
    const ref = doc(db, "test-users", uid);

    updateDoc(ref, { image: image })
      .then(() => {
        alert("Profile picture successfully updated");
        setImage("");
        setUsername("");
      })
      .catch((err) => {
        alert(err, "Something went wrong");
      });
  };
  const handleDocDelete = () => {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "test-users", uid);
    deleteDoc(userRef)
    .then(() => {
      handleDelete()
      alert("User deleted");
    })
    .catch((err) => {
      alert(err, "Something went wrong");
    });
  };
  const handleDelete = () => {
    const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          navigation.replace("Login");
        })
        .catch((err) => {
          alert(err, "Something went wrong");
        });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <Pressable onPress={handleUsernameSubmit} style={styles.btn}>
          <Text style={styles.btntext}>Update Username</Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={image}
          placeholder="Image url"
          onChangeText={(text) => setImage(text)}
          style={styles.input}
        />
        <Pressable onPress={handleImageSubmit} style={styles.btn}>
          <Text style={styles.btntext}>Update Image</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={handleDocDelete} style={styles.btn}>
          <Text style={styles.btntext}>Delete profile</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  btn_container: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  btn: {
    backgroundColor: "#7743DB",
    width: "70%",
    padding: 15,
    borderRadius: 10,
    left: "15%",
  },
  btntext: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    left: "15%",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
