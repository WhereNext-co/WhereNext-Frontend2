import React, { useEffect, useState, useContext } from "react";
import { Calendar } from "react-native-big-calendar";
import { View, Text } from "react-native";
import Backbutton from "../../components/componentspung/Button/turnbackbutton/Backbutton";
import { router, Stack } from "expo-router";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const MyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const userUID = useContext(AuthContext);

  console.log("Current month:", currentMonth.getMonth());
  addEvent = (data) => {
    let events = eventList;
    data.map((item) => {
      console.log("item:", item.name, item.starttime, item.endtime);

      events.push({
        title: item.name,
        start: new Date(item.starttime),
        end: new Date(item.endtime),
      });
    });
    console.log(eventList);
    setEventList(eventList);
  };
  useEffect(() => {
    axios
      .post("http://where-next.tech/schedules/get-allschedule", {
        useruid: userUID.user.uid,
      })
      .then((response) => {
        console.log("output", response.data);
        if (response.data.scheduleList != null) {
          addEvent(response.data.scheduleList);
        }
        if (response.data.Rendezvous != null) {
          addEvent(response.data.Rendezvous);
        }
        setLoading(true);
      })
      .catch((error) => {
        console.error("There was a problem with your Axios request:", error);
      });
  }, []);
  const handlePress2 = () => {
    router.push("../(app)/profile");
  };
  const handleSwipeEnd = (direction) => {
    const initialDate2 = new Date(direction);
    const initialNextMonth2 = new Date(
      initialDate2.getFullYear(),
      initialDate2.getMonth(),
      1
    );
    setCurrentMonth(new Date(initialNextMonth2));
    console.log("direction:", direction, direction.getMonth());
  };
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          marginTop: 40,
        }}
      >
        <View
          style={{
            flex: 1,
            right: 5,
          }}
        >
          <Backbutton style={{ marginRight: 10 }} onPress={handlePress2} />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </Text>
        </View>
      </View>

      <View style={{ height: "80%" }}>
        {loading && (
          <Calendar
            events={eventList}
            height={300}
            mode="month"
            onSwipeEnd={handleSwipeEnd}
            dayHeaderStyle={{ backgroundColor: "lightgrey" }}
          />
        )}
      </View>
    </View>
  );
};

export default MyCalendar;
