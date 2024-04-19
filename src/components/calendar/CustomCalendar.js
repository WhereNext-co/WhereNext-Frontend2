import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { useState } from "react";
import { View, Text } from "react-native";
import TimePicker from "./TimePicker";
import CalendarPicker from "react-native-calendar-picker";

export default function CustomCalendar({ onStartDateChange, onEndDateChange }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
      onEndDateChange(date);
    } else {
      setSelectedStartDate(date);
      onStartDateChange(date);
      setSelectedEndDate(null);
      onEndDateChange(null);
    }
  };

  return (
    <View>
      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        allowBackwardRangeSelect={true}
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        minDate={new Date()}
      />
    </View>
  );
}
