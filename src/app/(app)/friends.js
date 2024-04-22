import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Button,
} from "react-native";
import FriendCard from "../../components/friends/FriendCard";
import AddFriendModal from "../../components/friends/AddFriendModal";
import FriendRequestModal from "../../components/friends/FriendRequestModal";
import axios from "axios";
import Modal from "react-native-modal";
import firebase from "firebase/auth";
import colors from "../../shared/colors";
import { AuthContext } from "../../context/authContext";

export default function Friends() {
  const currentUserUID = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  // const { user } = useContext(AuthContext);

  useEffect(() => {
    // friend lists from API
    const user = currentUserUID.user.uid;
    axios
      .post(`http://where-next.tech/users/get-friends`, {
        uid: user,
      })
      .then((response) => {
        setContacts(response.data.friendList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.Name.toLowerCase().includes(search.toLowerCase()) ||
          contact.Uid.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-semibold">Friends List</Text>
          <View className="flex flex-row items-center">
            <FriendRequestModal />
            <AddFriendModal />
          </View>
        </View>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Friends"
          style={styles.searchBar}
        />

        <ScrollView>
          {filteredContacts.map((contact) => (
            <FriendCard
              key={contact.Uid}
              img={contact.ProfilePicture}
              name={contact.Name}
              onPress={() => console.log(`Friend at index pressed`)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    shadowColor: colors.black, // This is required for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This property adds shadow on Android
    flexGrow: 1,
    marginVertical: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for modal
  },
});
