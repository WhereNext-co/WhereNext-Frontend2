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
import { set } from "firebase/database";

export default function Diary() {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [activeRendezvous, setActiveRendezvous] = useState([]);
  const [pastRendezvous, setPastRendezvous] = useState([]);
  const [draftRendezvous, setDraftRendezvous] = useState([]);
  const [pendingRendezvous, setPendingRendezvous] = useState([]);

  const currentUserUID = "aaa";

  const getActiveRendezvous = () => {
    setSelectedTab("Active");
    const user = currentUserUID;
    axios
      .post(`http://where-next.tech/rendezvous/get-active-rendezvous`, {
        userid: user,
      })
      .then((response) => {
        setActiveRendezvous(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getPastRendezvous = () => {
    setSelectedTab("Past");
    const user = currentUserUID;
    axios
      .post(`http://where-next.tech/rendezvous/get-past-rendezvous`, {
        userid: user,
      })
      .then((response) => {
        setPastRendezvous(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getDraftRendezvous = () => {
    setSelectedTab("Draft");
    const user = currentUserUID;
    axios
      .post(`http://where-next.tech/rendezvous/get-draft-rendezvous`, {
        userid: user,
      })
      .then((response) => {
        setDraftRendezvous(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getPendingRendezvous = () => {
    setSelectedTab("Pending");
    const user = currentUserUID;
    axios
      .post(`http://where-next.tech/rendezvous/get-pending-rendezvous`, {
        userid: user,
      })
      .then((response) => {
        setPendingRendezvous(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // name placename time #members
  return (
    <SafeAreaView>
      <View>
        <Button title="Active" onPress={getActiveRendezvous} />
        <Button title="Past" onPress={getPastRendezvous} />
        <Button title="Draft" onPress={getDraftRendezvous} />
        <Button title="Pending" onPress={getPendingRendezvous} />
      </View>

      <ScrollView>
        {selectedTab === "Active" ? (
          <View>
            {activeRendezvous.map((rendezvous) => (
              <LocationCard
                name={rendezvous.name}
                placeName={rendezvous.placeName}
                time={rendezvous.time}
                members={rendezvous.members.length}
              />
            ))}
          </View>
        ) : selectedTab === "Past" ? (
          <View>
            {draftRendezvous.map((rendezvous) => (
              <LocationCard
                name={rendezvous.name}
                placeName={rendezvous.placeName}
                time={rendezvous.time}
                members={rendezvous.members.length}
              />
            ))}
          </View>
        ) : selectedTab === "Draft" ? (
          <View>
            {pastRendezvous.map((rendezvous) => (
              <LocationCard
                name={rendezvous.name}
                placeName={rendezvous.placeName}
                time={rendezvous.time}
                members={rendezvous.members.length}
              />
            ))}
          </View>
        ) : selectedTab === "Pending" ? (
          <View>
            {pendingRendezvous.map((rendezvous) => (
              <LocationCard
                name={rendezvous.name}
                placeName={rendezvous.placeName}
                time={rendezvous.time}
                members={rendezvous.members.length}
              />
            ))}
          </View>
        ) : (
          <></>
        )}
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
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Optional: adjust based on your layout needs
    alignItems: "center", // Optional: adjust based on your layout needs
    padding: 10,
  },
});
