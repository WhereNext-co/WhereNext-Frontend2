import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  FlatList,
} from "react-native";
import MultipleSectors from "../../components/componentspung/Circle/Circle";
import Button from "../../components/componentspung/Button/Button/Button";
import { useState, useRef, useEffect, useContext } from "react";
import { router } from "expo-router";
import SlidingUpPanel from "rn-sliding-up-panel";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dropdown from "../../components/componentspung/Dropdown/Dropdown";
import axios from "axios";
import globalApi from "../../services/globalApi";
import { AuthContext } from "../../context/authContext";
import { LinearGradient } from "expo-linear-gradient";
import { set } from "date-fns";
import { is, se } from "date-fns/locale";
export default function Tab() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios"); // Show picker initially for iOS
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [eventnum, setEventnum] = useState(0);
  const [searchResults, setSearchResults] = useState(null); // State to hold the search results
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [searchDetails, setSearchDetails] = useState(null); // State to hold the search details
  const [searching, setSearching] = useState(true);
  const [pic, setPic] = useState(null);
  const [profile, setProfile] = useState(
    "https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af"
  );
  const userUID = useContext(AuthContext);
  console.log("userUID", userUID.user.uid);
  const dateday = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[dateday.getDay()];
  const hour = dateday.getHours();
  const [name, setName] = useState("wait Sec");
  const day = dateday.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[dateday.getMonth()];
  const year = dateday.getFullYear();
  let timeOfDay;
  if (hour >= 5 && hour < 12) {
    timeOfDay = "Morning";
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = "Afternoon";
  } else if (hour >= 18 && hour < 22) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }
  useEffect(() => {
    if (searchDetails != null) {
      if (searchDetails.photos == undefined) {
        setPic(
          "https://firebasestorage.googleapis.com/v0/b/wherenext-24624.appspot.com/o/images%2F732A162A-5181-41A1-BDDC-3FACDBC8C706.png?alt=media&token=baa3a32e-2732-4086-ab60-8e3759ef32af"
        );
      } else {
        setPic(
          `https://places.googleapis.com/v1/${searchDetails.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAFn7D3VcmDtWXNJXoHyz44MVNMEj1sLZs`
        );
      }
    }
  }, [searchDetails]);

  const getSearchPlaces = async (requestData) => {
    if (!requestData.textQuery) {
      setSearchResults([]);
      return;
    }
    try {
      await globalApi.searchPlace(requestData).then((response) => {
        console.log("res", response);
        setSearchResults(response);
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };
  const handlePlaceSelection = (place) => {
    setSearchText(place.displayName.text);
    setSearchDetails(place);
    setSearching(false);
  };
  const onSelectTitle = (item) => {
    setSelectedTitle(item);
  };
  addEvent = (data) => {
    let eventList = events;
    let eventnumb = eventnum;
    data.map((item) => {
      console.log("item:", item.starttime, item.endtime);
      let starthour = new Date(item.starttime).getHours();
      let endhour = new Date(item.endtime).getHours();
      let startmin = new Date(item.starttime).getMinutes();
      let endmin = new Date(item.endtime).getMinutes();
      if (new Date().setHours(23, 59, 59, 599) < new Date(item.endtime)) {
        endhour = 24;
        endmin = 0;
      }
      if (new Date().setHours(0, 0, 0, 0) > new Date(item.starttime)) {
        starthour = 24;
        startmin = 0;
      }
      eventList.push(`${starthour}:${startmin}-${endhour}:${endmin}`);
    });
    console.log("event", eventList);
    setEvents(eventList);
    setEventnum(eventnumb + data.length);
  };

  let type = [
    { id: 1, name: "Work" },
    { id: 2, name: "Life" },
    { id: 3, name: "Quick" },
  ];
  const startdate1 = new Date();
  const enddate1 = new Date();

  startdate1.setHours(0, 0, 0, 0);
  let a = startdate1.toISOString();
  enddate1.setHours(23, 59, 59, 999);
  let b = enddate1.toISOString();
  useEffect(() => {
    axios
      .post("http://where-next.tech/schedules/get-schedulebytime", {
        useruid: userUID.user.uid,
        starttime: a,
        endtime: b,
      })
      .then((response) => {
        setEvents([]);
        setEventnum(0);
        if (response.data.scheduleList != null) {
          addEvent(response.data.scheduleList);
        }
        if (response.data.Rendezvous != null) {
          addEvent(response.data.Rendezvous);
        }
      })
      .catch((error) => {
        console.error("There was a problem with your Axios request:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://where-next.tech/users/get-profile", {
        uid: userUID.user.uid,
      })
      .then((response) => {
        setName(response.data.user.Name);
        setProfile(response.data.user.ProfilePicture);
      })
      .catch((error) => {
        console.error("There was a problem with your Axios request:", error);
      })
      .finally(() => {
        setLoading2(false);
      });
  }, []);
  const setSearchText2 = (text) => {
    setSearchText(text);
    setSearching(true);
  };
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setStartdate(currentDate);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setStartdate(currentDate);
  };
  const onChangeDatee = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setEnddate(currentDate);
  };
  const onChangeTimee = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setEnddate(currentDate);
  };
  const handlePress = () => {
    router.push("../(sign_up)/edit");
  };
  const handlePress2 = () => {
    router.push("../(calendar)/calendar");
  };
  const handlePress4 = () => {
    console.log("startdate1", startdate);
    console.log("enddate1", enddate);
    console.log(isEnabled);
    if (isEnabled) {
      startdate.setHours(0, 0, 0, 0);
      enddate.setHours(23, 59, 59, 999);
    }
    console.log("startdate2", startdate);
    console.log("enddate2", enddate);
    setTitle("");
    setNote("");
    setSearchText("");
    setSelectedTitle(null);
    this._panel.hide();
  };
  const handlePress3 = () => {
    console.log("startdate1", startdate);
    console.log("enddate1", enddate);
    a = startdate.toISOString();
    b = enddate.toISOString();
    if (isEnabled) {
      startdate.setHours(0, 0, 0, 0);
      enddate.setHours(23, 59, 59, 999);
    }
    console.log("startdate2", startdate);
    console.log("enddate2", enddate);
    if (title == "" || selectedTitle == null || searchText == "") {
      alert("Please fill in all fields");
      return;
    }
    axios
      .post("http://where-next.tech/schedules/create-personalschedule", {
        hostuid: userUID.user.uid,
        name: title,
        type: selectedTitle.name,
        starttime: a,
        endtime: b,
        status: "Active",
        placename: searchText,
        placegoogleplaceid: searchDetails.id,
        placelocation: searchDetails.formattedAddress,
        placemaplink: searchDetails.googleMapsUri,
        placephotolink: pic,
      })
      .then((response) => {
        console.log("output", response.data);
      })
      .catch((error) => {
        console.error("There was a problem with your Axios request:", error);
      })
      .finally(() => {
        setLoading(false);
        setTitle("");
        setNote("");
        setSearchText("");
        setSelectedTitle(null);
        this._panel.hide();
      });
  };

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
        style={{ alignItems: "center", backgroundColor: "#14072b", top: 50 }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 20,
            padding: 5,
            color: "white",
          }}
          className="mt-4"
        >
          Good {timeOfDay}, {name}
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
          Today is {dayName}, {day + " " + month + " " + year}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 70,
          backgroundColor: "#4b4b4b",
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 15,
            padding: 16,
            color: "white",
          }}
        >
          You have {eventnum} events today
        </Text>
      </View>
      <View style={{ marginTop: 80 }}>
        {!loading && !loading2 && (
          <MultipleSectors color="red" timeRanges={events} link={profile} />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#14072b",
          marginTop: 100,
        }}
      >
        <Button
          label={"Add Schedule"}
          onPress={() => this._panel.show()}
          style={{ marginRight: 5 }}
        ></Button>
        <Button
          label={"Edit profile"}
          onPress={handlePress}
          style={{ marginHorizontal: 5 }}
        ></Button>
        <TouchableOpacity style={{}} onPress={handlePress2}>
          <LinearGradient
            colors={["#2acbf9", "#9aeeb0"]}
            style={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 20, // Half of the width to make it a circle
              justifyContent: "center",
              alignItems: "center",
            }}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={{ fontSize: 20 }}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <SlidingUpPanel ref={(c) => (this._panel = c)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#171c44",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              height: "auto",
              paddingTop: "40%",
            }}
          >
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "white",
              }}
            >
              <TextInput
                placeholder="Add Title"
                value={title}
                onChangeText={setTitle}
                color={"white"}
                placeholderTextColor={"#B8B8B8"}
                fontSize={30}
                style={{ padding: 10 }}
              />
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "white",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text style={{ color: "white", fontSize: 30 }}>All day</Text>
                {
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      setIsEnabled((previousState) => !previousState)
                    }
                    value={isEnabled}
                  />
                }
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                {showPicker && (
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startdate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                    />
                  </View>
                )}
                {!isEnabled && (
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startdate}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeTime}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                {showPicker && (
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={enddate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDatee}
                    />
                  </View>
                )}
                {!isEnabled && (
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={enddate}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeTimee}
                    />
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "white",
              }}
            >
              <TextInput
                placeholder="Add Location"
                value={searchText}
                onChangeText={(newText) => {
                  setSearchText2(newText);
                  getSearchPlaces({ textQuery: newText });
                }}
                color={"white"}
                placeholderTextColor={"#B8B8B8"}
                fontSize={30}
                style={{ padding: 10 }}
              />
              {searching && (
                <FlatList
                  style={{ paddingTop: 60 }}
                  data={searchResults}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#fff", // white background
                        padding: 10, // padding inside the box
                        // marginVertical: 1, // margin at the top and bottom for each box
                        borderWidth: 1, // border width
                        borderColor: "#ddd", // grey border color
                      }}
                      onPress={() => {
                        handlePlaceSelection(item);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#333",
                        }}
                      >
                        {item.displayName.text}
                      </Text>
                      <Text>{item.formattedAddress}</Text>
                      {item.regularOpeningHours !== undefined &&
                      item.regularOpeningHours.openNow !== undefined ? (
                        <Text
                          style={[
                            {
                              fontSize: 16,
                              color: "#333",
                            },
                            item.regularOpeningHours.openNow
                              ? {
                                  color: "green",
                                }
                              : {
                                  color: "red",
                                },
                          ]}
                        >
                          {item.regularOpeningHours.openNow ? "Open" : "Closed"}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "white",
              }}
            >
              <TextInput
                placeholder="Add note"
                value={note}
                onChangeText={setNote}
                color={"white"}
                placeholderTextColor={"#B8B8B8"}
                fontSize={30}
                style={{ padding: 10 }}
              />
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "white",
              }}
            >
              <View style={{ padding: 10, width: "25%" }}>
                <Dropdown
                  onSelect={onSelectTitle}
                  value={selectedTitle}
                  data={type}
                  label=" Type "
                  style={{ padding: 10 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              justifyContent: "space-between",
              top: 150,
              left: 0,
              right: 0,
            }}
          >
            <TouchableOpacity onPress={handlePress4}>
              <Text style={{ color: "blue", marginLeft: 20 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress3}>
              <Text style={{ color: "blue", marginRight: 20 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SlidingUpPanel>
    </View>
  );
}
