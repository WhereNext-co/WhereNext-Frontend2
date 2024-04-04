import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React  from "react";
import Backbutton from '../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams} from "expo-router";
import Button from '../components/componentspung/Button/Button/Button';
import Inputtext from '../components/componentspung/InputText/InputText';
import Birthdate from '../components/componentspung/Birthdate/Birthdate';

export default function Login() {
    let {name,surname,username} = useLocalSearchParams();
    const handlePress = () => {
      router.push('/Location')
    };
    const handlePress2 = () => {
      router.push({pathname:'/Username',params:{name:name,surname:surname,username:username}})
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
          color:'white'}}>What is your {'\n'} Birthday?</Text>
     
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
        <Birthdate> </Birthdate>
        
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