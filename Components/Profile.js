import { StyleSheet, View, Text, Image } from "react-native";
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
          user.push({ ...doc.data(), id: doc.id });
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
  const handleEdit = () => {
    navigation.replace("EditUser");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {user.length > 0 && (
        <Image source={{ uri: user[0].image }} style={styles.profileImage} />
      )}
      {user.length > 0 && (
        <Text style={styles.text}>Username: {user[0].username}</Text>
      )}
      {user.length > 0 && (
        <Text style={styles.text}>Email: {user[0].email}</Text>
      )}
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
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  profileImage: {
    height: "10%",
    width: "25%",
    borderRadius: 200,
    marginBottom: 15,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
});
