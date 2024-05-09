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
import FriendRequestCard from "./FriendRequestCard";
import Modal from "react-native-modal";
import axios from "axios";
import { set } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/authContext";

//Get friend requests from API

//When accept button is clicked, send a post request to the API to accept the friend request

//When decline button is clicked, send a post request to the API to decline the friend request

export default function FriendRequestModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const CurrentUserUID = useContext(AuthContext);
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .post("http://where-next.tech/users/get-friendrequest", {
        uid: CurrentUserUID.user.uid,
      })
      .then((response) => {
        setRequestsReceived(response.data.requestsReceived);
        setRender(true);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <View>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="items-center justify-center"
      >
        <LinearGradient
          colors={["#2acbf9", "#9aeeb0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Requests</Text>
        </LinearGradient>
      </Pressable>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Friend Requests</Text>
          <ScrollView style={styles.requestsContainer}>
            {render ? (
              requestsReceived.length > 0 ? (
                requestsReceived.map((user) => (
                  <FriendRequestCard
                    requestsReceived={requestsReceived}
                    setRequestsReceived={setRequestsReceived}
                    currentuserUID={CurrentUserUID.user.uid}
                    key={user.Sender.Uid}
                    img={user.Sender.ProfilePicture}
                    name={user.Sender.Name}
                    username={user.Sender.UserName}
                    onPress={() => console.log(`Friend at index pressed`)}
                  />
                ))
              ) : (
                <Text style={styles.loadingText}>No friend requests</Text>
              )
            ) : (
              <Text style={styles.loadingText}>Loading...</Text>
            )}
          </ScrollView>
          {/* <Button
            title="Close"
            onPress={() => {
              setModalVisible(false);
            }}
          /> */}
        </View>
      </Modal>
    </View>
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
