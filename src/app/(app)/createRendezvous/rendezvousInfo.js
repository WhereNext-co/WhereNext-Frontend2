import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function rendezvousView() {
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
    router.push("../home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rendezvous Name: {rendezvousName}</Text>
      <Text style={styles.text}>Location: {placename}</Text>
      <Text style={styles.text}>Start Time: {startTime}</Text>
      <Text style={styles.text}>End Time: {endTime}</Text>
      <Text style={styles.text}>Friends:</Text>
      <Button title="Back To Home" onPress={onConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
