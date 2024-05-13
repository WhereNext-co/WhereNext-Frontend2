import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function rendezvousView() {
  let { name, placename, starttime, endtime, scheduleid, members } =
    useLocalSearchParams();

  const formatTime = (timeString) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = -new Date().getTimezoneOffset() / 60;
    const time = new Date(
      new Date(timeString).getTime() + offset * 60 * 60 * 1000
    );
    return time.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };
  return (
    <View style={{ backgroundColor: "white", padding: 22 }}>
      <Text>Rendezvous Name {name}</Text>
      <Text>Location {placename}</Text>
      <Text>Start Time {formatTime(starttime)}</Text>
      <Text>End Time {formatTime(endtime)}</Text>
      <Text>Friends {members}</Text>
      <Text>Schedule ID {scheduleid}</Text>
    </View>
  );
}
