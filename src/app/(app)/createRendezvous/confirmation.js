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
import Location from "../../../../assets/Rendezvous/outline/location.svg";
import Calendar from "../../../../assets/Rendezvous/outline/calendar.svg";
import UserGroup from "../../../../assets/Rendezvous/outline/user-group.svg";

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
    console.log();
    router.push({
      pathname: "./rendezvousInfo",
      params: {
        uid: uid,
        startTime: startTime,
        endTime: endTime,
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
    <View style={{ backgroundColor: "#14072b", height: "100%" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Image
          source={{ uri: placephotolink }}
          style={{ width: "100%", height: 250 }}
        />
      </View>
      <View style={styles.content}>
        <View style={{ flex: 1, gap: 10 }}>
          <View style={styles.rendezvousNameContainer}>
            <Text style={styles.rendezvousNameText}>{rendezvousName}</Text>
          </View>
          <View style={styles.placeNameContainer}>
            <View style={styles.placeName}>
              <Location width={20} height={20} color="#fff" />
              <Text style={styles.placeNameText}>{placename}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <Calendar
                width={20}
                height={20}
                color="#fff"
                style={{ marginRight: 10 }}
              />

              {startDateStr === endDateStr ? (
                <Text style={styles.dateText}>{`${startDateStr} `}</Text>
              ) : (
                <Text style={styles.dateText}>{`${startDateStr}, `}</Text>
              )}

              {startDateStr === endDateStr ? (
                <Text style={styles.timeText}>{`${startTimeStr}`}</Text>
              ) : (
                <Text style={styles.timeText}>{`${startTimeStr} `}</Text>
              )}

              {startDateStr === endDateStr ? (
                <Text>-</Text>
              ) : (
                <Text style={styles.dateText}> {`- ${endDateStr}, `}</Text>
              )}
              <Text style={styles.timeText}>{`${endTimeStr}`}</Text>
            </View>
          </View>
          <View style={styles.friendListContainer}>
            <View style={styles.friendListTextContainer}>
              <UserGroup width={20} height={20} color="#fff" />
              <Text style={styles.friendListText}>
                {friendUIDs.split(",").length} People
              </Text>
            </View>
            <LinearGradient
              colors={["#2acbf9", "#9aeeb0"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.divider}
            />
            <ScrollView style={styles.friendList}>
              {friendUIDs.split(",").map((UID) => (
                <ConfirmationUsersCard uid={UID} />
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.groupButtonContainer}>
          <Pressable onPress={onEdit}>
            <View style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </View>
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <Pressable onPress={onDraft}>
              <LinearGradient
                colors={["#2acbf9", "#9aeeb0"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.draftButtonOutline}
              >
                <View style={styles.draftButton}>
                  <Text style={styles.draftButtonText}>Draft</Text>
                </View>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={onConfirm}>
              <LinearGradient
                colors={["#2acbf9", "#9aeeb0"]}
                style={styles.createButton}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 10,
    gap: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  groupButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {},
  rendezvousNameContainer: {
    borderRadius: 10,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#181D45",
    marginTop: 10,
  },
  rendezvousNameText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  placeNameContainer: {
    width: "100%",
    backgroundColor: "#181D45",
    padding: 16,
    borderRadius: 10,
    alignSelf: "center",
  },
  placeName: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  placeNameText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 16,
    color: "#5fede4",
    fontWeight: "bold",
  },
  friendListContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#181D45",
    alignSelf: "center",
  },
  friendListText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  friendListTextContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  createButtonText: {
    fontSize: 14,
    color: "#181D45",
  },
  createButton: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  draftButtonOutline: {
    borderRadius: 100,
    border: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  draftButton: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#14072b",
  },
  draftButtonText: {
    fontSize: 14,
    color: "#5fede4",
  },
  editButton: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#43425e",
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  divider: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  friendList: {
    flexGrow: 1,
  },
});
