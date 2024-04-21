import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ScheduleSyncTimeCard from "../../../components/calendar/ScheduleSyncTimeCard";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function scheduleSync() {
  let { uid, startTime, endTime, friendUIDs, duration } =
    useLocalSearchParams();
  useLocalSearchParams();
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    axios
      .post(`http://where-next.tech/schedulesync/get-free-timeslot`, {
        uid: "aaa",
        startTime: "2024-12-01T00:00:00Z",
        endTime: "2024-12-15T00:00:00Z",
        friendUIDs: ["bbb", "ccc"],
        duration: 172800,
      })
      .then((response) => {
        setTimeList(response.data.nonOverlappingSchedules);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
      <Text>
        {uid} {friendUIDs} {startTime} {endTime}
      </Text>
      <View>
        {timeList.length !== 0 ? (
          <View>
            {timeList.map((time) => (
              <ScheduleSyncTimeCard
                key={time[0]}
                startTime={time[0]}
                endTime={time[1]}
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
