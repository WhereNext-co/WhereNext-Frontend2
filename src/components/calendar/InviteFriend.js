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
  // State variables
  const [contacts, setContacts] = useState([
    // Default friends
    {
      img: "",
      name: "Guy Chelsea",
      id: "0xfjri3995",
    },
    {
      img: "",
      name: "Mearz Wong",
      id: "03djccnjfj",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Event handler for selecting/deselecting friends
  const handlePress = (friend) => {
    if (selectedFriends.includes(friend.id)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend.id]);
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
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  // Render the component
  return (
    <SafeAreaView>
      {/* Search input */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        style={styles.searchInput}
      />

      {/* List of friends */}
      <ScrollView>
        {filteredContacts.map((contact) => (
          <FriendCard
            key={contact.id}
            img={contact.img}
            name={contact.name}
            onPress={() => handlePress(contact)}
            isSelected={selectedFriends.includes(contact.id)}
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
