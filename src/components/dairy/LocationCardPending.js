import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import Pin from "../../../assets/home/placeDetail/pin";
import Members from "../../../assets/tabs/friends";
import Clock from "../../../assets/home/placeDetail/clock";

const LocationCard = ({
  name,
  placename,
  starttime,
  endtime,
  members,
  placephotolink,
  placelocation,
  status,
  currentuseruid,
  pendingRendezvous,
  setPendingRendezvous,
  scheduleid,
}) => {
  const onAcceptPress = () => {
    axios
      .patch("http://where-next.tech/rendezvous/accept-invitation", {
        scheduleid: scheduleid,
        receiveruid: currentuseruid,
      })
      .then((response) => {
        console.log(response.data);
        setPendingRendezvous(
          pendingRendezvous.filter(
            (rendezvous) => rendezvous.scheduleid !== scheduleid
          )
        );
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const onDeclinePress = () => {
    axios
      .patch("http://where-next.tech/rendezvous/reject-invitation", {
        scheduleid: scheduleid,
        receiveruid: currentuseruid,
      })
      .then((response) => {
        console.log(response.data);
        setPendingRendezvous(
          pendingRendezvous.filter(
            (rendezvous) => rendezvous.scheduleid !== scheduleid
          )
        );
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const formattedStartTime = new Date(starttime).toLocaleString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const formattedEndTime = new Date(endtime).toLocaleString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View className="flex flex-column">
          <View className="flex flex-row">
            {placephotolink ? (
              <Image
                alt=""
                resizeMode="cover"
                source={{ uri: placephotolink }}
                style={styles.cardImg}
              />
            ) : (
              <View style={[styles.cardImg, styles.cardAvatar]}>
                <Text style={styles.cardAvatarText}>{placename[0]}</Text>
              </View>
            )}

            <View className="flex flex-col ml-3">
              <Text className="font-bold text-xl text-[#a0de32]">{name}</Text>

              <View className="flex flex-row items-center my-1">
                <Pin width={25} height={25} className="mr-2" />
                <View width={"60%"}>
                  <Text className="text-white">{placename}</Text>
                  <Text className="text-white">{placelocation}</Text>
                </View>
              </View>

              <View className="flex flex-row items-center my-1">
                <Members width={25} height={25} className="mr-2" />
                <Text className="text-white">{`${members} members`}</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center mt-2">
            <Clock width={25} height={25} className="mr-2" />
            <View>
              <Text className="text-white">Start: {formattedStartTime}</Text>
              <Text className="text-white">End: {formattedEndTime}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            right: "30%",
            top: "10%",
          }}
        >
          <TouchableOpacity onPress={onAcceptPress} style={styles.actionButton}>
            <AntDesign name="check" size={50} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDeclinePress}
            style={styles.actionButton}
          >
            <AntDesign name="close" size={50} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationCard;
const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-start",
    backgroundColor: "#14072b",
    borderRadius: 24,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9ca1ac",
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
  },
  cardAction: {
    paddingRight: 16,
  },
});
