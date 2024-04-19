import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import CustomCalendar from "../../../components/calendar/CustomCalendar";
import TimePicker from "../../../components/calendar/TimePicker";
import InviteFriend from "../../../components/calendar/InviteFriend";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function CreateMeeting() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rendezvousName, setRendezvousName] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleRendezvousName = (text) => {
    setRendezvousName(text);
  };

  const [rendezvous, setRendezvous] = useState({
    hostuid: "",
    name: rendezvousName,
    type: "",
    starttime: "",
    endtime: "",
    status: "Draft",
    InvitedUsers: ["123", "456"],
    placename: "",
    placegoogleplaceid: "",
    placelocation: "",
    placemaplink: "",
    placephotolink: "",
  });

  const handleScheduleSync = () => {
    if (rendezvousName === "") {
      alert("Rendezvous Name cannot be empty");
      return;
    } else if (rendezvous.InvitedUsers.length === 0) {
      alert("Please invite friends");
      return;
    } else {
      console.log(rendezvous);
      setRendezvous({
        hostuid: "",
        name: rendezvousName,
        type: "",
        starttime: "",
        endtime: "",
        status: "Active",
        InvitedUsers: ["163", "496"],
        placename: "",
        placegoogleplaceid: "",
        placelocation: "",
        placemaplink: "",
        placephotolink: "",
      });

      try {
        /* const response = await axios.post(
        'https://your-api-url.com/create',
        rendezvous
      );

      if (response.status !== 200) {
        throw new Error('HTTP error ' + response.status);
      } */
        console.log("Rendezvous created:", rendezvous);
        alert("Rendezvous created successfully!");
      } catch (error) {
        console.error("Failed to create rendezvous:", error);
      }
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Stack.Screen options={{ headerShown: false }} />
        <TextInput
          value={rendezvousName}
          onChangeText={handleRendezvousName}
          placeholder="Rendezvous Name"
        />
        <CustomCalendar
          onEndDateChange={handleEndDateChange}
          onStartDateChange={handleStartDateChange}
        />
        <TimePicker />
        <Text>Duration: </Text>
        <Text>
          {startDate ? startDate.toString() : "NULL"}
          {endDate ? endDate.toString() : "NULL"}
        </Text>
        <InviteFriend />
        <Button title="Schedule Sync" onPress={handleScheduleSync} />
      </View>
    </SafeAreaView>
  );
}
