import { View, Text } from "react-native";
import MultipleSectors from "../../components/componentspung/Circle/Circle";
import Button from "../../components/componentspung/Button/Button/Button";
import { useState } from "react";
export default function Tab() {
  const [events, setEvents] = useState([
    "00:00-04:00",
    "06:00-08:00",
    "12:00-18:00",
  ]);
  const handlePress = () => {};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#14072b",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginTop: 50,
          backgroundColor: "black",
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 20,
            padding: 5,
            color: "white",
          }}
        >
          Good ..., ...
        </Text>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 15,
            padding: 10,
            color: "white",
          }}
        >
          Today is ...,.........
        </Text>
      </View>
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 15,
            padding: 20,
            color: "white",
          }}
        >
          You have ... events today
        </Text>
      </View>
      <View style={{ marginBottom: 80 }}>
        <MultipleSectors color="red" timeRanges={events} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#14072b",
          marginBottom: 160,
        }}
      >
        <Button
          label={"Add Schedule"}
          onPress={handlePress}
          style={{ marginRight: 10 }}
        ></Button>
        <Button
          label={"Edit profile"}
          onPress={handlePress}
          style={{ marginHorizontal: 10 }}
        ></Button>
        <Button
          label={"icon"}
          onPress={handlePress}
          style={{ marginLeft: 10 }}
        ></Button>
      </View>
    </View>
  );
}
