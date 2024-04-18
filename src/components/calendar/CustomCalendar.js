import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { useState } from "react";
import { View, Text } from "react-native";
import TimePicker from "./TimePicker";
import CalendarPicker from "react-native-calendar-picker";

export default function CustomCalendar({ markedDates, onDayPress }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        allowBackwardRangeSelect={true}
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        minDate={new Date()}
      />
      {selectedStartDate && (
        <Text>Selected start date: {selectedStartDate.toString()}</Text>
      )}
      {selectedEndDate && (
        <Text>Selected end date: {selectedEndDate.toString()}</Text>
      )}
    </View>
  );
}
