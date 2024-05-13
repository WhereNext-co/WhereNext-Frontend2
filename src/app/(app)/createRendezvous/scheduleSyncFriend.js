import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import { router, useLocalSearchParams, Stack } from "expo-router";
import InviteFriendAvailable from "../../../components/calendar/InviteFriendAvailable";
import { LinearGradient } from "expo-linear-gradient";

export default function Friends() {
  let {
    uid,
    startTime,
    endTime,
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
    rendezvousName,
    duration,
  } = useLocalSearchParams();

  const [friendUIDs, setFriendUIDs] = useState([]);
  const [isFormFilled, setIsFormFilled] = useState(false);
  useEffect(() => {
    // Check if all required fields are filled
    if (friendUIDs.length > 0) {
      setIsFormFilled(true); // Set isFormFilled to true if all fields are filled
    } else {
      setIsFormFilled(false); // Set isFormFilled to false if any field is empty
    }
  }, [friendUIDs]);
  const handleFriendChange = (friendUIDList) => {
    setFriendUIDs(friendUIDList);
    console.log(friendUIDs);
  };
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isFormFilled]); // Trigger animation when isFormFilled changes

  const sendInvitesHandler = () => {
    router.push({
      pathname: "./confirmation",
      params: {
        uid: uid,
        startTime: startTime,
        endTime: endTime,
        friendUIDs: friendUIDs,
        duration: duration,
        rendezvousName: rendezvousName,
        placegoogleplaceid: placegoogleplaceid,
        placename: placename,
        placelocation: placelocation,
        placemaplink: placemaplink,
        placephotolink: placephotolink,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Stack Screen */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.friendContainer}>
        <InviteFriendAvailable
          onFriendChange={handleFriendChange}
          currentUserUID={uid}
          startTime={startTime}
          endTime={endTime}
        />
      </View>

      {isFormFilled && (
        <TouchableOpacity onPress={sendInvitesHandler}>
          <LinearGradient
            colors={["#2acbf9", "#9aeeb0"]}
            style={styles.createButton}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.createButtonText}>Create Rendezvous</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  friendContainer: {
    paddingTop: 50,
    height: "80%",
    width: 400,
  },
  container: {
    flex: 1,
    backgroundColor: "#181D45",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2A9D8F",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  createButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  createButton: {
    width: "90%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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

{
  /* <InviteFriendAvailable
onFriendChange={handleFriendChange}
currentUserUID={uid}
startTime={startTime}
endTime={endTime}
/> */
}
