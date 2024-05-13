import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
  Pressable,
  Animated,
  LayoutAnimation,
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
  const [isFormFilled, setIsFormFilled] = useState(false);

  // Event handlers
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    // Check if all required fields are filled
    if (startDate !== null && endDate !== null) {
      setIsFormFilled(true); // Set isFormFilled to true if all fields are filled
    } else {
      setIsFormFilled(false); // Set isFormFilled to false if any field is empty
    }
  }, [startDate, endDate]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isFormFilled]); // Trigger animation when isFormFilled changes

  function convertToISO(dateObj, timeObj) {
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    const hours = String(timeObj.getUTCHours()).padStart(2, "0");
    const minutes = String(timeObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(timeObj.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

  const onConfirm = () => {
    const startTimeISO = convertToISO(startDate, startTime);
    const endTimeISO = convertToISO(endDate, endTime);
    router.push({
      pathname: "./scheduleSyncFriend",
      params: {
        uid: uid,
        startTime: startTimeISO,
        endTime: endTimeISO,
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

  useEffect(() => {
    if (isAllDay) {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      setStartTime(startOfDay);

      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      setEndTime(endOfDay);
    }
  }, [isAllDay, startDate, endDate]);

  const onPrint = () => {
    console.log("START:" + startTime + "END:" + endTime);
    console.log("StartDate:" + startDate + "EndDate:" + endDate);
    console.log("type of start date:" + convertToISO(startDate, startTime));
    console.log("type of end date:" + convertToISO(endDate, endTime));
  };

  return (
    <View style={styles.background}>
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
      <View style={styles.calendarContainer}>
        <CustomCalendar
          onEndDateChange={handleEndDateChange}
          onStartDateChange={handleStartDateChange}
        />
      </View>

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
      {isFormFilled && (
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
      )}

      {/* Stack Screen */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Invite Friend: <InviteFriend onFriendChange={handleFriendChange} /> */}
    </View>
  );
}

//All day: start end date calendar
//Not All day: start end date from normal picker

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#14072B",
    height: "100%",
    paddingTop: 50,
  },
  container: {
    backgroundColor: "#181D45",
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  pickerContainer: {
    margin: 30,
  },
  picker: {
    margin: 10,
  },
  calendarContainer: {
    flexDirection: "column",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#181D45",
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#dedede",
    borderRadius: 16,
    paddingHorizontal: 10,
    margin: 15,
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
