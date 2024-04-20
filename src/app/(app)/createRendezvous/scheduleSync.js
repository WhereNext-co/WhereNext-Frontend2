import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import ScheduleSyncTimeCard from "../../../components/calendar/ScheduleSyncTimeCard";
import { router } from "expo-router";

export default function scheduleSync() {
  const [timeList, setTimeList] = useState([
    {
      startTime: "16:00",
      endTime: "20:00",
    },
    {
      startTime: "16:00",
      endTime: "21:00",
    },
    {
      startTime: "16:00",
      endTime: "21:00",
    },
    {
      startTime: "16:00",
      endTime: "21:00",
    },
  ]);

  const handleSelectTime = () => {
    console.log("Time selected");
  };

  const onConfirm = () => {
    router.replace("./confirmation");
  };

  const onEdit = () => {
    router.replace("./edit");
  };

  return (
    <View style={{ backgroundColor: "white", padding: 22 }}>
      <Text>Schedule Sync</Text>
      <View>
        {timeList !== null ? (
          <>
            {timeList.map((time) => (
              <ScheduleSyncTimeCard
                startTime={time.startTime}
                endTime={time.endTime}
                onPress={handleSelectTime}
              />
            ))}
            <Button title="Send Invites" onPress={onConfirm} />
            <Button title="Choose Desired Time" onPress={onEdit} />
          </>
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
