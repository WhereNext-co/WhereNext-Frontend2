import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import ConfirmationUsersCard from "../../../components/calendar/ConfirmationUsersCard";

export default function confirmation() {
  const [rendezvous, setRendezvous] = useState({
    hostuid: "",
    name: "",
    type: "",
    starttime: startDate,
    endtime: endDate,
    status: "Draft",
    InvitedUsers: [
      { img: "", name: "" },
      { img: "", name: "" },
    ],
    placename: "",
    placegoogleplaceid: "",
    placelocation: "",
    placemaplink: "",
    placephotolink: "",
  });

  const onConfirm = () => {
    console.log("Confirming");
  };

  const onEdit = () => {
    router.replace("./createRendezvous/edit");
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
    </View>
  );
}
