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

function Active({ locations }) {
  const activeLocations = locations.filter(
    (location) => location.placeStatus === "active"
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
          placeStatus={location.placeStatus}
        />
      ))}
    </ScrollView>
  );
}

function Past({ locations }) {
  const pastLocations = locations.filter(
    (location) => location.placeStatus === "past"
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
          placeStatus={location.placeStatus}
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
          placeStatus={location.placeStatus}
        />
      ))}
    </ScrollView>
  );
}

function Pending({ locations }) {
  const pendingLocations = locations.filter(
    (location) => location.placeStatus === "pending"
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
          placeStatus={location.placeStatus}
        />
      ))}
    </ScrollView>
  );
}

export default function Dairy() {
  const [locations, setLocations] = useState([
    {
      locationName: "The Complete",
      locationDetail: "Rachaprarop, Ratchathewi, Bangkok 10400",
      img: "",
      users: ["Guy Chelsea"],
      placeStatus: "active", // This can be 'active', 'pending', 'past', or 'draft'
    },
    // More locations here...
  ]);
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
      <View style={styles.navContainer}>
        <Button>Active</Button>
        <Button>Past</Button>
        <Button>Drafts</Button>
      </View>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        style={styles.searchInput}
      />
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
    position: "absolute",
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
