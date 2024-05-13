import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ScheduleSyncTimeCard = ({
  startTime,
  endTime,
  onSelect,
  selectedTime,
}) => {
  const offset = -new Date().getTimezoneOffset() / 60;

  const startDate = new Date(
    new Date(startTime).getTime() + offset * 60 * 60 * 1000
  );
  const endDate = new Date(
    new Date(endTime).getTime() + offset * 60 * 60 * 1000
  );

  const startDay = String(startDate.getUTCDate()).padStart(2, "0");
  const startHours = String(startDate.getUTCHours()).padStart(2, "0");
  const startMinutes = String(startDate.getUTCMinutes()).padStart(2, "0");

  const endDay = String(endDate.getUTCDate()).padStart(2, "0");
  const endHours = String(endDate.getUTCHours()).padStart(2, "0");
  const endMinutes = String(endDate.getUTCMinutes()).padStart(2, "0");

  const startTimeStr = `${startHours}:${startMinutes}`;
  const endTimeStr = `${endHours}:${endMinutes}`;
  const startDateStr = `${startDay}/${
    startDate.getUTCMonth() + 1
  }/${startDate.getUTCFullYear()}`;
  const endDateStr = `${endDay}/${
    endDate.getUTCMonth() + 1
  }/${endDate.getUTCFullYear()}`;

  // console.log("-------------");
  // console.log(startTimeStr, endTimeStr, startDateStr, endDateStr);
  // console.log("Selected Time: " + selectedTime);
  // console.log("-------------");

  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const startTimeDate = new Date(startTime);
    const selectedTimeDate =
      selectedTime && selectedTime[0] ? new Date(selectedTime[0]) : null;

    if (
      selectedTimeDate &&
      startTimeDate.getTime() === selectedTimeDate.getTime()
    ) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedTime, startTime]);

  return (
    <TouchableOpacity onPress={() => onSelect([startTime, endTime])}>
      <View style={[styles.card, selected ? styles.selectedCard : null]}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{startDateStr}</Text>
          <Text style={styles.date}>{endDateStr}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{startTimeStr}</Text>
          <Text style={styles.time}>-</Text>
          <Text style={styles.time}>{endTimeStr}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleSyncTimeCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    margin: 8,
    backgroundColor: "#171C44",
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  date: {
    fontSize: 14,
    color: "white",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 45,
    marginBottom: 8,
  },
  time: {
    fontSize: 30,
    color: "white",
    fontWeight: "700",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 45,
  },
});

styles.selectedCard = {
  ...styles.card,
  borderColor: "white",
  borderWidth: 2,
};
