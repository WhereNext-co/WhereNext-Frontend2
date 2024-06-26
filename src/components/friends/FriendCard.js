import { ro } from "date-fns/locale";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
const FriendCard = ({ img, name, id, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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

        <View style={styles.cardAction}>
          <FeatherIcon // Right arrow icon displayed at the end of the card.
            color="#9ca3af"
            name="chevron-right"
            size={22}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FriendCard;

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
