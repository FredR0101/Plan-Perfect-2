import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { KeyboardAvoidingView, TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { db } from "../firebase";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password, image)
      .then((userCred) => {
        const user = userCred.user;
        addToDatabase()
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addToDatabase = () => {
    addDoc(collection(db, "test-users"), {
      username: username,
      email: email,
      image: image,
    }).then(() => {
        navigation.replace('Nav')
    }).catch((error) => {
      alert(error);
    });
  };

  const backToLogin = () => {
    navigation.replace("Login");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          value={image}
          placeholder="Image"
          onChangeText={(text) => setImage(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.btn_container}>
        <Pressable
          style={[styles.btn, styles.buttonOutline]}
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={styles.buttonOutlineText}>Sign up!</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.buttonOutline]}
          onPress={backToLogin}
        >
          <Text style={styles.buttonOutlineText}>Take me back to Login!</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  btn_container: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  btn: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btntext: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
