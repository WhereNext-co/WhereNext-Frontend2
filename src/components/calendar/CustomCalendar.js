import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { useState } from "react";
import { View, Text } from "react-native";
import TimePicker from "./TimePicker";
import CalendarPicker from "react-native-calendar-picker";
import { AntDesign } from "@expo/vector-icons";

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
        previousComponent={<AntDesign name="left" size={24} color="black" />}
        nextComponent={<AntDesign name="right" size={24} color="black" />}
        dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        todayBackgroundColor="#2ACBF9" // Change this to the color you want
        todayTextStyle={{ color: "#FFFFFF" }} // Change this to the color you want
      />
    </View>
  );
}
