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
import LocationCard from "../../components/dairy/LocationCard";
import LocationCardPending from "../../components/dairy/LocationCardPending";
import { format } from "date-fns";
import axios from "axios";
import { router } from "expo-router";
import { set } from "firebase/database";
import { AuthContext } from "../../context/authContext";

export default function Diary() {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [activeRendezvous, setActiveRendezvous] = useState([]);
  const [pastRendezvous, setPastRendezvous] = useState([]);
  const [draftRendezvous, setDraftRendezvous] = useState([]);
  const [pendingRendezvous, setPendingRendezvous] = useState([]);

  const currentUserUID = useContext(AuthContext);

  useEffect(() => {
    getActiveRendezvous();
    if (selectedTab === "Past") {
      getPastRendezvous();
    } else if (selectedTab === "Draft") {
      getDraftRendezvous();
    } else if (selectedTab === "Pending") {
      getPendingRendezvous();
    }
  }, [selectedTab]);

  const getActiveRendezvous = () => {
    setSelectedTab("Active");
    const user = currentUserUID.user.uid;
    axios
      .post(`http://where-next.tech/rendezvous/get-active-rendezvous`, {
        useruid: user,
      })
      .then((response) => {
        setActiveRendezvous(response.data.RendezvousList);
        console.log(response.data.RendezvousList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getPastRendezvous = () => {
    setSelectedTab("Past");
    const user = currentUserUID.user.uid;
    axios
      .post(`http://where-next.tech/rendezvous/get-past-rendezvous`, {
        useruid: user,
      })
      .then((response) => {
        setPastRendezvous(response.data.RendezvousList);
        console.log(response.data.RendezvousList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getDraftRendezvous = () => {
    setSelectedTab("Draft");
    const user = currentUserUID.user.uid;
    axios
      .post(`http://where-next.tech/rendezvous/get-draft-rendezvous`, {
        useruid: user,
      })
      .then((response) => {
        setDraftRendezvous(response.data.RendezvousList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getPendingRendezvous = () => {
    setSelectedTab("Pending");
    const user = currentUserUID.user.uid;
    axios
      .post(`http://where-next.tech/rendezvous/get-pending-rendezvous`, {
        useruid: user,
      })
      .then((response) => {
        setPendingRendezvous(response.data.RendezvousList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // name placename time #members
  return (
    <ScrollView className="bg-[#fff]">
      <View className="p-4 pt-20 bg-[#fff]">
        <Text className="text-2xl font-semibold">Meeting Dairy</Text>
        <View style={styles.tabButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Active" && styles.activeTabButton,
            ]}
            onPress={getActiveRendezvous}
          >
            <Text style={styles.tabButtonText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Past" && styles.activeTabButton,
            ]}
            onPress={getPastRendezvous}
          >
            <Text style={styles.tabButtonText}>Past</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Draft" && styles.activeTabButton,
            ]}
            onPress={getDraftRendezvous}
          >
            <Text style={styles.tabButtonText}>Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Pending" && styles.activeTabButton,
            ]}
            onPress={getPendingRendezvous}
          >
            <Text style={styles.tabButtonText}>Pending</Text>
          </TouchableOpacity>
        </View>

        {selectedTab === "Active" ? (
          <View>
            {activeRendezvous &&
              activeRendezvous.map((rendezvous) => (
                <LocationCard
                  name={rendezvous.name}
                  placename={rendezvous.placename}
                  starttime={rendezvous.starttime}
                  endtime={rendezvous.endtime}
                  members={rendezvous.member}
                  placephotolink={rendezvous.placephotolink}
                  placelocation={rendezvous.placelocation}
                  status={rendezvous.status}
                  scheduleid={rendezvous.scheduleid}
                  currentuseruid={currentUserUID.user.uid}
                />
              ))}
          </View>
        ) : selectedTab === "Draft" ? (
          <View>
            {draftRendezvous &&
              draftRendezvous.map((rendezvous) => (
                <LocationCard
                  name={rendezvous.name}
                  placename={rendezvous.placename}
                  starttime={rendezvous.starttime}
                  endtime={rendezvous.endtime}
                  members={rendezvous.member}
                  placephotolink={rendezvous.placephotolink}
                  placelocation={rendezvous.placelocation}
                  status={rendezvous.status}
                  scheduleid={rendezvous.scheduleid}
                  currentuseruid={currentUserUID.user.uid}
                />
              ))}
          </View>
        ) : selectedTab === "Past" ? (
          <View>
            {pastRendezvous &&
              pastRendezvous.map((rendezvous) => (
                <LocationCard
                  name={rendezvous.name}
                  placename={rendezvous.placename}
                  starttime={rendezvous.starttime}
                  endtime={rendezvous.endtime}
                  members={rendezvous.member}
                  placephotolink={rendezvous.placephotolink}
                  placelocation={rendezvous.placelocation}
                  status={rendezvous.status}
                  scheduleid={rendezvous.scheduleid}
                  currentuseruid={currentUserUID.user.uid}
                />
              ))}
          </View>
        ) : selectedTab === "Pending" ? (
          <View>
            {pendingRendezvous &&
              pendingRendezvous.map((rendezvous) => (
                <LocationCardPending
                  name={rendezvous.name}
                  placename={rendezvous.placename}
                  starttime={rendezvous.starttime}
                  endtime={rendezvous.endtime}
                  members={rendezvous.member.length}
                  placephotolink={rendezvous.placephotolink}
                  placelocation={rendezvous.placelocation}
                  status={rendezvous.status}
                  scheduleid={rendezvous.scheduleid}
                  currentuseruid={currentUserUID.user.uid}
                  pendingRendezvous={pendingRendezvous}
                  setPendingRendezvous={setPendingRendezvous}
                />
              ))}
          </View>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
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
  tabButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#181D45",
    paddingVertical: 5,
    borderRadius: 20,
  },
  tabButton: {
    backgroundColor: "#181D45",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#4C51BF",
  },
  tabButtonText: {
    color: "#FFFFFF",
  },
});

// const statusHandler = (location) => {
//   console.log("my location", location);
//   if (location.meetingStatus == "draft") {
//     router.push("./createRendezvous/edit");
//   } else {
//     router.push("./createRendezvous/rendezvousInfo");
//   }
// };
