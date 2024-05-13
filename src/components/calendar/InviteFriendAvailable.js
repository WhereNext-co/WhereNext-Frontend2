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
  LayoutAnimation,
  UIManager,
} from "react-native";
import FriendAvailableCard from "./InviteFriendAvailableCard";
import axios from "axios";
import Modal from "react-native-modal";
import Search from "../../../assets/home/search/search.svg";

// Enable layout animations for Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Friends({
  onFriendChange,
  currentUserUID,
  startTime,
  endTime,
}) {
  useEffect(() => {
    // friend lists from API
    axios
      .post(`http://where-next.tech/schedulesync/get-friends-schedules`, {
        uid: currentUserUID,
        startTime: startTime,
        endTime: endTime,
      })
      .then((response) => {
        setContacts(response.data);
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
    console.log("contacts", contacts);
    console.log("filteredContacts", filteredContacts);
  }, [search, contacts]);

  // State variables
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // State to manage input box expansion

  // Event handler for selecting/deselecting friends
  const handlePress = (friend) => {
    let updatedSelectedFriends;
    if (selectedFriends.includes(friend.Uid)) {
      updatedSelectedFriends = selectedFriends.filter(
        (id) => id !== friend.Uid
      );
    } else {
      updatedSelectedFriends = [...selectedFriends, friend.Uid];
    }
    setSelectedFriends(updatedSelectedFriends);
    console.log(`From child component: ${updatedSelectedFriends}`);
    onFriendChange(updatedSelectedFriends);
  };

  // Filter contacts based on search input
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.Name.toLowerCase().includes(search.toLowerCase()) ||
          contact.Uid.toLowerCase().includes(search.toLowerCase())
      )
    );
    console.log("fil", filteredContacts);
  }, [search, contacts]);

  // Function to handle search icon press
  const handleSearchIconPress = () => {
    setIsExpanded(!isExpanded); // Toggle input box visibility
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Render the "Choose Friends" text only if there is no search query */}
        {!isExpanded && <Text style={styles.headerText}>Choose Friends</Text>}
        <TouchableOpacity
          style={isExpanded && styles.searchContainer}
          onPress={handleSearchIconPress}
        >
          {/* Wrap the search icon inside a TouchableOpacity */}
          <Search
            width={25}
            height={25}
            style={
              isExpanded ? styles.searchIconWhenExpanded : styles.searchIcon
            }
          />
          {/* Conditionally render the TextInput based on whether there is a search query */}
          {isExpanded && (
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#181D45"
              style={styles.searchInput}
            />
          )}
        </TouchableOpacity>
      </View>
      {filteredContacts.length === 0 ? (
        <View>
          <Text className="text-[#fff]">No friends found</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.friendList}>
          {filteredContacts.map((contact) => (
            <FriendAvailableCard
              key={contact.Uid}
              img={contact.ProfilePicture}
              name={contact.Name}
              onPress={() => handlePress(contact)}
              isSelected={selectedFriends.includes(contact.Uid)}
              available={contact.Availability}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // Add marginBottom for spacing
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F066",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1, // Fill remaining space
  },
  searchIconWhenExpanded: {
    marginRight: 10,
    color: "#181D45",
  },
  searchIcon: {
    color: "#fff",
  },
  searchInput: {
    height: 40,
    color: "#181D45",
    flex: 1, // Fill remaining space
  },
  friendList: {
    flexGrow: 1,
  },
});
