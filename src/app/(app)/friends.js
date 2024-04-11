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
  Modal,
} from "react-native";
import FriendCard from "../../components/friends/FriendCard";
import AddFriendModal from "../../components/friends/AddFriendModal";
import axios from "axios";

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
  const [modalVisible, setModalVisible] = useState(false);

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
      <Button
        title="Open Add Friend Modal"
        onPress={() => setModalVisible(true)}
      />
      <View style={styles.container}>
        <Button
          title="Open Add Friend Modal"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddFriendModal />
            <Button
              title="Close Modal"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {filteredContacts.map((contact) => (
          <FriendCard
            key={contact.id}
            img={contact.img}
            name={contact.name}
            onPress={() => console.log(`Friend at index pressed`)}
          />
        ))}
      </ScrollView>
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
  modalContent: {
    flex: 1,
    position: "absolute",
    padding: 20,
    borderRadius: 10, // rounded corners
    width: "80%", // take up 80% of the screen width
    backgroundColor: "white",
    alignItems: "center", // center the children horizontally
  },
});
