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
import DesiredFriendCard from "../../../components/calendar/DesiredFriendCard";
import InviteFriend from "../../../components/calendar/InviteFriend";
import axios from "axios";
import Modal from "react-native-modal";
import { router, useLocalSearchParams, Stack } from "expo-router";

export default function Friends() {
  let {
    uid,
    startTime,
    endTime,
    duration,
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
    rendezvousName,
  } = useLocalSearchParams();

  const [friendUIDs, setFriendUIDs] = useState([]);

  const handleFriendChange = (friendUIDList) => {
    setFriendUIDs(friendUIDList);
    console.log(friendUIDs);
  };

  const sendInvitesHandler = () => {
    router.push({
      pathname: "./confirmation",
      params: {
        uid: uid,
        startTime: startTime,
        endTime: endTime,
        friendUIDs: friendUIDs,
        duration: duration,
        placegoogleplaceid: placegoogleplaceid,
        placename: placename,
        placelocation: placelocation,
        placemaplink: placemaplink,
        placephotolink: placephotolink,
        rendezvousName: rendezvousName,
      },
    });
  };

  const DummyUid = "pkXM6xwBb4RnZt1Qh8qjuuPTHeI3";

  return (
    <SafeAreaView>
      <ScrollView>
        <InviteFriend
          onFriendChange={handleFriendChange}
          currentUserUID={DummyUid}
        />
      </ScrollView>
      <Button title="Send Invites" onPress={sendInvitesHandler}></Button>

      {/* Stack Screen */}
      <Stack.Screen options={{ headerShown: false }} />
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
});

// uid,
// startTime,
// endTime,
// friendUIDs,
// duration,
// placegoogleplaceid,
// placename,
// placelocation,
// placemaplink,
// placephotolink,
// rendezvousName,
