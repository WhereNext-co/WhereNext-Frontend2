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
import LocationCard from "../../components/dairy/LocationCard";
import axios from "axios";

function Active({ locations }) {
  const activeLocations = locations.filter(
    (location) => location.meetingStatus === "active"
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {activeLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          meetingStatus={location.meetingStatus}
        />
      ))}
    </ScrollView>
  );
}

function Past({ locations }) {
  const pastLocations = locations.filter(
    (location) => location.meetingStatus === "past"
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pastLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          meetingStatus={location.meetingStatus}
        />
      ))}
    </ScrollView>
  );
}

function Drafts({ locations }) {
  const draftLocations = locations.filter(
    (location) => location.placeStatus === "draft"
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {draftLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          meetingStatus={location.meetingStatus}
        />
      ))}
    </ScrollView>
  );
}

function Pending({ locations }) {
  const pendingLocations = locations.filter(
    (location) => location.meetingStatus === "pending"
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pendingLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => {
            // Handle the press event here...
          }}
          meetingStatus={location.meetingStatus}
        />
      ))}
    </ScrollView>
  );
}

export default function Dairy() {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [locations, setLocations] = useState([
    {
      locationName: "The Complete",
      locationDetail: "Rachaprarop, Ratchathewi, Bangkok 10400",
      locationID: "123456",
      img: "",
      users: ["Guy Chelsea"],
      meetingStatus: "active", // This can be 'active', 'pending', 'past', or 'draft'
    },
    // More locations here...
  ]);

  /*
    useEffect(() => {
    axios.get('API_URL/locations')
      .then(response => {
        setLocations(response.data);
        setFilteredLocations(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  */

  const [search, setSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.locationName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, locations]);

  return (
    <SafeAreaView>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        style={styles.searchInput}
      />

      <View style={styles.navContainer}>
        <Button title="Active" onPress={() => setSelectedTab("Active")} />
        <Button title="Past" onPress={() => setSelectedTab("Past")} />
        <Button title="Drafts" onPress={() => setSelectedTab("Drafts")} />
      </View>

      {selectedTab === "Active" && <Active locations={locations} />}
      {selectedTab === "Past" && <Past locations={locations} />}
      {selectedTab === "Drafts" && <Drafts locations={locations} />}
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
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Optional: adjust based on your layout needs
    alignItems: "center", // Optional: adjust based on your layout needs
    padding: 10,
  },
});

/*
  useEffect(() => {
    fetch('https://your-backend-url/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error(error));
  }, []);
  */
