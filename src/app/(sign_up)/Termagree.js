import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams} from "expo-router";

import Button from '../../components/componentspung/Button/Button/Button';
import ScrollDownComponent from "../../components/componentspung/scrolldown/scrolldown";

export default function Login() {
    const handlePress = () => {
      router.push('/Start')
    };
    const handlePress2 = () => {
      router.push('/Userprofile')
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
          color:'white'}}>Terms and conditions {'\n'} Privacy Conditions</Text>
     
        </View>
        
        <ScrollDownComponent />
        
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