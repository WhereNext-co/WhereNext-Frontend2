import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomCalendar from "../../components/calendar/CustomCalendar";
import TimePicker from "../../components/calendar/TimePicker";

export default function CreateMeeting() {
  const [markedDates, setMarkedDates] = useState({
    "2024-04-02": { selected: true, marked: true, selectedColor: "blue" },
  });

  const onDayPress = (day) => {
    setMarkedDates({
      ...markedDates,
      [day.dateString]: { selected: true, marked: true, selectedColor: "blue" },
    });
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

  return (
    <View>
      <CustomCalendar markedDates={markedDates} onDayPress={onDayPress} />
      <TimePicker time={startTime} setTime={setStartTime} title={startTime} />
      <TimePicker time={endTime} setTime={setEndTime} title={endTime} />
      <Text>Start Time: {startTime}</Text>
      <Text>End Time: {endTime}</Text>
    </View>
  );
}
