import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import CustomCalendar from "../../../components/calendar/CustomCalendar";
import TimePicker from "../../../components/calendar/TimePicker";
import InviteFriend from "../../../components/calendar/InviteFriend";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { set } from "date-fns";
import { fr } from "date-fns/locale";
import { UserLocationContext } from "../../../context/userLocationContext";

export default function CreateMeeting() {
  // State variables
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rendezvousName, setRendezvousName] = useState("");
  const [duration, setDuration] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [friendUIDs, setFriendUIDs] = useState([]);
  const { searchDetails } = useContext(UserLocationContext);

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

  const handleDayChange = (day) => {
    setDay(day);
  };

  const handleHourChange = (hour) => {
    setHour(hour);
  };

  const handleMinuteChange = (minute) => {
    setMinute(minute);
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
      <ScrollView>
        {/* Stack Screen */}
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <Text>Edit Rendezvous</Text>
        </View>
        <View style={styles.textInput}>
          {/* Rendezvous Name Input */}
          <TextInput
            value={rendezvousName}
            onChangeText={handleRendezvousName}
            placeholder="Rendezvous Name"
          />
          <Text>{searchDetails.displayName.text}</Text>
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
          <TimePicker
            onDurationChange={handleDurationChange}
            onDayChange={handleDayChange}
            onHourChange={handleHourChange}
            onMinuteChange={handleMinuteChange}
          />
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
      </ScrollView>
      {/* Schedule Sync Button */}
      <View style={styles.floatingButton}>
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
    padding: 20,
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
  floatingButton: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 10,
    backgroundColor: "blue", // Change this color to match your design
  },
});
