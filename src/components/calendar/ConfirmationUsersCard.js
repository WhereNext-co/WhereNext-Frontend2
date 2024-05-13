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

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{name}</Text>
      </View>
    </View>
  );
};

export default ConfirmationUsersCard;

const styles = StyleSheet.create({
  /** Card */
  card: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cardAction: {
    paddingRight: 16,
  },
});
