import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Pin from "../../../assets/home/placeDetail/pin";
import Members from "../../../assets/tabs/friends";
import Clock from "../../../assets/home/placeDetail/clock";
import { router } from "expo-router";

const LocationCard = ({
  name,
  placename,
  starttime,
  endtime,
  members,
  placephotolink,
  placelocation,
  status,
}) => {
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const onRendezvousPressHandler = () => {
    if (status === "Draft") {
      router.push({
        pathname: "./createRendezvous/edit",
        params: {
          scheduleid: scheduleid,
          name: name,
          placename: placename,
          starttime: starttime,
          endtime: endtime,
          members: members,
          placephotolink: placephotolink,
          placelocation: placelocation,
          status: status,
        },
      });
      return;
    } else {
      router.push({
        pathname: "./createRendezvous/rendezvousView",
        params: {
          scheduleid: scheduleid,
          name: name,
          placename: placename,
          starttime: starttime,
          endtime: endtime,
          members: members,
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
              <Text className="text-white">{`${members} members`}</Text>
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
