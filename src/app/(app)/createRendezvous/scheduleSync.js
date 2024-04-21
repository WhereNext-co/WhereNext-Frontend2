import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ScheduleSyncTimeCard from "../../../components/calendar/ScheduleSyncTimeCard";
import { router, useLocalSearchParams } from "expo-router";

export default function scheduleSync() {
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const currentUserUID = "aaa";

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    console.log(time);
  };

  const onConfirm = () => {
    router.replace("./confirmation");
  };

  const onEdit = () => {
    router.replace("./desired");
  };

  return (
    <View>
      <Text>Schedule Sync</Text>
      <View>
        {timeList !== null ? (
          <View>
            {timeList.map((time) => (
              <ScheduleSyncTimeCard
                key={time.startTime}
                startTime={time.startTime}
                endTime={time.endTime}
                selected={selectedTime}
                onSelect={handleSelectTime}
              />
            ))}
            <Button title="Send Invites" onPress={onConfirm} />
            <Button title="Choose Desired Time" onPress={onEdit} />
          </View>
        ) : (
          <View>
            <Text>Uh oh... Seems like there are no matching time</Text>
            <Button title="Choose Desired Time" onPress={onEdit} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
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
});
