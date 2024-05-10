import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import ConfirmationUsersCard from "../../../components/calendar/ConfirmationUsersCard";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

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

  console.log("-");

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
    router.replace("./");
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
    <View style={{ backgroundColor: "white", padding: 22 }}>
      <Text>Rendezvous Name: {rendezvousName}</Text>
      <Text>Location: {placename}</Text>
      <Text>StartDate: {startDateStr}</Text>
      <Text>EndDate: {endDateStr}</Text>
      <Text>Start Time: {startTimeStr}</Text>
      <Text>End Time: {endTimeStr}</Text>
      <Text>Friends:</Text>
      {friendUIDs.split(",").map((UID) => (
        <ConfirmationUsersCard uid={UID} />
      ))}
      <Button title="Confirm" onPress={onConfirm} />
      <Button title="Edit" onPress={onEdit} />
      <Button title="Draft" onPress={onDraft} />
    </View>
  );
}

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
