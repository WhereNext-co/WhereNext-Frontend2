import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const onRendezvousPressHandler = () => {
    if (status === "Draft") {
      router.push("./createRendezvous/edit");
      return;
    } else {
      router.push("./createRendezvous/rendezvousInfo");
    }
  };

  return (
    <View style={styles.card}>
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

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text>{placename}</Text>
        <Text>{placelocation}</Text>
        <Text>{members}</Text>
        <Text>Start Time: {formatTime(starttime)}</Text>
        <Text>End Time: {formatTime(endtime)}</Text>
      </View>

      <View style={styles.cardAction}>
        <TouchableOpacity onPress={onRendezvousPressHandler}>
          {status === "Draft" ? (
            <Feather name="edit" size={24} color="black" />
          ) : (
            <Feather name="chevron-right" size={22} color="#9ca3af" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#C8C8C8",
    borderRadius: 24,
    marginVertical: 8,
  },
  cardImg: {
    width: 42,
    height: 42,
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
  cardBody: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  cardAction: {
    paddingRight: 16,
  },
});
