import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { useState } from "react";
import { View } from "react-native";
import TimePicker from "./TimePicker";

export default function CustomCalendar({ markedDates, onDayPress }) {
  return (
    <View style={{ width: "100%" }}>
      <Calendar markedDates={markedDates} onDayPress={onDayPress} />
    </View>
  );
}
