import { View, Text,StyleSheet, Platform} from "react-native";
import React,{useState,useEffect}  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams} from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import Birthdate from '../../components/componentspung/Birthdate/Birthdate';

export default function Login() {
  let {name, surname, username, title, mail, birthdate} = useLocalSearchParams();
  const [date, setDate] = useState(birthdate ? new Date(birthdate) : new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios'); // Show picker initially for iOS

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handlePress = () => {
    router.push({
      pathname: '/Userprofile',
      params: {
        title: title,
        name: name,
        surname: surname,
        mail: mail,
        username: username,
        birthdate: date.toISOString()
      }
    });
  };

  const handlePress2 = () => {
    router.push({
      pathname: '/Username',
      params: {
        title: title,
        name: name,
        surname: surname,
        mail: mail,
        username: username,
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
      </View>
      <View style={{ alignItems: 'center' , marginBottom: 20}}>
        <Text style={{textAlign :"center", textAlignVertical:"bottom", fontSize:30, padding:20, color:'white'}}>What is your {'\n'} Birthday?</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
        <Birthdate date={date} onChange={onChange} showPicker={showPicker} />
      </View>
      <Button label={"Next"} onPress={handlePress} style={{}}></Button>
    </View>
  ); 
}
