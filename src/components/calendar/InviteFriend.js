import React, { useState, useEffect } from "react";
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
import FriendCard from "./InviteFriendCard";
import axios from "axios";
import Modal from "react-native-modal";

export default function Friends({ onFriendChange }) {
  const currentUserUID = "bbb";
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
  // State variables
  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Event handler for selecting/deselecting friends
  const handlePress = (friend) => {
    if (selectedFriends.includes(friend.id)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friend.Uid));
    } else {
      setSelectedFriends([...selectedFriends, friend.Uid]);
    }
    console.log(`From child component: ${selectedFriends}`);
  };

  //On invite button press
  const onInvite = () => {
    onFriendChange(selectedFriends);
  };

  // Filter contacts based on search input
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.Name.toLowerCase().includes(search.toLowerCase()) ||
          contact.Uid.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  // Render the component
  return (
    <SafeAreaView>
      {/* Search input */}
      <View style={styles.search}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>

      {/* List of friends */}
      <ScrollView>
        {filteredContacts.map((contact) => (
          <FriendCard
            key={contact.Uid}
            img={contact.ProfilePicture}
            name={contact.Name}
            onPress={() => handlePress(contact)}
            isSelected={selectedFriends.includes(contact.Uid)}
          />
        ))}
      </ScrollView>

      {/* Invite button */}
      <Button title="Invite" onPress={onInvite} />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
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
  search: {
    padding: 10,
    margin: 10,
  },
});
