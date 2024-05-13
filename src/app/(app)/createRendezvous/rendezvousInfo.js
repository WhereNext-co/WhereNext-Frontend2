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
import Location from "../../../../assets/Rendezvous/outline/location.svg";
import Calendar from "../../../../assets/Rendezvous/outline/calendar.svg";
import UserGroup from "../../../../assets/Rendezvous/outline/user-group.svg";
import GroupPhotos from "../../../components/rendezvous/GroupPhotos";

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

  // const uid = "UqqOF7h6pTcLALbpE5hUXs9kq0I3";
  // const startTime = "00:00";
  // const endTime = "23:59";
  // const startDate = "15/5/2024";
  // const endDate = "17/5/2024";
  // const friendUIDs =
  //   "co2pbqcrSjNnUqJWqNSJSgbIK7B3,pkXM6xwBb4RnZt1Qh8qjuuPTHeI3";

  // const duration = 120;
  // const placegoogleplaceid = "ChIJM6caJIaAhYARM_2YtmPwMNI";
  // const placename = "Ross Dress for Less";
  // const rendezvousName = "TT";
  // const placelocation = "799 Market St, San Francisco, CA 94103, USA";
  // const placemaplink = "https://maps.google.com/?cid=15145869857902886195";
  // const placephotolink =
  //   "https://places.googleapis.com/v1/places/ChIJM6caJIaAhYARM_2YtmPwMNI/photos/AUGGfZk6YF16nAGDvqpOzemUMwx_i_JK4H7jS9-C9aYzjVvjxGkg4uo94bAHN5lo3sKtOHgVa63Hz1neS3zgKfOTPoFN6yGNijP_rME47z7sIqY3Rqhq7iwNETbYL1upl5oRseiJ4502K_Q_1LqY4VIRNdQaYJ_IjYJs40Hy/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZsc";

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
    <View style={{ backgroundColor: "#14072b", height: "100%" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View>
        <Image
          source={{ uri: placephotolink }}
          style={{ width: "100%", height: 250 }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.rendezvousNameText}>{rendezvousName}</Text>
          <View style={styles.dotContainer}>
            {[...Array(16)].map((_, index) => (
              <LinearGradient
                key={index}
                colors={["#2acbf9", "#9aeeb0"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.dot}
              />
            ))}
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

              {startDate === endDate ? (
                <Text style={styles.dateText}>{`${startDate} `}</Text>
              ) : (
                <Text style={styles.dateText}>{`${startDate}, `}</Text>
              )}

              {startDate === endDate ? (
                <Text style={styles.timeText}>{`${startTime}`}</Text>
              ) : (
                <Text style={styles.timeText}>{`${startTime} `}</Text>
              )}

              {startDate === endDate ? (
                <Text>-</Text>
              ) : (
                <Text style={styles.dateText}> {`- ${endDate}, `}</Text>
              )}
              <Text style={styles.timeText}>{`${endTime}`}</Text>
            </View>

            <View style={styles.friendListContainer}>
              <View style={styles.friendIconContainer}>
                <UserGroup width={20} height={20} color="#fff" />
                <Text style={styles.friendListText}>
                  {friendUIDs.split(",").length} people
                </Text>
              </View>
              <ScrollView horizontal={true} style={{ paddingLeft: 25 }}>
                {friendUIDs.split(",").map((UID) => (
                  <GroupPhotos uid={UID} />
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.dotContainer}>
            {[...Array(16)].map((_, index) => (
              <LinearGradient
                key={index}
                colors={["#2acbf9", "#9aeeb0"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.dot}
              />
            ))}
          </View>
          <Text style={styles.hostText}>{`by ${userName}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginVertical: 10, width: "100%" },
  content: {
    borderRadius: 20,
    backgroundColor: "#181D45",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  rendezvousNameText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    textAlign: "center",
  },
  placeNameContainer: {
    paddingHorizontal: 28,
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
  friendListText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  friendIconContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  friendListContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  dotContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
  dot: {
    width: 16,
    height: 6,
    borderRadius: 8,
    backgroundColor: "#181D45", // Change the color as needed
    marginHorizontal: 4, // Adjust the spacing between dots
  },
  rendezvousIdText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
