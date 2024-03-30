import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import { Link } from "expo-router";
import React  from "react";
import CountryCodePicker from '../components/componentspung/Countrycodepicker/Countrycodepicker';
export default function Login() {
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    return(
    <View style={styles.container}>
        <Text style={{textAlign :"center",
          textAlignVertical:"center",
          fontSize:30, 
          color:'white'}}>We want to make sure {'\n'} you're unique</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CountryCodePicker />
        </View>
        
    
        


    </View>
    ); 
}
const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },container: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });