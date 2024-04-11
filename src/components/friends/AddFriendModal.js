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
} from "react-native";
import AddFriendCard from "./AddFriendCard";

export default function AddFriendModal() {
  const [contacts, setContacts] = useState([
    //default friends
    {
      img: "",
      name: "Guy Naga",
      status: "Friend",
    },

    {
      img: "",
      name: "Pung Demon",
      status: "PendingInvite",
    },

    {
      img: "",
      name: "New Dragon",
      status: "NotFriend",
    },

    {
      img: "",
      name: "Mearz Murloc",
      status: "PendingReceive",
    },
  ]);

  /*
    useEffect(() => {
    axios.get('API_URL/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  */

  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  /*
  useEffect(() => {
    fetch('https://your-backend-url/contacts')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
  }, []);
  */

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          style={styles.searchInput}
        />

        <ScrollView>
          {filteredContacts.map((contact) => (
            <AddFriendCard
              key={contact.name}
              img={contact.img}
              name={contact.name}
              onAddPress={() => console.log(`Add Friend handler`)}
              onPendingPress={() =>
                console.log(`Cancel Friend Request handler`)
              }
              onRemovePress={() => console.log(`Remove Friend handler`)}
              onAcceptPress={() => console.log(`Accept Friend Request handler`)}
              status={contact.status}
            />
          ))}
        </ScrollView>
      </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10, // rounded corners
    width: "80%", // take up 80% of the screen width
  },
});
