import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ScheduleSyncTimeCard = ({ startTime, endTime, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View /*The part where name is displayed*/ style={styles.cardBody}>
        <Text style={styles.cardTitle}>
          {startTime} - {endTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleSyncTimeCard;

const styles = StyleSheet.create({
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
