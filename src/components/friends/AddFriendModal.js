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
  AccessibilityInfo,
} from "react-native";
import AddFriendCard from "./AddFriendCard";
import { remove, set } from "firebase/database";

export default function AddFriendModal() {
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
  // const [filteredContacts, setFilteredContacts] = useState([]);
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
  // useEffect(() => {
  //   setFilteredContacts(
  //     contacts.filter((contact) =>
  //       contact.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, contacts]);

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          style={styles.searchInput}
        />
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
        <Button onSearchPress={onSearchHandler}></Button>
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
