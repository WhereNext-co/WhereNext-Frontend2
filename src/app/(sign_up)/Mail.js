//เผื่อไว้
import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React,{useState}  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams} from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import Inputtext from '../../components/componentspung/InputText/InputText';
import Dropdown from "../../components/componentspung/Dropdown/Dropdown"


export default function Login({}) {
  const {title,name, surname,mail} =useLocalSearchParams(); 
  const handlePress = () => {
      router.push({pathname:'/Username',params:{title:title,name:name,surname:surname,mail:mailInputValue}})
    };
    const handlePress2 = () => {
      router.push({pathname:'/Name',params:{title:title,name:name,surname:surname}})
    };
    console.log(title)
    const [mailInputValue, setMailInputValue] = useState(mail);
    const mailInputChange = (text) => {
        setMailInputValue(text);
    };
 
   
 
    return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{ alignItems: 'center',marginBottom: 20 }}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:20, 
          color:'white'}}>Please tell us {'\n'} your mail.</Text>
     
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: 'black',marginBottom: 20}}>
        <Inputtext placeholder='Mail' value={mailInputValue} onPress={mailInputChange}/>
        
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