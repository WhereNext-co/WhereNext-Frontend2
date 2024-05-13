import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const FriendCard = ({ img, name, id, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        {img ? (
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
          <View style={[styles.cardImg, styles.cardAvatar]}>
            <Text style={styles.cardAvatarText}>{name[0]}</Text>
          </View>
        )}
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{name}</Text>
        </View>
        {/* Circle checkbox */}
        <FeatherIcon
          name={isSelected ? "check-circle" : "circle"}
          size={24}
          color={isSelected ? "#5fede4" : "#CCCCCC"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "bold",
    color: "#fff",
  },
  cardAction: {
    paddingRight: 16,
  },
});
