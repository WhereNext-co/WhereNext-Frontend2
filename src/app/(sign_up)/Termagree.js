import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams,Stack} from "expo-router";

import Button from '../../components/componentspung/Button/Button/LongButton';
import ScrollDownComponent from "../../components/componentspung/scrolldown/scrolldown";

export default function Login() {
  let {name,surname,username,title,mail,birthdate,profile} = useLocalSearchParams();
    
  const handlePress = () => {
      router.push({
        pathname: '/Phone',
        params: {
          title: title,
          name: name,
          surname: surname,
          mail: mail,
          username: username,
          birthdate:birthdate,
          profile:profile
        }
      });
    };
    const handlePress2 = () => {
      router.push({
        pathname: '/Location',
        params: {
          title: title,
          name: name,
          surname: surname,
          mail: mail,
          username: username,
          birthdate:birthdate,
          profile:profile
        }
      });
    };
    return(
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#14072b' ,paddingVertical:50,padding:10}}>
      <Stack.Screen options={{ headerShown: false }} />
        
        <View style={{ position: 'absolute', top: 60, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{ alignItems: 'center' , marginBottom: 20, marginTop: 30}}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:30, 
          color:'white'}}>Terms and conditions {'\n'} Privacy Conditions</Text>
     
        </View>
        <View style ={{flex:0.7}}>
        <ScrollDownComponent />

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