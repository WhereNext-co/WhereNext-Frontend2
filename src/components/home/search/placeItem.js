import { View, Text } from "react-native";
import React from "react";

export default function placeItem({ place }) {
  return (
    <View>
      <Text>{place.displayName.text}</Text>
    </View>
  );
}
