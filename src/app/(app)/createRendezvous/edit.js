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
        router.replace("./createRendezvous/scheduleSyncFriend");
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

        {/* Rendezvous Name Input */}
        <TextInput
          value={rendezvousName}
          onChangeText={handleRendezvousName}
          placeholder="Rendezvous Name"
        />

        {/* Custom Calendar */}
        <CustomCalendar
          onEndDateChange={handleEndDateChange}
          onStartDateChange={handleStartDateChange}
        />

        {/* Time Picker */}
        <TimePicker onDurationChange={handleDurationChange} />

        {/* Duration */}
        <Text>Duration: {duration}</Text>
        <Text>
          {startDate ? startDate.toString() : "NULL"}
          {endDate ? endDate.toString() : "NULL"}
        </Text>

        {/* Invite Friend */}
        <InviteFriend onFriendChange={handleFriendChange} />

        {/* Schedule Sync Button */}
        <Button title="Schedule Sync" onPress={handleScheduleSync} />
      </View>
    </SafeAreaView>
  );
}
