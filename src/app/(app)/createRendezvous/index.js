import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
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
import { LinearGradient } from "expo-linear-gradient";
import Pin from "../../../../assets/home/placeDetail/pin";

export default function CreateMeeting() {
  // const currentUserUID = useContext(AuthContext).user.uid;
  const currentUserUID = "UqqOF7h6pTcLALbpE5hUXs9kq0I3";
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
  // Inside your CreateMeeting component
  const [isFormFilled, setIsFormFilled] = useState(false); // State to track if all fields are filled

  // useEffect hook to check if all fields are filled whenever there's a change
  useEffect(() => {
    // Check if all required fields are filled
    if (
      rendezvousName !== "" &&
      friendUIDs.length > 0 &&
      startDate !== null &&
      endDate !== null &&
      duration !== 0 &&
      placename !== undefined
    ) {
      setIsFormFilled(true); // Set isFormFilled to true if all fields are filled
    } else {
      setIsFormFilled(false); // Set isFormFilled to false if any field is empty
    }
  }, [rendezvousName, friendUIDs, startDate, endDate, duration, placename]);

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity of 0

  // Inside your CreateMeeting component, after defining state variables
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isFormFilled]); // Trigger animation when isFormFilled changes

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
    } else if (duration === 0 || duration === NaN) {
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
    <View
      style={{ backgroundColor: "#14072b" }}
      className={`px-4 pt-20 ${isFormFilled && "pb-2"} h-full w-full`}
    >
      <ScrollView style={{ backgroundColor: "#14072b" }}>
        {/* Stack Screen */}
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Rendezvous</Text>
          {/* <Button title="Go schedule" onPress={goSchedule} /> */}
          {/* <Button title="Go confirmation" onPress={goConfirmation} />
          <Button title="Go Info" onPress={goInfo} />
          <Button title="Go Desired" onPress={goDesired} />
          <Button title="Go Friend" onPress={goFriend} /> */}
        </View>
        <View style={styles.headerContainer}>
          <TextInput
            value={rendezvousName}
            onChangeText={handleRendezvousName}
            placeholder="Please enter a rendezvous name"
            placeholderTextColor="rgba(255, 255, 255, 0.6)" // Setting opacity to 60%
            style={styles.textInput} // Full opacity for entered text
          />
          <LinearGradient
            colors={["#2acbf9", "#9aeeb0"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.divider}
          />
          <View className="flex flex-row items-center mb-1">
            <Pin width={20} height={20} color="#fff" />
            <Text style={styles.searchDetails}>
              {placename ? placename : "No search details"}
            </Text>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <CustomCalendar
            onEndDateChange={handleEndDateChange}
            onStartDateChange={handleStartDateChange}
          />
        </View>

        <View style={styles.durationContainer}>
          {/* Time Picker */}
          <TimePicker
            onDurationChange={handleDurationChange}
            onDayChange={handleDayChange}
            onHourChange={handleHourChange}
            onMinuteChange={handleMinuteChange}
            day={day}
            hour={hour}
            minute={minute}
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
      {isFormFilled && (
        <LinearGradient
          colors={["#2acbf9", "#9aeeb0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.floatingButton}
        >
          <TouchableOpacity onPress={handleScheduleSync}>
            <Text
              style={{ color: "#181D45", fontWeight: "bold", fontSize: 18 }}
            >
              Schedule Sync
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarContainer: {
    flexDirection: "column",
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#181D45",
    justifyContent: "center",
    alignItems: "center",
  },
  durationContainer: {
    flexDirection: "column",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#181D45",
  },
  headerContainer: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#181D45",
  },
  textInput: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,

    color: "#fff",
  },
  inviteFriend: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#181D45",
  },
  floatingButton: {
    borderRadius: 30, // Add border radius for rounded corners
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  searchDetails: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // Add marginBottom for spacing
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 10, // Adjust this value as needed for spacing
  },
});
