import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import ConfirmationUsersCard from "../../../components/calendar/ConfirmationUsersCard";
import { router } from "expo-router";

export default function confirmation() {
  const [rendezvous, setRendezvous] = useState({
    hostuid: "",
    name: "",
    type: "",
    starttime: "StartDate",
    endtime: "EndDate",
    status: "Draft",
    InvitedUsers: [
      { img: "", name: "Hi" },
      { img: "", name: "Hi" },
    ],
    placename: "",
    placegoogleplaceid: "",
    placelocation: "",
    placemaplink: "",
    placephotolink: "",
  });

  const onConfirm = () => {
    router.replace("./rendezvousInfo");
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
      <Text>Rendezvous Name: {rendezvous.name}</Text>
      <Text>Location: {rendezvous.placename}</Text>
      <Text>Start Time: {rendezvous.starttime}</Text>
      <Text>End Time: {rendezvous.endtime}</Text>
      <Text>Friends:</Text>
      {rendezvous.InvitedUsers.map((member) => (
        <ConfirmationUsersCard img={member.img} name={member.name} />
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
