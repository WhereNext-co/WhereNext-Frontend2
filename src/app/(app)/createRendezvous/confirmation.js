import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import ConfirmationUsersCard from "../../../components/calendar/ConfirmationUsersCard";
import { router, useLocalSearchParams, Stack } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Location from "../../../../assets/Rendezvous/location.svg";

export default function confirmation() {
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

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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

  const onConfirm = () => {
    console.log(
      uid,
      rendezvousName,
      startTime,
      endTime,
      friendUIDs,
      placename,
      placegoogleplaceid,
      placelocation,
      placemaplink,
      placephotolink
    );
    axios
      .post("http://where-next.tech/rendezvous/create-rendezvous", {
        hostuid: uid,
        name: rendezvousName,
        type: "Work",
        starttime: startTime,
        endtime: endTime,
        status: "Active",
        InvitedUsers: friendUIDs.split(","),
        placename: placename,
        placegoogleplaceid: placegoogleplaceid,
        placelocation: placelocation,
        placemaplink: placemaplink,
        placephotolink: placephotolink,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
    router.push({
      pathname: "./rendezvousInfo",
      params: {
        startTime: startTimeStr,
        endTime: endTimeStr,
        startDate: startDateStr,
        endDate: endDateStr,
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
      pathname: "./",
      params: {
        durationFromConfirm: duration,
        placenameFromConfirm: placename,
        rendezvousNameFromConfirm: rendezvousName,
        placegoogleplaceidFromConfirm: placegoogleplaceid,
        placelocationFromConfirm: placelocation,
        placemaplinkFromConfirm: placemaplink,
        placephotolinkFromConfirm: placephotolink,
      },
    });
  };

  const onDraft = () => {
    axios
      .post("http://where-next.tech/rendezvous/create-rendezvous", {
        hostuid: uid,
        name: rendezvousName,
        type: "Work",
        starttime: startTime,
        endtime: endTime,
        status: "Draft",
        InvitedUsers: friendUIDs.split(","),
        placename: placename,
        placegoogleplaceid: placegoogleplaceid,
        placelocation: placelocation,
        placemaplink: placemaplink,
        placephotolink: placephotolink,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
    router.replace("../diary");
  };

  return (
    <View>
      {/* Stack Screen */}
      <Stack.Screen options={{ headerShown: false }} />

      <View>
        {/* Image */}
        <Image
          source={{ uri: placephotolink }}
          style={{ width: "100%", height: 250 }}
        />
      </View>
      <View>
        <View style={styles.rendezvousNameContainer}>
          <Text style={styles.rendezvousNameText}>{rendezvousName}</Text>
        </View>
        <View style={styles.placeNameContainer}>
          <View style={styles.placeName}>
            <Location width={25} height={25} fill="white" />
            <Text style={styles.placeNameText}>{placename}</Text>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: "#9aeeb0" }} />
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>
              {startDateStr === endDateStr
                ? startDateStr
                : `${startDateStr} to ${endDateStr}`}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.timeText}>{startTimeStr}</Text>
            <Text style={styles.timeText}> - </Text>
            <Text style={styles.timeText}>{endTimeStr}</Text>
          </View>
        </View>
      </View>
      <View style={styles.friendListContainer}>
        <View style={styles.friendListTextContainer}>
          <Text style={styles.friendListText}>
            {friendUIDs.split(",").length} People
          </Text>
        </View>
        <View style={{ borderTopWidth: 1, borderColor: "#9aeeb0" }} />
        <ScrollView style={styles.friendList}>
          {friendUIDs.split(",").map((UID) => (
            <ConfirmationUsersCard uid={UID} />
          ))}
        </ScrollView>
      </View>
      <View>
        <Pressable onPress={onConfirm} style={styles.createButtonContainer}>
          <LinearGradient
            colors={["#2acbf9", "#9aeeb0"]}
            style={styles.createButton}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.createButtonText}>Create Rendezvous</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={onEdit} style={styles.editButtonContainer}>
          <View style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rendezvousNameContainer: {
    height: 50,
    width: "90%",
    paddingLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#181D45",
    margin: 10,
  },
  rendezvousNameText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  placeNameContainer: {
    width: "90%",
    backgroundColor: "#181D45",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  placeName: {
    marginBottom: 10,
  },
  placeNameText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  dateTimeContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  dateText: {
    fontSize: 20,
    color: "white",
  },
  timeText: {
    fontSize: 20,
    color: "white",
  },
  friendListContainer: {
    height: 200,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#181D45",
    margin: 10,
    alignSelf: "center",
  },
  friendListText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  friendListTextContainer: {
    marginBottom: 10,
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  createButtonContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  createButton: {
    width: "90%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  editButton: {
    width: "90%",
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#43425e",
    marginTop: 10,
    alignItems: "center",
  },
  editButtonContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  editButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

/*
        hostuid: "",
        name: rendezvousName,
        type: "",
        starttime: startDate,
        endtime: endDate,
        status: "Active",
        InvitedUsers: ["163", "496"],
        placename: "",
        placegoogleplaceid: "",
        placelocation: "",
        placemaplink: "",
        placephotolink: "",
*/
/* const response = await axios.post(
        'https://your-api-url.com/create',
        rendezvous
      );

      if (response.status !== 200) {
        throw new Error('HTTP error ' + response.status);
      } */

// <View style={{ backgroundColor: "white", padding: 22 }}>
//   <Text>Rendezvous Name: {rendezvousName}</Text>
//   <Text>Location: {placename}</Text>
//   <Text>StartDate: {startDateStr}</Text>
//   <Text>EndDate: {endDateStr}</Text>
//   <Text>Start Time: {startTimeStr}</Text>
//   <Text>End Time: {endTimeStr}</Text>
//   <Text>Friends:</Text>
//   {friendUIDs.split(",").map((UID) => (
//     <ConfirmationUsersCard uid={UID} />
//   ))}
//   <Button title="Confirm" onPress={onConfirm} />
//   <Button title="Edit" onPress={onEdit} />
//   <Button title="Draft" onPress={onDraft} />
// </View>
