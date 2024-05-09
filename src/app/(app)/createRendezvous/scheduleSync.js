import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import ScheduleSyncTimeCard from "../../../components/calendar/ScheduleSyncTimeCard";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function scheduleSync() {
  let {
    uid,
    startTime,
    endTime,
    friendUIDs,
    duration,
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
    rendezvousName,
    currentUserUID,
  } = useLocalSearchParams();
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    axios
      .post(`http://where-next.tech/schedulesync/get-free-timeslot`, {
        uid: uid,
        startTime: startTime,
        endTime: endTime,
        friendUIDs: friendUIDs.split(","),
        duration: parseInt(duration),
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
    router.push({
      pathname: "./confirmation",
      params: {
        uid: uid,
        startTime: selectedTime[0],
        endTime: selectedTime[1],
        friendUIDs: friendUIDs,
        duration: duration,
        placegoogleplaceid: placegoogleplaceid,
        placename: placename,
        placelocation: placelocation,
        placemaplink: placemaplink,
        placephotolink: placephotolink,
        rendezvousName: rendezvousName,
      },
    });
  };

  const onEdit = () => {
    router.replace("./desired");
  };

  return (
    <View>
      {/* <Text>Schedule Sync</Text>
      <Text>
        {uid} {friendUIDs.split(",")} {startTime} {endTime}
      </Text> */}
      <View>
        {timeList ? (
          <View>
            <View style={styles.timeListContainer}>
              <ScrollView>
                {timeList.map((time) => (
                  <ScheduleSyncTimeCard
                    key={time[0]}
                    startTime={time[0]}
                    endTime={time[1]}
                    selected={selectedTime}
                    onSelect={handleSelectTime}
                  />
                ))}
              </ScrollView>
            </View>

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
  timeListContainer: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    height: 300,
  },
});
