import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";

const GroupPhotos = ({ uid }) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  // Fetch user profile data when component mounts
  useEffect(() => {
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
  }, [uid]); // Fetch data when uid changes

  return (
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
          style={[styles.cardImg, styles.overlap]} // Add overlap style
        />
      ) : (
        <View style={[styles.cardImg, styles.cardAvatar]}>
          <Text style={styles.cardAvatarText}>{name[0]}</Text>
        </View>
      )}
    </View>
  );
};

export default GroupPhotos;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImg: {
    width: 36,
    height: 36,
    borderRadius: 9999,
  },
  overlap: {
    marginLeft: -16, // Adjust the negative margin to change the overlap distance
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
});
