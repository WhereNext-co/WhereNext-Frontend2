import { View, Text, TextInput,  StyleSheet,Pressable ,Linking } from "react-native";
import { Link } from "expo-router";
import React  from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { router,Stack } from "expo-router";

import SlideButton from '../../components/componentspung/Button/SlideButton/Button';


export default function Login() {

  const handlePress = () => {
    router.push('/Name')
  };
  const handlePress2 = () => {
    router.push('/sign-in')
  };
  
  return(
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SlideButton label={"Introduce your self "} onPress={handlePress}></SlideButton>
      
      
        <Pressable style={{}} onPress={handlePress2}>
        <Text style={{textAlign :"center",
        marginTop:15, 
        textAlignVertical:"center",
        fontSize:15, 
        color:'white'}}>
        Already have an account? login in <Icon name="arrow-right" size={11} color="white" /></Text>
        </Pressable>
      
    </View>
    ); 
}
const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 
    container: {
      flex: 1,
      backgroundColor: '#14072b',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });