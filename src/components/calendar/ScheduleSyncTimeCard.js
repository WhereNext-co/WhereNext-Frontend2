import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ScheduleSyncTimeCard = ({ startTime, endTime, selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <TouchableOpacity onPress={() => onSelect({ startTime, endTime })}>
      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <Text style={styles.cardTitle}>
          {startTime} - {endTime}
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
