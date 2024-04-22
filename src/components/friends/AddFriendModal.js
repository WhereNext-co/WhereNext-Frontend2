import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Pressable,
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
import { LinearGradient } from "expo-linear-gradient";
import UserPlus from "../../../assets/friends/user-plus.svg";
import Xmark from "../../../assets/friends/x-mark.svg";
import { AuthContext } from "../../context/authContext";

export default function AddFriendModal() {
  const currentUserUID = useContext(AuthContext);
  const [key, setKey] = useState(0);
  const [userToAdd, setUserToAdd] = useState(null);

  const [friendstatus, setFriendStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onSearchHandler = () => {
    const user = currentUserUID.user.uid;
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
    const user = currentUserUID.user.uid;
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
    onSearchHandler();
  };

  const cancelFriendRequestHandler = () => {
    console.log(currentUserUID);
    console.log(userToAdd.UserName);
    const user = currentUserUID.user.uid;
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
    onSearchHandler();
  };

  const removeFriendHandler = () => {
    const user = currentUserUID.user.uid;
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
    onSearchHandler();
  };

  const AcceptFriendHandler = () => {
    const user = currentUserUID.user.uid;
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
    onSearchHandler();
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        className="w-12 h-12 items-center justify-center"
      >
        <LinearGradient
          colors={["#2acbf9", "#9aeeb0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.button}
        >
          <UserPlus width={20} height={20} />
        </LinearGradient>
      </Pressable>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContent} className="flex flex-col">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-semibold">Add Friend</Text>
            <Xmark
              width={25}
              height={25}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Enter your friend's username"
            placeholderTextColor="#696969" // Change the color here
            style={styles.searchInput}
            className="my-2 mt-3"
          />

          {userToAdd && (
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
          )}
          <Button title="Search" onPress={onSearchHandler} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10, // rounded corners
  },
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
    paddingHorizontal: 10,
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
});
