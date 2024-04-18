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
  ]);

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  /*const handleInvite = async () => {
    try {
      const response = await axios.post(
        "https://your-api-url.com/invite",
        selectedFriends
      );

      if (response.status !== 200) {
        throw new Error("HTTP error " + response.status);
      }

      alert("Invitations sent successfully!");
    } catch (error) {
      console.error("Failed to send invitations:", error);
    }
  }; */

  const handleInvite = async () => {
    try {
      console.log("Inviting friends:", selectedFriends);
    } catch (error) {
      console.error("Failed to send invitations:", error);
    }
  };

  const handlePress = (friend) => {
    if (selectedFriends.includes(friend.id)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend.id]);
    }
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

  /*
  useEffect(() => {
    axios.get('API_URL/contacts')
      .then(response => {
        setContacts(response.data);
        setFilteredContacts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  */

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
          <FriendCard
            key={contact.id}
            img={contact.img}
            name={contact.name}
            onPress={() => handlePress(contact)}
            isSelected={selectedFriends.includes(contact.id)}
          />
        ))}
      </ScrollView>
      <Button title="Invite" onPress={handleInvite} />
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
