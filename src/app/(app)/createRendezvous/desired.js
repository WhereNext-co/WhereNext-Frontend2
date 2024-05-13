import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
  Pressable,
} from "react-native";
import CustomCalendar from "../../../components/calendar/CustomCalendar";
import TimePicker from "../../../components/calendar/TimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import InviteFriend from "../../../components/calendar/InviteFriend";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function CreateMeeting() {
  let {
    uid,
    friendUIDs,
    duration,
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
    rendezvousName,
  } = useLocalSearchParams();
  // State variables
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const onConfirm = () => {
    router.push({
      pathname: "./scheduleSyncFriend",
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

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartTime(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndTime(currentDate);
  };

  const onPrint = () => {
    console.log("START:" + startTime + "END:" + endTime);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.allDayText}>All Day</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsAllDay((previousState) => !previousState)}
            value={isAllDay}
          />
        </View>
      </View>
      <View style={{ borderTopWidth: 1, borderColor: "#000", margin: 10 }} />
      <View>
        <CustomCalendar
          onEndDateChange={handleEndDateChange}
          onStartDateChange={handleStartDateChange}
        />
        <View style={{ borderTopWidth: 1, borderColor: "#000", margin: 15 }} />
        <View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Start Time</Text>
            <DateTimePicker
              style={styles.picker}
              mode="time"
              value={startTime}
              onChange={onChangeStartDate}
              textColor="white"
              accentColor="white"
              disabled={isAllDay}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>End Time</Text>
            <DateTimePicker
              style={styles.picker}
              mode="time"
              value={endTime}
              onChange={onChangeEndDate}
              textColor="white"
              accentColor="white"
              disabled={isAllDay}
            />
          </View>
        </View>

        <Pressable
          onPress={onConfirm}
          style={styles.sendInvitesButtonContainer}
        >
          <LinearGradient
            colors={["#2acbf9", "#9aeeb0"]}
            style={styles.sendInvitesButton}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.sendInviteButtonText}>Confirm</Text>
          </LinearGradient>
        </Pressable>

        {/* Stack Screen */}
        <Stack.Screen options={{ headerShown: false }} />

        {/* Invite Friend: <InviteFriend onFriendChange={handleFriendChange} /> */}
      </View>
    </SafeAreaView>
  );
}

//All day: start end date calendar
//Not All day: start end date from normal picker

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dedede",
    borderRadius: 16,
    margin: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  allDayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  pickerContainer: {
    margin: 20,
  },
  picker: {
    margin: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#dedede",
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  timeText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  sendInvitesButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  sendInvitesButton: {
    width: "90%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  sendInviteButtonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
