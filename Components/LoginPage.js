 import { StyleSheet, View, Text, Pressable} from "react-native";
 import React, {useEffect, useState } from "react";
 import { KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native-web";
 import {auth} from "../firebase"
 import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
 import {useNavigation} from "@react-navigation/native"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation()
    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged((user)=> {
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubscribe
    },[])
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((userCred)=> {
            const user = userCred.user
            console.log("registed with", user.email)
        }).catch((err) => {
            alert(err.message)
        })
    }
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(()=> {
            const user = userCred.user
            console.log("loged in  with", user.email);
        }).catch((err)=> {
            alert(err)
        })
    }
    return (
        <KeyboardAvoidingView style={styles.container}> 
            <View style={ styles.inputContainer}>
          <TextInput
          value={email}
          placeholder="Email"
          onChangeText={(text)=> setEmail(text)}
          style={styles.input}
          />
        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={(text)=> setPassword(text)}
          style={styles.input}
          secureTextEntry
          />
        </View>
        <View style={styles.btn_container}>
            <Pressable style={styles.btn} onPress={handleLogin}>
                <Text style={styles.btntext}>Log in</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.buttonOutline]} onPress={handleSignUp} >
                <Text style={styles.buttonOutlineText}>Sign up</Text>
            </Pressable>
        </View>
        </KeyboardAvoidingView>
    )

} 

export default LoginPage
const styles = StyleSheet.create({
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