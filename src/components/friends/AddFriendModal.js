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
import { remove, set } from "firebase/database";
import firebase from "firebase/auth";
import axios from "axios";

export default function AddFriendModal() {
  const currentUserUID = "bbb";
  const [key, setKey] = useState(0);
  const [userToAdd, setUserToAdd] = useState(
    //default friends
    {
      Uid: "123456",
      ProfilePicture: "",
      Name: "Guy Chelsea",
    }
  );

  useEffect(() => {
    const user = currentUserUID;
    axios
      .post(`http://where-next.tech/users/friends/friendinfo`, {
        uid: user,
        friendName: userToAdd.UserName,
      })
      .then((response) => {
        setUserToAdd(response.data.friend);
        setFriendStatus(response.data.friendStatus);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [
    addFriendHandler,
    cancelFriendRequestHandler,
    removeFriendHandler,
    AcceptFriendHandler,
  ]);

  const [friendstatus, setFriendStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onSearchHandler = () => {
    const user = currentUserUID;
    console.log(search);
    axios
      .post(`http://where-next.tech/users/friends/friendinfo`, {
        uid: user,
        friendName: search,
      })
      .then((response) => {
        setUserToAdd(response.data.friend);
        setFriendStatus(response.data.friendStatus);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const addFriendHandler = () => {
    const user = currentUserUID;
    axios
      .post("http://where-next.tech/users/friendrequest", {
        uid: user,
        friendName: userToAdd.UserName,
      })
      .then((response) => {
        console.log(response.data);
        setKey((prevKey) => prevKey + 1);
        setFriendStatus("friend request already sent");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const cancelFriendRequestHandler = () => {
    console.log(currentUserUID);
    console.log(userToAdd.UserName);
    const user = currentUserUID;
    axios
      .delete("http://where-next.tech/users/friendrequest/cancel", {
        data: { uid: user, friendName: userToAdd.UserName },
      })
      .then((response) => {
        console.log(response.data);
        setKey((prevKey) => prevKey + 1);
        setFriendStatus("not friends");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeFriendHandler = () => {
    const user = currentUserUID;
    axios
      .delete("http://where-next.tech/users/friends", {
        data: { uid: user, friendName: userToAdd.UserName },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const AcceptFriendHandler = () => {
    const user = currentUserUID;
    axios
      .put("http://where-next.tech/users/friendrequest", {
        uid: user,
        friendName: userToAdd.UserName,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View>
      <Button
        title="Open Add Friend Modal"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContent}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            style={styles.searchInput}
          />
          <Button title="Search" onPress={onSearchHandler} />
          <ScrollView>
            <AddFriendCard
              key={key}
              img={userToAdd.ProfilePicture}
              name={userToAdd.Name}
              onAddPress={addFriendHandler}
              onPendingPress={cancelFriendRequestHandler}
              onRemovePress={removeFriendHandler}
              onAcceptPress={AcceptFriendHandler}
              status={friendstatus}
            />
          </ScrollView>

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

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10, // rounded corners
  },
});
