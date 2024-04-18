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
import AddFriendCard from "./AddFriendCard";
import Modal from "react-native-modal";

export default function AddFriendModal({ handleOpen }) {
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
  const [modalVisible, setModalVisible] = useState(false);

  const showAddFriendModal = () => {
    setModalVisible(true);
  };

  const hideAddFriendModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Assuming contacts is the array of contacts you want to search through
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  return (
    <View>
      <Button title="Open Add Friend Modal" onPress={showAddFriendModal} />
      <Modal isVisible={modalVisible} onBackdropPress={hideAddFriendModal}>
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
                onAcceptPress={() =>
                  console.log(`Accept Friend Request handler`)
                }
                status={contact.status}
              />
            ))}
          </ScrollView>
          <Button title="Close" onPress={hideAddFriendModal} />
        </View>
      </Modal>
    </View>
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
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10, // rounded corners
  },
});
