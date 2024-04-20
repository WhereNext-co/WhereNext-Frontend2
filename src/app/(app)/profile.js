import { View, Text, TouchableOpacity,TextInput,Switch,Platform ,FlatList,} from "react-native";
import MultipleSectors from "../../components/componentspung/Circle/Circle";
import Button from '../../components/componentspung/Button/Button/Button';
import { useState, useRef, useEffect} from "react";
import { router } from "expo-router";
import SlidingUpPanel from 'rn-sliding-up-panel';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { add, format } from 'date-fns';   
import Dropdown from "../../components/componentspung/Dropdown/Dropdown"
import { getCalendars } from "expo-localization";
import axios from 'axios';
import globalApi from "../../services/globalApi";

export default function Tab() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [starttime, setStarttime] = useState(new Date());
  const [endtime, setEndtime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios'); // Show picker initially for iOS
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [loading, setLoading] = useState(true);
  const [eventnum, setEventnum] = useState(0);
  const [searchResults, setSearchResults] = useState(null); // State to hold the search results
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [searchDetails, setSearchDetails] = useState(null); // State to hold the search details
  const [searching, setSearching] = useState(true);
 

  const dateday = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dateday.getDay()];
  const hour = dateday.getHours();
  const name = 'John Doe';
  const day = dateday.getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[dateday.getMonth()];
  const year = dateday.getFullYear();
let timeOfDay;
if (hour >= 5 && hour < 12) {
    timeOfDay = 'Morning';
} else if (hour >= 12 && hour < 18) {
    timeOfDay = 'Afternoon';
} else if (hour >= 18 && hour < 22) {
    timeOfDay = 'Evening';
} else {
    timeOfDay = 'Night';
}
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
  const onSelectTitle =(item)=>{
    setSelectedTitle(item)
}
  addEvent = (data) => {
    let eventList = events;
    data.map((item) => {
    console.log("item:",item.starttime,item.endtime)
      let starthour = new Date(item.starttime).getHours();
      let endhour = new Date(item.endtime).getHours();
      let startmin = new Date(item.starttime).getMinutes();
      let endmin = new Date(item.endtime).getMinutes();

      eventList.push(`${starthour}:${startmin}-${endhour}:${endmin}`);
    });
    console.log(eventList)
    setEvents(eventList);
  }

  let type=[{id:1,name:"Work"},{id:2,name:"Life"},{id:3,name:"Quick"}]
  const startdate1 = new Date();
  const enddate1 = new Date();

  startdate1.setHours(0, 0, 0, 0);
  let a = startdate1.toISOString();
  enddate1.setHours(23, 59, 59, 999);
  let b = enddate1.toISOString();
  console.log("a,b",a, b);
  console.log(typeof (a));
  useEffect(() => {
    axios.post('http://where-next.tech/schedules/get-schedulebytime', {
        useruid:"bbb",
        starttime: a,
        endtime: b
      })
      .then(response => {
        console.log("output",response.data);
        addEvent(response.data.scheduleList)
        setEventnum(response.data.scheduleList.length)
      })
      .catch(error => {
        console.error('There was a problem with your Axios request:', error);
      }).finally(() => {
        setLoading(false);
      });
}, [])
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setStartdate(currentDate);
  }; 
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setStarttime(currentDate);
  };const onChangeDatee = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setEnddate(currentDate);
  };const onChangeTimee = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setEndtime(currentDate);
  };
  const handlePress = () => {
    router.push("../(sign_up)/edit");
  }
  const handlePress2 = () => {
    router.push("../(calendar)/calendar");
  }
  const handlePress3 = () => {
    console.log(startdate,enddate,starttime,endtime)
    a=startdate.toISOString()
    b=enddate.toISOString()
    c=starttime.toISOString()
    d=endtime.toISOString()
    console.log("starttime",a.slice(0,11)+c.slice(11))
    console.log("endtime",b.slice(0,11)+d.slice(11))
    console.log("placename",searchText)
    console.log("placegoogleplaceid",searchDetails)
    console.log("placelocation",searchDetails)
    console.log("placemaplink",searchDetails)
    console.log("placephotolink",searchDetails)

    axios.post('http://where-next.tech/schedules/create-personalschedule', {
      useruid:"bbb",
      name:title,
      type:selectedTitle[name],
      starttime: a.slice(0,11)+c.slice(11),
      endtime: b.slice(0,11)+d.slice(11),
      status:'Active',
      placename:searchText,
      placegoogleplaceid:searchDetails,
      placelocation:searchDetails,
      placemaplink:searchDetails,
      placephotolink:searchDetails
    })
    .then(response => {
      console.log("output",response.data);
    })
    .catch(error => {
      console.error('There was a problem with your Axios request:', error);
    }).finally(() => {
      setLoading(false);
      this._panel.hide()

    });
  }


  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#14072b' }}>
      <View style={{ alignItems: 'center', backgroundColor: 'black', top: 50 }}>
        <Text style={{ textAlign: "center", textAlignVertical: "bottom", fontSize: 20, padding: 5, color: 'white' }}>Good {timeOfDay}, {name}</Text>
        <Text style={{ textAlign: "center", textAlignVertical: "bottom", fontSize: 15, padding: 10, color: 'white' }}>Today is {dayName},{day+month+year}</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 70 }}>
        <Text style={{ textAlign: "center", textAlignVertical: "bottom", fontSize: 15, padding: 20, color: 'white' }}>You have {eventnum} events today</Text>
      </View>
      <View style={{ marginTop: 80 }}>
        {!loading && (<MultipleSectors color="red" timeRanges={events} />)}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b', marginTop: 100 }}>
        <Button label={"Add Schedule"} onPress={() => this._panel.show()} style={{ marginRight: 10 }}></Button>
        <Button label={"Edit profile"} onPress={handlePress} style={{ marginHorizontal: 10 }}></Button>
        <Button label={"icon"} onPress={handlePress2} style={{ marginLeft: 10 }}></Button>
        
      </View>
    

    
      <SlidingUpPanel ref={c => this._panel = c}>
  <View style={{ flex: 1, backgroundColor: '#171c44', alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '100%', height: 'auto' ,paddingBottom:100}}>
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'white',}}>
        <TextInput placeholder='Add Title' value={title} onChangeText={setTitle} color={'white'} placeholderTextColor={'#B8B8B8'} fontSize={30} style={{ padding: 10 }} />
      </View>
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'white', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}><Text style={{ color: 'white', fontSize: 30 }}>All day</Text>
          {<Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled(previousState => !previousState)}
            value={isEnabled}
          />}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
          {showPicker && (
            <View><DateTimePicker
              testID="dateTimePicker"
              value={startdate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}

            /></View>
          )}{!isEnabled && (
            <View><DateTimePicker
              testID="dateTimePicker"
              value={starttime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            /></View>
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
          {showPicker && (
            <View><DateTimePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDatee}
            /></View>
          )}{!isEnabled && (
            <View><DateTimePicker
              testID="dateTimePicker"
              value={endtime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTimee}
            /></View>
          )}
        </View>
      </View>
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'white' }}>
        <TextInput placeholder='Add Location' value={searchText} onChangeText={(newText) => {
              setSearchText(newText);
              getSearchPlaces({ textQuery: newText });
            }} color={'white'} placeholderTextColor={'#B8B8B8'} fontSize={30} style={{ padding: 10 }} />
            {searching&&(<FlatList
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
                <Text style={{
    fontSize: 16,
    color: "#333",
  }}>
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
                        ?  {
                          color: "green",
                        }
                        :  {
                          color: "red",
                        },
                    ]}
                  >
                    {item.regularOpeningHours.openNow ? "Open" : "Closed"}
                  </Text>
                ) : null}
              </TouchableOpacity>
            )}
          />)}
      </View>
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'white' }}>
        <TextInput placeholder='Add note' value={note} onChangeText={setNote} color={'white'} placeholderTextColor={'#B8B8B8'} fontSize={30} style={{ padding: 10 }} />
      </View>
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'white' }}>
        <View style={{padding:10,width:'25%'}}>
        <Dropdown onSelect={onSelectTitle} value={selectedTitle} data={type} label=" Type " style={{padding:10}}/>
        </View>
      </View>
    </View>
    <View style={{ flexDirection: 'row', position: 'absolute', justifyContent: 'space-between', top: 150, left: 0, right: 0 }}>
      <TouchableOpacity onPress={() => this._panel.hide()}><Text style={{ color: 'blue', marginLeft: 20 }}>Cancel</Text></TouchableOpacity>
      <TouchableOpacity onPress={handlePress3}><Text style={{ color: 'blue', marginRight: 20 }}>Save</Text></TouchableOpacity>
    </View>
  </View>
</SlidingUpPanel>

    </View>
  );
}
