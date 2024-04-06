import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React  from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { useRouter } from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import OtpInput from '../../components/componentspung/OTP/OTP';


export default function Login() {
    const router=useRouter();
    const handlePress = () => {
      router.push({pathname:"/Name",params:{name:'',surname:''}})
    };
    const handlePress2 = () => {
      router.push('Phone')
    };
    return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: 'black', marginBottom: 20}}>
        <OtpInput></OtpInput>
        </View>
        <Button label={"Send OTP"} onPress={handlePress} style={{}}></Button>
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