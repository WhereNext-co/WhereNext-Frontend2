import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ScheduleSyncTimeCard = ({ startTime, endTime, selected, onSelect }) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(timezone);
  const offset = -new Date().getTimezoneOffset() / 60;
  console.log("offset:" + offset);
  const [isSelected, setIsSelected] = useState(false);
  console.log(startTime + 2 * 60 * 60 * 1000);
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

  return (
    <TouchableOpacity onPress={() => onSelect([startTime, endTime])}>
      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <Text>{startDateStr}</Text>
        <Text>{endDateStr}</Text>
        <Text style={styles.cardTitle}>
          {startTimeStr} - {endTimeStr}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleSyncTimeCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    alignItems: "center",
    margin: 8,
  },
  selectedCard: {
    borderColor: "blue", // Change this to your desired color
    borderWidth: 1,
    borderRadius: 12,
  },
  cardBody: {
    marginRight: "auto",
    marginLeft: 12,
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});
