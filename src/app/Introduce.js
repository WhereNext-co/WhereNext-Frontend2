import { View, Text, TextInput,  StyleSheet,Pressable ,Linking } from "react-native";
import { Link } from "expo-router";
import React  from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

import SlideButton from '../components/componentspung/SlideButton/Button';


export default function Login() {
  const handlePress = () => {
    Linking.openURL('/Phone');
  };  
  
  return(
    <View style={styles.container}>
      <Link href="/Phone">
      <SlideButton label={"Introduce your self "} onPress={handlePress}></SlideButton>
      </Link>
      <Link href="/login">
          <Pressable style={{}} >
          <Text style={{textAlign :"center",
          marginTop:15, 
          textAlignVertical:"center",
          fontSize:15, 
          color:'white'}}>
          Already have an account? login in <Icon name="arrow-right" size={11} color="white" /></Text>
          </Pressable>
      </Link>
    </View>
    ); 
}
const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 
    container: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });