import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { auth } from "../firebase";
import { Pressable } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const Profile = () => {
  const [user, setUser] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const userEmail = auth.currentUser.email;
    const fetchData = collection(db, "test-users");
    const userQuery = query(fetchData, where("email", "==", userEmail));
    getDocs(userQuery)
      .then((usersData) => {
        let user = [];
        usersData.docs.forEach((doc) => {
          user.push({...doc.data(), id: doc.id });
        });
        setUser(user);
      })
      .catch((err) => {
        throw err;
      });
    }, []);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {user.length > 0  && <Text>{user[0].username}</Text>}
      {user.length > 0  && <Text>{user[0].email}</Text>}
      
      <Pressable style={styles.button} onPress={handleSignout}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 300,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
