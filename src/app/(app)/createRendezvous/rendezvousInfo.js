import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

function Card(Name, ProfilePicture) {
  return (
    <View style={styles.card}>
      <Image style={styles.profilePicture} source={{ uri: ProfilePicture }} />
      <Text style={styles.text}>{Name}</Text>
    </View>
  );
}

export default function rendezvousInfo() {
  let {
    uid,
    startTime,
    endTime,
    friendUIDs,
    duration,
    placegoogleplaceid,
    placename,
    placelocation,
    placemaplink,
    placephotolink,
    rendezvousName,
  } = useLocalSearchParams();
  const [profiles, setProfiles] = useState([{}]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilePromises = friendUIDs.map((uid) =>
        axios.post("http://where-next.tech/users/get-profile", { uid })
      );

      try {
        const profileResponses = await Promise.all(profilePromises);
        const profileData = profileResponses.map((response) => ({
          Name: response.data.user.Name,
          ProfilePicture: response.data.user.ProfilePicture,
        }));
        setProfiles(profileData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {/*Image*/}
        <Image style={styles.image} source={{ uri: placephotolink }} />
      </View>
      <View>
        {/*Rendezvous Title*/}
        <Text style={styles.title}>{rendezvousName}</Text>
      </View>
      <View>{/*Rendezvous Info (startTime endTime placeLocation)*/}</View>
      <View>
        {/*Member List*/}
        <ScrollView>
          {profiles.map((profile) => (
            <Card Name={profile.Name} ProfilePicture={profile.ProfilePicture} />
          ))}
        </ScrollView>
      </View>
      <View>{/*Button*/}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
