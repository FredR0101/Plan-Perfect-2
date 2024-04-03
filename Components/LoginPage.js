import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native-web";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Nav");
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    navigation.replace("SignUp");
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../travel-logo-Photoroom.png")}/>
        <Text style={styles.title}>Plan Perfect</Text>
      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Log in</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.buttonOutline]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonOutlineText}>Sign up here!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'linear-gradient(to bottom right, transparent, #7743DB)',
  },
  title: {
    transform: [{ translateY: -50 }],
    fontSize: 30,
    color: "white"
  },
  formContainer: {
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
