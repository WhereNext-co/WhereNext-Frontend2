import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import ConfirmationUsersCard from "../../../components/calendar/ConfirmationUsersCard";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function rendezvousInfo() {
  let {
    uid,
    startTime,
    endTime,
    startDate,
    endDate,
    friendUIDs,
    duration,
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
    rendezvousName,
  } = useLocalSearchParams();

  axios
    .post("http://where-next.tech/users/get-profile", {
      uid: "pkXM6xwBb4RnZt1Qh8qjuuPTHeI3",
    })
    .then((response) => {
      console.log(response.data.user);
      setUserName(response.data.user.UserName);
      setImg(response.data.user.ProfilePicture);
    })
    .catch((error) => {
      console.error("Error updating data: ", error);
    });

  const [userName, setUserName] = useState("");
  const [img, setImg] = useState("");

  const dummyPhotoLink = "https://via.placeholder.com/150";

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

      <LinearGradient
        colors={["#2acbf9", "#9aeeb0"]}
        style={styles.rendezvousNameContainer}
      >
        <Text style={styles.rendezvousNameText}>{rendezvousName}</Text>
      </LinearGradient>
      <View style={styles.placeNameContainer}>
        <View style={styles.placeName}>
          <Text style={styles.placeNameText}>{placename}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>
            {startDate === endDate ? startDate : `${startDate} to ${endDate}`}
          </Text>
          <Text style={styles.timeText}>{startTime}</Text>
          <Text style={styles.timeText}> - </Text>
          <Text style={styles.timeText}>{endTime}</Text>
        </View>
        <View style={styles.friendListContainer}>
          <Text style={styles.friendListText}>
            {friendUIDs.split(",").length} People
          </Text>
        </View>
        <ScrollView style={styles.friendList}>
          {friendUIDs.split(",").map((UID) => (
            <ConfirmationUsersCard uid={UID} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.hostContainer}>
        <Image
          alt=""
          resizeMode="cover"
          source={{
            uri: `https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F${img.slice(
              81
            )}`,
          }}
          style={styles.displayImg}
        />
        <Text style={styles.hostText}>{userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rendezvousNameContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
  },
  rendezvousNameText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  placeNameContainer: {
    width: "90%",
    height: 300,
    backgroundColor: "#181D45",
    padding: 10,
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeName: {
    flexDirection: "row",
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
    marginBottom: 10,
  },
  friendListText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  friendListTextContainer: {
    marginBottom: 10,
  },
  hostContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "#181D45",
  },
  hostText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  displayImg: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginHorizontal: 10,
  },
});
