import GoogleMapHomeView from "../../components/home/googleMapHomeView";
import { Redirect, Tabs, Stack } from "expo-router";
import React, { useEffect } from "react";
import globalApi from "../../services/globalApi";
import { View, Button, Text } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default function Tab() {
  useEffect(() => {
    getNearbyPlaces();
  }, []);

  const getNearbyPlaces = async () => {
    const res = await globalApi.nearByPlace();
    console.log("res", res);
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <GoogleMapHomeView />
      </View>
      <Button title="Show panel" onPress={() => this._panel.show()} />
      <SlidingUpPanel ref={(c) => (this._panel = c)}>
        <View style={styles.container}>
          <Text>Here is the content inside panel</Text>
          <Button title="Hide" onPress={() => this._panel.hide()} />
        </View>
      </SlidingUpPanel>
    </View>
  );
}
