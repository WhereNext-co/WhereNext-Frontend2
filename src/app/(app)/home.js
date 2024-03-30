import { View, Text } from "react-native";
import GoogleMapHomeView from "../../components/home/googleMapHomeView";
import { Redirect, Tabs, Stack } from "expo-router";

export default function Tab() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <GoogleMapHomeView />
    </View>
  );
}
