import { se } from "date-fns/locale";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";

const ConfirmationUsersCard = ({ uid }) => {
  axios
    .post("http://where-next.tech/users/get-profile", {
      uid: uid,
    })
    .then((response) => {
      console.log(response.data.user);
      setName(response.data.user.Name);
      setImg(response.data.user.ProfilePicture);
    })
    .catch((error) => {
      console.error("Error updating data: ", error);
    });

  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  return (
    <View style={styles.card}>
      <View style={styles.card}>
        {img ? ( //Checking if the img is available
          <Image
            alt=""
            resizeMode="cover"
            source={{ uri: img }}
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
      </View>
    </View>
  );
};

export default ConfirmationUsersCard;

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
  selected: {
    borderColor: "blue",
    borderWidth: 2,
  },
});
