import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Pin from "../../../assets/home/placeDetail/outline/pin";
import Members from "../../../assets/tabs/outline/friends";
import Clock from "../../../assets/home/placeDetail/outline/clock";
import { router } from "expo-router";
import { AuthContext } from "../../context/authContext";

const LocationCard = ({
  name,
  placename,
  starttime,
  endtime,
  members,
  placephotolink,
  placelocation,
  status,
  scheduleid,
}) => {
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
  const currentUserUID = useContext(AuthContext).user.uid;
  const userUids = members.map((member) => member.Useruid).join(",");

  const onRendezvousPressHandler = () => {
    console.log("UID: " + currentUserUID);
    if (status === "Draft") {
      router.push({
        pathname: "./createRendezvous/confirmation",
        params: {
          uid: currentUserUID,
          scheduleid: scheduleid,
          rendezvousName: name,
          placename: placename,
          startTime: starttime,
          endTime: endtime,
          friendUIDs: userUids,
          placephotolink: placephotolink,
          placelocation: placelocation,
        },
      });
      return;
    } else {
      console.log("member", members);
      router.push({
        pathname: "./createRendezvous/rendezvousInfo",
        params: {
          uid: currentUserUID,
          scheduleid: scheduleid,
          rendezvousName: name,
          placename: placename,
          startTime: starttime,
          endTime: endtime,
          friendUIDs: userUids,
          placephotolink: placephotolink,
          placelocation: placelocation,
          status: status,
        },
      });
    }
  };
  //"./createRendezvous/rendezvousInfo"
  // router.push({
  //   pathname: "/Username",
  //   params: {
  //     title: selectedTitle.name,
  //     name: nameInputValue,
  //     surname: surnameInputValue,
  //     mail: "",
  //   },
  // });

  return (
    <TouchableOpacity onPress={onRendezvousPressHandler} style={styles.card}>
      <View>
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
              <Text style={styles.cardAvatarText}>{name[0]}</Text>
            </View>
          )}

          <View className="flex flex-col ml-3">
            <Text className="font-bold text-xl text-[#a0de32]">{name}</Text>

            <View className="flex flex-row items-center my-1">
              <Pin width={25} height={25} className="mr-2" />
              <View>
                <Text className="text-white">{placename}</Text>
                <Text className="text-white">{placelocation}</Text>
              </View>
            </View>

            <View className="flex flex-row items-center my-1">
              <Members width={25} height={25} className="mr-2" />
              <Text className="text-white">{`${members.length} members`}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Clock width={25} height={25} className="mr-2" />
          <View>
            <Text className="text-white">Start: {formatTime(starttime)}</Text>
            <Text className="text-white">End: {formatTime(endtime)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
