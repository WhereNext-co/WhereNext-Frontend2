import { View, Text } from "react-native";
import GoogleMapHomeView from "../../components/home/googleMapHomeView";
import { Redirect, Tabs, Stack } from "expo-router";
import { useEffect } from "react";
import globalApi from "../../services/globalApi";

export default function Tab() {
  useEffect(() => {
    getNearbyPlaces();
  }, []);

  const getNearbyPlaces = async () => {
    const res = await globalApi.nearByPlace();
    console.log("res", res);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <GoogleMapHomeView />
    </View>
  );
}
