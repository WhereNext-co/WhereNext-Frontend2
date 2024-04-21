import React, { useState, useEffect } from "react";
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
} from "react-native";
import AddFriendCard from "./AddFriendCard";
import Modal from "react-native-modal";
import axios from "axios";
import { set } from "date-fns";

//Get friend requests from API

//When accept button is clicked, send a post request to the API to accept the friend request

//When decline button is clicked, send a post request to the API to decline the friend request

export default function AddFriendModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const CurrentUserUID = "1234";
  const [requestsReceived, setRequestsReceived] = useState([
    {
      Uid: "1234",
      friendName: "Dummy User",
      ProfilePicture: "",
      UserName: "dummyusername",
    },
  ]);

  useEffect(() => {
    axios
      .post("http://where-next.tech/users/get-friendrequest")
      .then((response) => {
        setRequestsReceived(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <View>
      <Button title="Request" onPress={() => setModalVisible(true)} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View>
          <Text>Friend Requests</Text>
          <ScrollView>
            {requestsReceived.map((user) => (
              <FriendRequestCard
                currentuserUID={CurrentUserUID}
                key={user.Uid}
                img={user.ProfilePicture}
                name={user.friendName}
                username={user.UserName}
                onPress={() => console.log(`Friend at index pressed`)}
              />
            ))}
          </ScrollView>
        </View>
        <View>
          <Button
            title="Close"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
