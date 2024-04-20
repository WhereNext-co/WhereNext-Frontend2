import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Button,
  AccessibilityInfo,
} from "react-native";
import AddFriendCard from "./AddFriendCard";
import Modal from "react-native-modal";
import { remove, set } from "firebase/database";

export default function AddFriendModal({ handleOpen }) {
  const [contacts, setContacts] = useState(
    //default friends
    {
      img: "",
      name: "Guy Naga",
      status: "Friend",
    }
  );
  const [friendstatus, setFriendStatus] = useState("");

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

  const onSearchHandler = () => {
    const user = firebase.auth().currentUser;
    axios
      .get(`http://where-next.tech/users/friends/friendinfo`, {
        uid: user.uid,
        friendName: search,
      })
      .then((response) => {
        setContacts(response.data.friend);
        setFriendStatus(response.data.friendStatus);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const addFriendHandler = (contact) => {
    const user = firebase.auth().currentUser;
    axios
      .post("http://where-next.tech/users/friendrequest", {
        uid: user.uid,
        friendName: contact.name,
      })
      .then((response) => {
        console.log(response.data);
        setContacts([...contacts, friend]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const cancelFriendRequestHandler = (contact) => {
    const user = firebase.auth().currentUser;
    axios
      .delete("http://where-next.tech/users/friendrequest/cancel", {
        uid: user.uid,
        friendName: contact.name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeFriendHandler = (contact) => {
    const user = firebase.auth().currentUser;
    axios
      .delete("http://where-next.tech/users/friends", {
        uid: user.uid,
        friendName: contact.name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const AcceptFriendHandler = (contact) => {
    const user = firebase.auth().currentUser;
    axios
      .put("http://where-next.tech/users/friendrequest", {
        uid: user.uid,
        friendName: contact.name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const showAddFriendModal = () => {
    setModalVisible(true);
  };

  const hideAddFriendModal = () => {
    setModalVisible(false);
  };

  // useEffect(() => {
  // Assuming contacts is the array of contacts you want to search through
  //   setFilteredContacts(
  //     contacts.filter((contact) =>
  //       contact.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, contacts]);

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
            <AddFriendCard
              key={contact.Uid}
              img={contact.ProfilePicture}
              name={contact.Name}
              onAddPress={addFriendHandler}
              onPendingPress={cancelFriendRequestHandler}
              onRemovePress={removeFriendHandler}
              onAcceptPress={AcceptFriendHandler}
              status={friendstatus}
            />
          </ScrollView>
          <Button onSearchPress={onSearchHandler} />
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
