import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import CustomCalendar from "../../../components/calendar/CustomCalendar";
import TimePicker from "../../../components/calendar/TimePicker";
import InviteFriend from "../../../components/calendar/InviteFriend";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { set } from "date-fns";

export default function CreateMeeting() {
  // State variables
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rendezvousName, setRendezvousName] = useState("");
  const [duration, setDuration] = useState(0);
  const [friendUIDs, setFriendUIDs] = useState([]);

  // Event handlers
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleRendezvousName = (text) => {
    setRendezvousName(text);
  };

  const handleDurationChange = (duration) => {
    setDuration(duration);
  };

  const handleFriendChange = (friendUIDList) => {
    setFriendUIDs(friendUIDList);
    console.log(friendUIDs);
  };

  // Rendezvous object
  const [rendezvous, setRendezvous] = useState({
    uid: "",
    startTime: "",
    endTime: "",
    friendUIDs: [],
    duration: 0,
  });

  // Schedule sync handler
  const handleScheduleSync = () => {
    if (rendezvousName === "") {
      alert("Rendezvous Name cannot be empty");
      return;
    } else {
      console.log(rendezvous);
      setRendezvous({
        uid: "",
        startTime: startDate,
        endTime: endDate,
        friendUIDs: friendUIDs,
        duration: duration,
      });

      try {
        /* const response = await axios.post(
        'http://where-next.tech/schedulesync/get-free-timeslot',
        rendezvous
      );

      if (response.status !== 200) {
        throw new Error('HTTP error ' + response.status);
      } */
        console.log("Rendezvous created:", rendezvous);
        router.replace("./createRendezvous/scheduleSync");
        alert("Rendezvous created successfully!");
      } catch (error) {
        console.error("Failed to create rendezvous:", error);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        {/* Stack Screen */}
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.textInput}>
          {/* Rendezvous Name Input */}
          <TextInput
            value={rendezvousName}
            onChangeText={handleRendezvousName}
            placeholder="Rendezvous Name"
          />
        </View>

        <View style={styles.calendar}>
          {/* Custom Calendar */}
          <CustomCalendar
            onEndDateChange={handleEndDateChange}
            onStartDateChange={handleStartDateChange}
          />
        </View>

        <View>
          {/* Time Picker */}
          <TimePicker onDurationChange={handleDurationChange} />
        </View>

        {/* Duration */}
        <Text>Duration: {duration}</Text>
        <Text>
          {startDate ? startDate.toString() : "NULL"}
          {endDate ? endDate.toString() : "NULL"}
        </Text>

        <View style={styles.inviteFriend}>
          {/* Invite Friend */}
          <InviteFriend onFriendChange={handleFriendChange} />
        </View>

        {/* Schedule Sync Button */}
        <Button title="Schedule Sync" onPress={handleScheduleSync} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  textInput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  inviteFriend: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
});
