import { View, Text, TouchableOpacity,TextInput,Switch,Platform } from "react-native";
import MultipleSectors from "../../components/componentspung/Circle/Circle";
import Button from '../../components/componentspung/Button/Button/Button';
import { useState, useRef, useEffect} from "react";
import { router } from "expo-router";
import SlidingUpPanel from 'rn-sliding-up-panel';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { format } from 'date-fns';   
import Dropdown from "../../components/componentspung/Dropdown/Dropdown"
export default function Tab() {
  const [events, setEvents] = useState(['07:00-18:00']);
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
  const onSelectTitle =(item)=>{
    setSelectedTitle(item)
}
  let type=[{id:1,name:"Work"},{id:2,name:"Life"},{id:3,name:"Quick"}]
  
  useEffect(() => {
    // axios.get('http://where-next.tech/schedules/get-schedulebytime', {
    //     userName: usernameInputValue,
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     usernameValidChange(response.data.exists)
    //     showErrorChange(response.data.exists)
    //     console.log(usernameValid);
        
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with your Axios request:', error);
    //   });
    let newDate = new Date();
    let regionCode = '+66'; // Thailand
    let timeZone = Intl.DateTimeFormat(undefined, {timeZone: 'UTC'}).resolvedOptions().timeZone;
    let offset = new Date().toLocaleString('en', {timeZone, hour12: false, timeZoneName: 'short'}).split(' ')[2];
    console.log(offset);
    
let newDateWithOffset = new Date(newDate.getTime() + offset * 60 * 60 * 1000);
console.log(newDateWithOffset);
    
  },[])
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



  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#14072b' }}>
      <View style={{ alignItems: 'center', backgroundColor: 'black', top: 50 }}>
        <Text style={{ textAlign: "center", textAlignVertical: "bottom", fontSize: 20, padding: 5, color: 'white' }}>Good ..., ...</Text>
        <Text style={{ textAlign: "center", textAlignVertical: "bottom", fontSize: 15, padding: 10, color: 'white' }}>Today is ...,.........</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 70 }}>
        <Text style={{ textAlign: "center", textAlignVertical: "bottom", fontSize: 15, padding: 20, color: 'white' }}>You have ... events today</Text>
      </View>
      <View style={{ marginTop: 80 }}>
        <MultipleSectors color="red" timeRanges={events} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b', marginTop: 100 }}>
        <Button label={"Add Schedule"} onPress={() => this._panel.show()} style={{ marginRight: 10 }}></Button>
        <Button label={"Edit profile"} onPress={handlePress} style={{ marginHorizontal: 10 }}></Button>
        <Button label={"icon"} onPress={handlePress2} style={{ marginLeft: 10 }}></Button>
        
      </View>
    

    
    <SlidingUpPanel ref={c => this._panel = c}>
    <View style={{
  flex: 1,
  backgroundColor: '#171c44',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  <View style={{ flexDirection: 'row', position: 'absolute', justifyContent:'space-between', top: 150, left: 0, right: 0 }}>
    <TouchableOpacity onPress={() => this._panel.hide()}><Text style={{ color: 'blue', marginLeft: 20 }}>Cancel</Text></TouchableOpacity>
    <TouchableOpacity onPress={() => this._panel.hide()}><Text style={{ color: 'blue', marginRight: 20}}>Save</Text></TouchableOpacity>
  </View>
  <View style ={{marginBottom:300,width:'100%'}}>
  <View style={{width:'100%',marginTop:90,borderBottomWidth:1,borderColor:'white'}}>
    <TextInput placeholder='Add Title' value={title} onChangeText={setTitle} color={'white'} placeholderTextColor={'#B8B8B8'} fontSize={30} style={{padding:10}}/>
  </View>
  <View style={{width:'100%',borderBottomWidth:1,borderColor:'white',justifyContent:'space-between'}}>
    <View style={{ flexDirection: 'row', justifyContent:'space-between',padding:10 }}><Text style={{color:'white', fontSize:30}}>All day</Text>
    {<Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>setIsEnabled(previousState => !previousState)}
        value={isEnabled}
      />} 
      </View>
    <View style={{ flexDirection: 'row', justifyContent:'space-between',padding:10}}>
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
   <View style={{ flexDirection: 'row', justifyContent:'space-between',padding:10}}>
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
      )}</View>
  </View>
  <View style={{width:'100%',borderBottomWidth:1,borderColor:'white'}}>
    <TextInput placeholder='Add Location' value={location} onChangeText={setLocation} color={'white'} placeholderTextColor={'#B8B8B8'} fontSize={30} style={{padding:10}}/>
  </View>
  <View style={{width:'100%',borderBottomWidth:1,borderColor:'white'}}>
    <TextInput placeholder='Add note' value={note} onChangeText={setNote} color={'white'} placeholderTextColor={'#B8B8B8'} fontSize={30} style={{padding:10}}/>
  </View>
  <View style={{width:'100%',borderBottomWidth:1,borderColor:'white'}}>
    <Dropdown onSelect={onSelectTitle} value={selectedTitle} data={type} label= " Type " />
  </View>
  </View>
</View>
        </SlidingUpPanel>
    </View>
  );
}
