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
  Linking,
} from "react-native";
import FriendCard from "../../components/friends/FriendCard";
import AddFriendModal from "../../components/friends/AddFriendModal";
import FriendRequestModal from "../../components/friends/FriendRequestModal";
import Xmark from "../../../assets/friends/x-mark.svg";
import axios from "axios";
import Modal from "react-native-modal";
import firebase from "firebase/auth";
import colors from "../../shared/colors";
import { AuthContext } from "../../context/authContext";

export default function Friends() {
  const currentUserUID = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  //View Friend Profile Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleViewFriend = (UID) => {
    console.log(UID);
    axios
      .post("http://where-next.tech/users/get-profile", {
        uid: UID,
      })
      .then((response) => {
        setTitle(response.data.user.Title);
        setName(response.data.user.Name);
        setUsername(response.data.user.UserName);
        setPhoneNumber(response.data.user.Region + response.data.user.TelNo);
        setProfilePicture(response.data.user.ProfilePicture);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    setModalVisible(true);
  };

  // const { user } = useContext(AuthContext);
  useEffect(() => {
    // friend lists from API
    const user = currentUserUID.user.uid;
    axios
      .post(`http://where-next.tech/users/get-friends`, {
        uid: user,
      })
      .then((response) => {
        setContacts(response.data.friendList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.Name.toLowerCase().includes(search.toLowerCase()) ||
          contact.Uid.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contacts]);

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-semibold">Friends List</Text>
          <View className="flex flex-row items-center">
            <FriendRequestModal />
            <AddFriendModal />
          </View>
          <View>
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}
              style={styles.profileModalContainer}
            >
              <View style={styles.xmarkContainer}>
                <Xmark
                  width={25}
                  height={25}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
              <View>
                <Image
                  alt=""
                  resizeMode="cover"
                  source={{
                    uri: `https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F${profilePicture.slice(
                      81
                    )}`,
                  }}
                  style={styles.imageProfileModal}
                />
              </View>
              <View className="flex flex-row">
                <Text style={styles.nameProfileText}>{title}</Text>
                <Text style={styles.nameProfileText}>{name}</Text>
              </View>
              <View style={styles.usernameProfileContainer}>
                <Text>@{username}</Text>
              </View>
              <View style={styles.phoneProfileContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                >
                  <Text style={styles.phoneProfileText}>{phoneNumber}</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Friends"
          style={styles.searchBar}
        />

        <ScrollView>
          {filteredContacts.map((contact) => (
            <FriendCard
              key={contact.Uid}
              img={contact.ProfilePicture}
              name={contact.Name}
              onPress={() => handleViewFriend(contact.Uid)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    shadowColor: colors.black, // This is required for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This property adds shadow on Android
    flexGrow: 1,
    marginVertical: 8,
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
  profileModalContainer: {
    marginVertical: 300,
    width: 300,
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  imageProfileModal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  nameProfileText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  phoneProfileContainer: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "grey",
  },
  phoneProfileText: {
    color: "white",
  },
  usernameProfileContainer: {
    margin: 16,
  },
  xmarkContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 16,
  },
});
