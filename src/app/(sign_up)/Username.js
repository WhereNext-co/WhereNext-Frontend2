import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React,{useState,useEffect}   from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import Button from '../../components/componentspung/Button/Button/Button';
import Inputtext from '../../components/componentspung/InputText/InputText';
import { router, useLocalSearchParams} from "expo-router";
import axios from 'axios';

export default function Login() {
    let {name,surname,username} = useLocalSearchParams();
    const handlePress = () => {
      axios.post('http://192.168.1.100:5000/users/check-username', {
        userName: usernameInputValue,
      })
      .then(response => {
        console.log(response.data);
        usernameValidChange(response.data.exists)
        showErrorChange(response.data.exists)
        console.log(usernameValid);
        
      })
      .catch(error => {
        console.error('There was a problem with your Axios request:', error);
      });
          
        
      //
    };
    const handlePress2 = () => {
      router.push({pathname:'/Name',params:{name:name,surname:surname}})
    };
    const [usernameInputValue, setUsernameInputValue] = useState(username);
    const [usernameValid, setUsernameValid] = useState(true);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
      if (!usernameValid) {
        // Check if OTP length is 6
        router.replace({pathname:'/UsernameBD',params:{name:name,surname:surname,username:usernameInputValue}});
      }
    }, [usernameValid]);
    const usernameInputChange = (text) => {
      setUsernameInputValue(text);
    };
    const usernameValidChange = (text) => {
      setUsernameValid(text);
    };
    const showErrorChange = (text) => {
      setShowError(text);
    };
    return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{ alignItems: 'center' , marginBottom: 20}}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:20, 
          color:'white'}}>Pick a Username that {'\n'} represents you.</Text>
     
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: 'black', marginBottom: 20}}>
        <Inputtext placeholder='Username' value={usernameInputValue} onPress={usernameInputChange}/>
        
        </View>
        
        <Button label={"Next"} onPress={handlePress} style={{}}></Button>
        {showError && (<Text style={{color:'white'}}>Username already used</Text>)}
        

    </View>
    
    ); 
}
const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 

    container: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
    },
    
    container2: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#fff',

      }
  });