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
import FriendRequestCard from "./FriendRequestCard";
import Modal from "react-native-modal";
import axios from "axios";
import { set } from "date-fns";

//Get friend requests from API

//When accept button is clicked, send a post request to the API to accept the friend request

//When decline button is clicked, send a post request to the API to decline the friend request

export default function AddFriendModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const CurrentUserUID = "bbb";
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .post("http://where-next.tech/users/get-friendrequest", {
        uid: CurrentUserUID,
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
      <Button title="Request" onPress={() => setModalVisible(true)} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View>
          <Text>Friend Requests</Text>
          <ScrollView>
            {render ? (
              <View>
                {requestsReceived.map((user) => (
                  <FriendRequestCard
                    requestsReceived={requestsReceived}
                    setRequestsReceived={setRequestsReceived}
                    currentuserUID={CurrentUserUID}
                    key={user.Sender.Uid}
                    img={user.Sender.ProfilePicture}
                    name={user.Sender.Name}
                    username={user.Sender.UserName}
                    onPress={() => console.log(`Friend at index pressed`)}
                  />
                ))}
              </View>
            ) : (
              <Text>loading...</Text>
            )}
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
