import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import CustomCalendar from "../../components/calendar/CustomCalendar";
import TimePicker from "../../components/calendar/TimePicker";
import InviteFriend from "../../components/calendar/InviteFriend";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

export default function CreateMeeting() {
  const [markedDates, setMarkedDates] = useState({
    "2024-04-02": { selected: true, color: "green" },
  });
  const [rendezvousName, setRendezvousName] = useState("");

  const handleRendezvousName = (text) => {
    setRendezvousName(text);
  };

  const onDayPress = (day) => {
    if (markedDates[day.dateString]) {
      const newMarkedDates = { ...markedDates };
      delete newMarkedDates[day.dateString];
      setMarkedDates(newMarkedDates);
    } else {
      setMarkedDates({
        ...markedDates,
        [day.dateString]: {
          color: "green",
          selected: true,
          startingDay: true,
          endingDay: true,
        },
      });
    }
  };
  const [startTime, setStartTime] = useState("0:00");
  const [endTime, setEndTime] = useState("0:00");

  const [meeting, setMeeting] = useState({
    meetingName: "",
    date: "",
    location: "",
    startTime: "",
    endTime: "",
    members: [],
  });

  const handleCreateMeeting = async () => {
    if (rendezvousName === "") {
      alert("Rendezvous Name cannot be empty");
      return;
    } else if (startTime === "0:00" || endTime === "0:00") {
      alert("Please select a valid time");
      return;
    } else if (startTime >= endTime) {
      alert("Start time must be before end time");
      return;
    } else if (Object.keys(markedDates).length === 0) {
      alert("Please select a date");
      return;
    } else if (meeting.members.length === 0) {
      alert("Please invite friends");
      return;
    } else {
      const rendezvous = {
        hostuid: "",
        name: rendezvousName,
        type: "",
        starttime: startTime,
        endtime: endTime,
        startdate: Object.keys(markedDates)[0],
        enddate: Object.keys(markedDates)[0],
        qrcode: "",
        status: "Active",
        InvitedUsers: meeting.members,
        placename: "",
        placegoogleplaceid: "",
        placelocation: "",
        placemaplink: "",
        placephotolink: "",
      };

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
        <TextInput
          value={rendezvousName}
          onChangeText={handleRendezvousName}
          placeholder="Rendezvous Name"
        />
        <CustomCalendar />
        <TimePicker time={startTime} setTime={setStartTime} title={startTime} />
        <TimePicker time={endTime} setTime={setEndTime} title={endTime} />
        <Text>Start Time: {startTime}</Text>
        <Text>End Time: {endTime}</Text>
        <InviteFriend />
        <Button title="Create Rendezvous" onPress={handleCreateMeeting} />
      </View>
    </SafeAreaView>
  );
}
