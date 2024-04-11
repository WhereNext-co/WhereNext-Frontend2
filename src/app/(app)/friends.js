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
    fetch('https://your-backend-url/contacts')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
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

        <Modal
          animationType="slide" // You can choose animation type as per your preference
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <AddFriendModal />
            <Button
              title="Close Modal"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
      </View>

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
});
