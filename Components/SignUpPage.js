import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { KeyboardAvoidingView, TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password, image)
      .then((userCred) => {
        const user = userCred.user.uid;
        addToDatabase(user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addToDatabase = (user) => {
    const data = {
      username: username,
      email: email,
      image: image,
    };
    setDoc(doc(db, "test-users", user), data)
      .then(() => {
        navigation.replace("Nav");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const backToLogin = () => {
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../travel-logo-Photoroom.png")}
      />
      <Text style={styles.title}>Plan Perfect</Text>
      <View style={styles.innerContainer}>
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
        <View style={styles.btnContainer}>
          <Pressable
            style={[styles.btn]}
            onPress={() => {
              handleSignUp();
            }}
          >
            <Text style={styles.btnText}>Sign up!</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.buttonOutline]}
            onPress={backToLogin}
          >
            <Text style={styles.buttonOutlineText}>Take me back to Login!</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(to bottom right, transparent, #7743DB)",
  },
  title: {
    transform: [{ translateY: -50 }],
    fontSize: 30,
    color: "white"
  },
  innerContainer: {
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#7743DB",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#7743DB",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#7743DB",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 50
  },
});
