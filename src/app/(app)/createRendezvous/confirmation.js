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
  const onConfirm = () => {
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
    router.replace("./edit");
  };

  const onDraft = () => {
    setRendezvous((prevState) => ({
      ...prevState,
      status: "Draft",
    }));
  };

  return (
    <View style={{ backgroundColor: "white", padding: 22 }}>
      <Text>Rendezvous Name: {rendezvousName}</Text>
      <Text>Location: {placename}</Text>
      <Text>Start Time: {startTime}</Text>
      <Text>End Time: {endTime}</Text>
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
