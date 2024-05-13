import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import ScheduleSyncTimeCard from "../../../components/calendar/ScheduleSyncTimeCard";
import { router, useLocalSearchParams, Stack } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

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
        console.log(response.data.nonOverlappingSchedules);
        console.log(startTime, endTime);
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
    /*
      axios
    .post('https://your-api-url.com/endpoint', {
      uid: uid,
      DATE_LIST: selectedTime,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error sending data: ', error);
    });
    */
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
    router.push({
      pathname: "./desired",
      params: {
        uid: uid,
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

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text style={styles.title}>Schedule Sync</Text>
        {timeList ? (
          <View>
            <View style={styles.timeListContainer}>
              <ScrollView>
                {timeList.map((time, index) => (
                  <ScheduleSyncTimeCard
                    key={index}
                    startTime={time[0]}
                    endTime={time[1]}
                    onSelect={handleSelectTime}
                    selectedTime={selectedTime}
                  />
                ))}
              </ScrollView>
            </View>
            <Pressable
              onPress={onConfirm}
              style={styles.sendInvitesButtonContainer}
            >
              <LinearGradient
                colors={["#2acbf9", "#9aeeb0"]}
                style={styles.sendInvitesButton}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.sendInviteButtonText}>Send Invites</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={onEdit} style={styles.chooseButtonContainer}>
              <View style={styles.chooseButton}>
                <Text style={styles.chooseButtonText}>Choose Desired Time</Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text>Uh oh... Seems like there are no matching time</Text>
            <Button title="Choose Desired Time" onPress={onEdit} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 15,
  },
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
    height: "75%",
    backgroundColor: "#14072B",
  },
  sendInvitesButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  sendInvitesButton: {
    width: "90%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  chooseButton: {
    width: "90%",
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#43425e",
    marginTop: 10,
    alignItems: "center",
  },
  chooseButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  chooseButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  sendInviteButtonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
