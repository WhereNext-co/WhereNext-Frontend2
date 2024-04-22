import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ScheduleSyncTimeCard = ({ startTime, endTime, selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const startHours = String(startDate.getUTCHours()).padStart(2, "0");
  const startMinutes = String(startDate.getUTCMinutes()).padStart(2, "0");

  const endHours = String(endDate.getUTCHours()).padStart(2, "0");
  const endMinutes = String(endDate.getUTCMinutes()).padStart(2, "0");

  const startTimeStr = `${startHours}:${startMinutes}`;
  const endTimeStr = `${endHours}:${endMinutes}`;

  return (
    <TouchableOpacity onPress={() => onSelect({ startTime, endTime })}>
      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <Text style={styles.cardTitle}>
          {startTimeStr} - {endTimeStr}
        </Text>
      </View>
      {selected && console.log(selected.startTime === startTime)}
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
