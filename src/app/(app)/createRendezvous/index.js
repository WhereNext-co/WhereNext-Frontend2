import React, { useState, useContext, useEffect } from "react";
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
import { Stack, router, useLocalSearchParams } from "expo-router";
import { set } from "date-fns";
import { fr, se } from "date-fns/locale";
import { UserLocationContext } from "../../../context/userLocationContext";
import { AuthContext } from "../../../context/authContext";

export default function CreateMeeting() {
  //const currentUserUID = useContext(AuthContext).user.uid;
  const currentUserUID = "pkXM6xwBb4RnZt1Qh8qjuuPTHeI3";
  let {
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
  } = useLocalSearchParams();
  // State variables
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rendezvousName, setRendezvousName] = useState("");
  const [duration, setDuration] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
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
    rendezvousName: "",
  });

  const goSchedule = () => {
    router.push("./createRendezvous/scheduleSync");
  };
  const goConfirmation = () => {
    router.push("./createRendezvous/confirmation");
  };
  const goInfo = () => {
    router.push("./createRendezvous/rendezvousInfo");
  };
  const goDesired = () => {
    router.push("./createRendezvous/desired");
  };
  const goFriend = () => {
    router.push("./createRendezvous/scheduleSyncFriend");
  };
  // Schedule sync handler
  const handleScheduleSync = () => {
    if (rendezvousName === "") {
      alert("Rendezvous Name cannot be empty");
      return;
    } else if (friendUIDs.length === 0) {
      alert("Invite Someone!");
      return;
    } else if (startDate === null || endDate === null) {
      alert("Select at least a date!");
      return;
    } else if (duration === 0) {
      alert("Duration can't be empty!");
      return;
    } else if (placename === undefined) {
      alert("Choose a place first!");
      return;
    } else {
      const startDateObj = new Date(startDate.setHours(0, 0, 0, 0));
      const endDateObj = new Date(endDate.setHours(23, 59, 59, 999));

      const startDateISO = `${startDateObj.getUTCFullYear()}-${String(
        startDateObj.getUTCMonth() + 1
      ).padStart(2, "0")}-${String(startDateObj.getUTCDate()).padStart(
        2,
        "0"
      )}T${String(startDateObj.getUTCHours()).padStart(2, "0")}:${String(
        startDateObj.getUTCMinutes()
      ).padStart(2, "0")}:${String(startDateObj.getUTCSeconds()).padStart(
        2,
        "0"
      )}Z`;

      const endDateISO = `${endDateObj.getUTCFullYear()}-${String(
        endDateObj.getUTCMonth() + 1
      ).padStart(2, "0")}-${String(endDateObj.getUTCDate()).padStart(
        2,
        "0"
      )}T${String(endDateObj.getUTCHours()).padStart(2, "0")}:${String(
        endDateObj.getUTCMinutes()
      ).padStart(2, "0")}:${String(endDateObj.getUTCSeconds()).padStart(
        2,
        "0"
      )}Z`;
      setRendezvous({
        uid: currentUserUID,
        startTime: startDateISO,
        endTime: endDateISO,
        friendUIDs: friendUIDs,
        duration: duration,
        rendezvousName: rendezvousName,
      });
      console.log("startD", startDateISO, "endD", endDateISO);
      console.log("a", rendezvous);
      console.log("b", friendUIDs);
      console.log("Rendezvous created:", rendezvous);
      router.push({
        pathname: "./createRendezvous/scheduleSync",
        params: {
          uid: currentUserUID,
          startTime: startDateISO,
          endTime: endDateISO,
          friendUIDs: friendUIDs,
          rendezvousName: rendezvousName,
          duration: duration,
          placegoogleplaceid: placegoogleplaceid,
          placename: placename,
          placelocation: placelocation,
          placemaplink: placemaplink,
          placephotolink: placephotolink,
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Stack Screen */}
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Rendezvous</Text>
          <Button title="Go schedule" onPress={goSchedule} />
          <Button title="Go confirmation" onPress={goConfirmation} />
          <Button title="Go Info" onPress={goInfo} />
          <Button title="Go Desired" onPress={goDesired} />
          <Button title="Go Friend" onPress={goFriend} />
        </View>
        <View style={styles.textInput}>
          {/* Rendezvous Name Input */}
          <TextInput
            value={rendezvousName}
            onChangeText={handleRendezvousName}
            placeholder="Rendezvous Name"
          />
        </View>

        <View>
          {console.log(
            placegoogleplaceid,
            placelocation,
            placemaplink,
            placephotolink
          )}
          <Text style={styles.searchDetails}>
            {placename ? placename : "No search details"}
          </Text>
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

        <View style={styles.inviteFriend}>
          {/* Invite Friend */}
          <InviteFriend
            onFriendChange={handleFriendChange}
            currentUserUID={currentUserUID}
          />
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
    flexDirection: "column",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
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
  searchDetails: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  titleContainer: {
    margin: 15,
  },
});
