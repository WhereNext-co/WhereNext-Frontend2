import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

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

  return (
    <View style={styles.card}>
      {placephotolink ? ( //Checking if the img is available
        <Image
          alt=""
          resizeMode="cover"
          source={{ uri: placephotolink }}
          style={styles.cardImg}
        />
      ) : (
        // If the img is not available, display the first letter of the name.
        <View style={[styles.cardImg, styles.cardAvatar]}>
          <Text style={styles.cardAvatarText}>{placename[0]}</Text>
        </View>
      )}

      <View>
        <Text>{name}</Text>
      </View>

      <View /*The part where name is displayed*/ style={styles.cardBody}>
        <Text style={styles.cardTitle}>{placename}</Text>
        <Text style={styles.cardTitle}>{placelocation}</Text>
        <Text>{members}</Text>
      </View>

      <View>
        <Text>{starttime}</Text>
        <Text>{endtime}</Text>
      </View>

      <View>
        <Text>{members}</Text>
      </View>

      <View style={styles.cardAction}>
        <TouchableOpacity onPress={onAcceptPress}>
          <AntDesign name="check" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeclinePress}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: "#d6d6d6",
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: "flex",
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
    marginRight: "auto",
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  cardAction: {
    paddingRight: 16,
    flexDirection: "row",
  },
});
