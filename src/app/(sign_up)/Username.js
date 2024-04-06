import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React,{useState}   from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import Button from '../../components/componentspung/Button/Button/Button';
import Inputtext from '../../components/componentspung/InputText/InputText';
import { router, useLocalSearchParams} from "expo-router";

export default function Login() {
    let {name,surname,username} = useLocalSearchParams();
    const handlePress = () => {
      router.push({pathname:'/UsernameBD',params:{name:name,surname:surname,username:usernameInputValue}})
    };
    const handlePress2 = () => {
      router.push({pathname:'/Name',params:{name:name,surname:surname}})
    };
    const [usernameInputValue, setUsernameInputValue] = useState(username);

    const usernameInputChange = (text) => {
      setUsernameInputValue(text);
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