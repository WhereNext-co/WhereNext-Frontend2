import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const AddFriendCard = ({
  img,
  name,
  onAddPress,
  onPendingPress,
  onRemovePress,
  onAcceptPress,
  status,
}) => {
  const icon_size = 31;
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
      </View>
      {status === "not friends" ? (
        <TouchableOpacity onPress={onAddPress}>
          <View style={styles.cardAction}>
            <FontAwesome6 //Add
              name="add"
              size={icon_size}
              color="black"
            />
          </View>
        </TouchableOpacity>
      ) : status === "friend request already sent" ? (
        <TouchableOpacity onPress={onPendingPress}>
          <View style={styles.cardAction}>
            <MaterialIcons //Pending Invite
              name="pending"
              size={icon_size}
              color="black"
            />
          </View>
        </TouchableOpacity>
      ) : status === "already friends" ? (
        <TouchableOpacity onPress={onRemovePress}>
          <View style={styles.cardAction}>
            <MaterialIcons //Remove
              name="person-remove"
              size={icon_size}
              color="black"
            />
          </View>
        </TouchableOpacity>
      ) : status === "friend request received" ? (
        <TouchableOpacity onPress={onAcceptPress}>
          <View style={styles.cardAction}>
            <AntDesign //Pending Receive
              name="checkcircleo"
              size={icon_size}
              color="black"
            />
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AddFriendCard;

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
  },
});
