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
import FriendCard from "../../../components/friends/FriendCard";
import AddFriendModal from "../../../components/friends/AddFriendModal";
import axios from "axios";
import Modal from "react-native-modal";
import firebase from "firebase/auth";

export default function Friends() {
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
  const [modalVisible, setModalVisible] = useState(false);
  // const { user } = useContext(AuthContext);

  /*
  useEffect(() => {
    // friend lists from API
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      axios
        .get(`http://where-next.tech/users/friends`, { uid: uid })
        .then((response) => {
          setContacts(response.data.friendList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);
  */

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

      <AddFriendModal />

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
