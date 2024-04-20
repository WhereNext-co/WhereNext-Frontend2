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

function LocationList({ locations, filterStatus }) {
  const filteredLocations = locations.filter(
    (location) => location.meetingStatus === filterStatus
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredLocations.map((location, index) => (
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

function Active({ locations }) {
  return <LocationList locations={locations} filterStatus="active" />;
}

function Past({ locations }) {
  return <LocationList locations={locations} filterStatus="past" />;
}

function Drafts({ locations }) {
  return <LocationList locations={locations} filterStatus="drafts" />;
}

function Pending({ locations }) {
  return <LocationList locations={locations} filterStatus="pending" />;
}

export default function Diary() {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [groupedLocations, setGroupedLocations] = useState({});
  const [isLocationsByDateEmpty, setIsLocationsByDateEmpty] = useState(false);
  const [locations, setLocations] = useState([
    {
      locationName: "The Complete",
      locationDetail: "Rachaprarop, Ratchathewi, Bangkok 10400",
      locationID: "123456",
      img: "",
      users: ["Guy Chelsea"],
      meetingStatus: "active", // This can be 'active', 'pending', 'past', or 'draft'
      date: "2022-01-01",
    },
    {
      locationName: "Fusion",
      locationDetail: "Phayathai, Ratchathewi, Bangkok 10400",
      locationID: "123437",
      img: "",
      users: ["John Doe", "Jane Doe"],
      meetingStatus: "active", // This can be 'active', 'pending', 'past', or 'draft'
      date: "2022-01-01",
    },
    {
      locationName: "Samitivej Hospital",
      locationDetail:
        "133 Sukhumvit 49 Alley, Khlong Tan Nuea, Watthana, Bangkok 10110",
      locationID: "123457",
      img: "",
      users: ["Mearz Wong"],
      meetingStatus: "past", // This can be 'active', 'pending', 'past', or 'draft'
      date: "2022-02-01",
    },
    // More locations here...
  ]);

  useEffect(() => {
    const newGroupedLocations = locations.reduce((acc, location) => {
      const date = format(new Date(location.date), "MMMM yyyy");
      if (!acc[date]) {
        acc[date] = [];
        setIsLocationsByDateEmpty(true);
      }
      acc[date].push(location);
      return acc;
    }, {});

    setGroupedLocations(newGroupedLocations);
  }, [locations]);

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

      {Object.entries(groupedLocations).map(([date, locations]) => {
        return (
          <View key={date}>
            {isLocationsByDateEmpty && <Text>{date}</Text>}
            {selectedTab === "Active" && <Active locations={locations} />}
            {selectedTab === "Past" && <Past locations={locations} />}
            {selectedTab === "Drafts" && <Drafts locations={locations} />}
            {selectedTab === "Pending" && <Pending locations={locations} />}
          </View>
        );
      })}
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
