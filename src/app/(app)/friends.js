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

export default function Friends() {
  const currentUserUID = "bbb";
  const [contacts, setContacts] = useState([
    //default friends
    {
      Name: "Guy Chelsea",
      Uid: "0xfjri3995",
      ProfilePicture: "",
    },

    {
      Name: "Mearz Wong",
      Uid: "03djccnjfj",
      ProfilePicture: "",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([
    //default friends
    {
      Name: "Guy Chelsea",
      Uid: "0xfjri3995",
      ProfilePicture: "",
    },

    {
      Name: "Mearz Wong",
      Uid: "03djccnjfj",
      ProfilePicture: "",
    },
  ]);

  // const { user } = useContext(AuthContext);

  useEffect(() => {
    // friend lists from API
    const user = currentUserUID;
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
      <View className="px-4">
        <Text>Friends List</Text>
        <AddFriendModal />
        <FriendRequestModal />
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
