import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
const FriendRequestCard = ({
  key,
  img,
  name,
  username,
  currentuserUID,
  setRequestsReceived,
  requestsReceived,
}) => {
  const handleAccept = () => {
    axios
      .put("http://where-next.tech/users/friendrequest", {
        uid: currentuserUID,
        friendName: username,
      })
      .then((response) => {
        console.log(response.data);
        setRequestsReceived(
          requestsReceived.filter((user) => user.Sender.Uid !== key)
        );
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const handleDecline = () => {
    axios
      .delete("http://where-next.tech/users/friendrequest/decline", {
        data: { uid: currentuserUID, friendName: username },
      })
      .then((response) => {
        console.log(response.data);
        setRequestsReceived(
          requestsReceived.filter((user) => user.Sender.Uid !== key)
        );
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  return (
    <View style={styles.card}>
      {img ? ( //Checking if the img is available
        <Image
          alt=""
          resizeMode="cover"
          source={{
            uri: `https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F${img.slice(
              81
            )}`,
          }}
          style={styles.cardImg}
        />
      ) : (
        // If the img is not available, display the first letter of the name.
        <View style={[styles.cardImg, styles.cardAvatar]}>
          <Text style={styles.cardAvatarText}>{name[0]}</Text>
        </View>
      )}

      <View /*The part where name is displayed*/ style={styles.cardBody}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text className="text-sm text-slate-700">{`@${username}`}</Text>
      </View>

      <TouchableOpacity onPress={handleAccept}>
        <View style={styles.cardAction}>
          <AntDesign //Pending Receive
            name="check"
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDecline}>
        <View style={styles.cardAction}>
          <AntDesign //Pending Receive
            name="close"
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FriendRequestCard;

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
    borderRadius: 9999,
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
    color: "#000",
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
  },
});
