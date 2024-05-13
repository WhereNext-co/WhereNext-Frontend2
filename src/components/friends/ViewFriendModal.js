import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  AccessibilityInfo,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/authContext";
import Xmark from "../../../assets/friends/x-mark.svg";

//Get friend requests from API

//When accept button is clicked, send a post request to the API to accept the friend request

//When decline button is clicked, send a post request to the API to decline the friend request

export default function ViewFriendModal({ UID, isVisible }) {
  const [isModalVisible, setModalVisible] = useState(true);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    axios
      .post("http://where-next.tech/users/get-profile", {
        uid: UID,
      })
      .then((response) => {
        setTitle(response.data.user.Title);
        setName(response.data.user.Name);
        setUsername(response.data.user.Username);
        setPhoneNumber(response.data.user.Region + response.data.user.TelNo);
        setProfilePicture(response.data.user.ProfilePicture);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
    >
      <View>
        <View>
          <Image
            alt=""
            resizeMode="cover"
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F${profilePicture.slice(
                81
              )}`,
            }}
          />
        </View>
        <View>
          <Text>{title}</Text>
          <Text>{name}</Text>
        </View>
        <View>
          <Text>{username}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    // textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
  requestsContainer: {
    maxHeight: 300, // Adjust this height as needed
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
  },
});
