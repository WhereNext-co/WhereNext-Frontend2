/*import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import CustomCalendar from "../../components/calendar/CustomCalendar";
import TimePicker from "../../components/calendar/TimePicker";
import InviteFriend from "../../components/calendar/InviteFriend";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfirmationModal from "../../components/calendar/ConfirmationModal";

export default function CreateMeeting() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rendezvousName, setRendezvousName] = useState("");
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isScheduleSyncVisisble, setScheduleSyncVisible] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleRendezvousName = (text) => {
    setRendezvousName(text);
  };

  const [duration, setDuration] = useState("0:00");

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
        const response = await axios.post(
        'https://your-api-url.com/create',
        rendezvous
      );

      if (response.status !== 200) {
        throw new Error('HTTP error ' + response.status);
      } 
        setConfirmModalVisible(true);
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
        <CustomCalendar
          onEndDateChange={handleEndDateChange}
          onStartDateChange={handleStartDateChange}
        />
        <TimePicker time={duration} setTime={setDuration} title={duration} />
        <Text>Duration: {duration}</Text>
        <Text>
          {startDate ? startDate.toString() : "NULL"}
          {endDate ? endDate.toString() : "NULL"}
        </Text>
        <InviteFriend />
        <Button title="Schedule Sync" onPress={handleScheduleSync} />
        <ConfirmationModal
          isVisible={isConfirmModalVisible}
          users={rendezvous.InvitedUsers}
          onCancel={() => setConfirmModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}*/
