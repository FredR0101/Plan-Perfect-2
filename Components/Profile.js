import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import * as React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { updateDoc, doc, deleteDoc, deleteUser } from "firebase/firestore";

export const Profile = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const userEmail = auth.currentUser.email;
    const fetchData = collection(db, "test-users");
    const userQuery = query(fetchData, where("email", "==", userEmail));
    getDocs(userQuery)
      .then((usersData) => {
        let userData = {};
        usersData.docs.forEach((doc) => {
          userData = { ...doc.data(), id: doc.id };
        });
        setUser(userData);
        setName(userData.username);
        setEmail(userData.email);
        setBio(userData.bio);
        setAvatar(userData.image);
      })
      .catch((err) => {
        throw err;
      });
  }, [setUser, setName, setBio]);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleSubmit = () => {
    const uid = auth.currentUser.uid;
    const ref = doc(db, "test-users", uid);

    updateDoc(ref, { username: name, bio: bio })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          username: name,
          bio: bio,
        }));
        alert("Profile successfully updated");
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  const handleDocDelete = () => {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "test-users", uid);
    deleteDoc(userRef)
      .then(() => {
        handleDelete();
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
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={!avatar ? require("../blank-user.jpeg") : { uri: avatar }}
          />
          <Pressable
            style={styles.changeAvatarButton}
            onPress={() => {
              /* open image picker */
            }}
          >
            <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
          </Pressable>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            readOnly
          />
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Bio"
            value={bio}
            onChangeText={setBio}
          />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainerDelete}>
            <Pressable style={styles.buttonDelete} onPress={handleSignout}>
              <Text style={styles.buttonTextDelete}>Sign Out</Text>
            </Pressable>
            <Pressable onPress={handleDocDelete} style={styles.buttonDelete}>
              <Text style={styles.buttonTextDelete}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(to bottom right, transparent, #7743DB)",
  },
  form: {
    width: "80%",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: "center",
    width: "70%",
  },
  button: {
    backgroundColor: "#7743DB",
    padding: 15,
    paddingRight: 60,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    left: "20%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    left: "25%",
    alignItems: "center",
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
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    border: '2px solid #7743DB'
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#7743DB",
    fontSize: 18,
  },
  buttonContainerDelete: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
    right: 30,
  },
  buttonDelete: {
    display: "flex",
    backgroundColor: "#7743DB",
    width: "60%",
    padding: 5,
    paddingRight: 60,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
    height: 50,
    justifyContent: "center",
    textAlign: "center",
  },
  buttonTextDelete: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    left: "35%",
  },
});
