import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
} from "react-native";
import CustomCalendar from "../../../components/calendar/CustomCalendar";
import TimePicker from "../../../components/calendar/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isAllDay, setIsAllDay] = useState(false);

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
      router.replace("./scheduleSyncFriend");

      try {
        /* const response = await axios.post(
        'http://where-next.tech/schedulesync/get-free-timeslot',
        rendezvous
      );

      if (response.status !== 200) {
        throw new Error('HTTP error ' + response.status);
      } */
        console.log("Rendezvous created:", rendezvous);
        router.replace("./scheduleSyncFriend");
      } catch (error) {
        console.error("Failed to create rendezvous:", error);
      }
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartTime(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndTime(currentDate);
  };

  return (
    <SafeAreaView>
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsAllDay((previousState) => !previousState)}
          value={isAllDay}
        />
      </View>

      <Text>{isAllDay}</Text>
      <View>
        {isAllDay ? (
          <View>
            <Text>Calendar</Text>
            <CustomCalendar
              onEndDateChange={handleEndDateChange}
              onStartDateChange={handleStartDateChange}
            />
          </View>
        ) : (
          <View>
            <Text>Date and Time Picker</Text>
            <DateTimePicker
              mode="datetime"
              value={startTime}
              onChange={onChangeStartDate}
            />
            <DateTimePicker
              mode="datetime"
              value={endTime}
              onChange={onChangeEndDate}
            />
          </View>
        )}

        {/* Stack Screen */}
        <Stack.Screen options={{ headerShown: false }} />

        {/* Invite Friend */}
        <InviteFriend onFriendChange={handleFriendChange} />
      </View>
    </SafeAreaView>
  );
}

//All day: start end date calendar
//Not All day: start end date from normal picker
