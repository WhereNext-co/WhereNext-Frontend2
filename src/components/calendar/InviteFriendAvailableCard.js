import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const FriendCard = ({ img, name, id, onPress, isSelected, available }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
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
        <Text style={styles.cardTitle}>{name}</Text>
        {available === "busy" && (
          <View style={styles.busyBox}>
            <Text style={styles.busyText}>Busy</Text>
          </View>
        )}
      </View>
      {/* Circle checkbox */}
      <FeatherIcon
        name={isSelected ? "check-circle" : "circle"}
        size={24}
        color={isSelected ? "#2A9D8F" : "#A9A9A9"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardAvatar: {
    backgroundColor: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
  },
  cardAvatarText: {
    color: "#fff",
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  busyBox: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  busyText: {
    color: "white",
  },
});

export default FriendCard;
