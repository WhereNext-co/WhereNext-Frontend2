import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function rendezvousView() {
  let { name, placename, starttime, endtime, scheduleid, members } =
    useLocalSearchParams();

  return (
    <View style={{ backgroundColor: "white", padding: 22 }}>
      <Text>Rendezvous Name {name}</Text>
      <Text>Location {placename}</Text>
      <Text>Start Time {starttime}</Text>
      <Text>End Time {endtime}</Text>
      <Text>Friends {members}</Text>
      <Text>Schedule ID {scheduleid}</Text>
    </View>
  );
}
