import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function GoogleMapHomeView() {
  return (
    <View>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }} git checkout testing
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      ></MapView>
    </View>
  );
}
