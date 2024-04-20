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
import DesiredFriendCard from "../../../components/calendar/DesiredFriendCard";
import axios from "axios";
import Modal from "react-native-modal";
import { router } from "expo-router";

export default function Friends() {
  const [contacts, setContacts] = useState([
    //default friends
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
    {
      img: "",
      name: "John Doe",
      id: "12345",
    },
    {
      img: "",
      name: "Jane Doe",
      id: "15556",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const sendInvitesHandler = () => {
    router.push("./confirmation");
  };

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  return (
    <SafeAreaView>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        style={styles.searchInput}
      />

      <ScrollView>
        {filteredContacts.map((contact) => (
          <DesiredFriendCard
            key={contact.id}
            img={contact.img}
            name={contact.name}
            selected={selectedFriends.includes(contact.id)}
            onPress={() => {
              if (selectedFriends.includes(contact.id)) {
                setSelectedFriends(
                  selectedFriends.filter((id) => id !== contact.id)
                );
              } else {
                setSelectedFriends([...selectedFriends, contact.id]);
              }
            }}
          />
        ))}
      </ScrollView>
      <Button title="Send Invites" onPress={sendInvitesHandler}></Button>
    </SafeAreaView>
  );
}

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
