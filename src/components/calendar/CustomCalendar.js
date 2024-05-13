import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { useState } from "react";
import { View, Text } from "react-native";
import TimePicker from "./TimePicker";
import CalendarPicker from "react-native-calendar-picker";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomCalendar({ onStartDateChange, onEndDateChange }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  function interpolateColor(color1Hex, color2Hex, factor) {
    // Function to convert a hexadecimal color string to an array of RGB values
    function hexToRgb(hex) {
      return [
        parseInt(hex.slice(1, 3), 16), // Red value
        parseInt(hex.slice(3, 5), 16), // Green value
        parseInt(hex.slice(5, 7), 16), // Blue value
      ];
    }

    // Convert hexadecimal colors to RGB arrays
    const color1 = hexToRgb(color1Hex);
    const color2 = hexToRgb(color2Hex);

    // Interpolate between the RGB values
    const result = color1.map((channel, i) => {
      return Math.round(channel + factor * (color2[i] - channel));
    });

    console.log(
      `#${result
        .map((channel) => {
          const hex = channel.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")}`
    );

    // Convert interpolated RGB values back to hexadecimal color string
    return `#${result
      .map((channel) => {
        const hex = channel.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;
  }

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

  // const CustomSelectedDayCell = ({ date }) => (
  //   <LinearGradient
  //     colors={["#2acbf9", "#9aeeb0"]}
  //     start={{ x: 0, y: 0.5 }}
  //     end={{ x: 1, y: 0.5 }}
  //     style={styles.selectedDayCell}
  //   >
  //     <Text style={styles.selectedDayText}>{date.getDate()}</Text>
  //   </LinearGradient>
  // );

  return (
    <View>
      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        allowBackwardRangeSelect={true}
        selectedDayColor="#5fede4"
        selectedDayTextColor="#FFFFFF"
        minDate={new Date()}
        previousComponent={<AntDesign name="left" size={24} color="white" />}
        nextComponent={<AntDesign name="right" size={24} color="white" />}
        dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        todayBackgroundColor="#fff" // Change this to the color you want
        todayTextStyle={{ color: "#000" }} // Change this to the color you want
        textStyle={{ color: "#FFFFFF" }} // Change this to the color you want
      />
    </View>
  );
}
