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
import { format } from "date-fns";
import axios from "axios";
import { router } from "expo-router";

function LocationList({ locations, filterStatus }) {
  const filteredLocations = locations.filter(
    (location) => location.meetingStatus === filterStatus
  );

  const statusHandler = (location) => {
    console.log("my location", location);
    if (location.meetingStatus == "draft") {
      router.push("./createRendezvous/edit");
    } else {
      router.push("./createRendezvous/rendezvousInfo");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredLocations.map((location, index) => (
        <LocationCard
          key={index}
          img={location.img}
          locationName={location.locationName}
          locationDetail={location.locationDetail}
          onPress={() => statusHandler(location)}
          meetingStatus={location.meetingStatus}
        />
      ))}
    </ScrollView>
  );
}

function Active({ locations }) {
  console.log("Active", locations[0].meetingStatus);
  return <LocationList locations={locations} filterStatus="active" />;
}

function Past({ locations }) {
  console.log("Past", locations);
  return <LocationList locations={locations} filterStatus="past" />;
}

function Drafts({ locations }) {
  console.log("Draft", locations);
  return <LocationList locations={locations} filterStatus="draft" />;
}

function Pending({ locations }) {
  console.log("Pending", locations);
  return <LocationList locations={locations} filterStatus="pending" />;
}

export default function Diary() {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [locations, setLocations] = useState([
    {
      locationName: "Samitivej Hospital",
      locationDetail:
        "133 Sukhumvit 49 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110",
      locationID: "123457",
      img: "",
      users: ["Mearz Wong"],
      meetingStatus: "draft", // This can be 'active', 'pending', 'past', or 'draft'
      date: "2022-02-01",
    },
    {
      locationName: "Pung Hospital",
      locationDetail:
        "133 Sukhumvit 49 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110",
      locationID: "123457",
      img: "",
      users: ["Mearz Wong"],
      meetingStatus: "active", // This can be 'active', 'pending', 'past', or 'draft'
      date: "2022-02-01",
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

  return (
    <SafeAreaView>
      <View style={styles.navContainer}>
        <Button title="Active" onPress={() => setSelectedTab("Active")} />
        <Button title="Past" onPress={() => setSelectedTab("Past")} />
        <Button title="Drafts" onPress={() => setSelectedTab("Drafts")} />
        <Button title="Pending" onPress={() => setSelectedTab("Pending")} />
      </View>

      <View>
        {selectedTab === "Active" && <Active locations={locations} />}
        {selectedTab === "Past" && <Past locations={locations} />}
        {selectedTab === "Drafts" && <Drafts locations={locations} />}
        {selectedTab === "Pending" && <Pending locations={locations} />}
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
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Optional: adjust based on your layout needs
    alignItems: "center", // Optional: adjust based on your layout needs
    padding: 10,
  },
});
