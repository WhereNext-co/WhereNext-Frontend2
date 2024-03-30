import { View, Text } from "react-native";
import GoogleMapHomeView from "../../components/home/googleMapHomeView";

export default function Tab() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <GoogleMapHomeView />
    </View>
  );
}
