import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { RadioButton } from "react-native-paper";
const DesiredFriendCard = ({ img, name, id, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        {img ? (
          <Image
            alt=""
            resizeMode="cover"
            source={{ uri: img }}
            style={styles.cardImg}
          />
        ) : (
          <View style={[styles.cardImg, styles.cardAvatar]}>
            <Text style={styles.cardAvatarText}>{name[0]}</Text>
          </View>
        )}

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{name}</Text>
        </View>

        <View style={styles.cardAction}>
          <RadioButton value={id} status={selected ? "checked" : "unchecked"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DesiredFriendCard;

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
  },
});
