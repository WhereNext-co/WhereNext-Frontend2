import { View, Text, TextInput,  StyleSheet, ActivityIndicator,} from "react-native";
import React,{ useState, useEffect } from "react";
import CountryCodePicker from '../../components/componentspung/Countrycodepicker/Countrycodepicker';
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import Button from '../../components/componentspung/Button/Button/Button';
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+66"); // Default country code is +66 (Thailand)
    const [emailphoneFormat, setEmailPhoneFormat] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [verifyValidPhone, setVerifyValidPhone] = useState(false);
    const auth = FIREBASE_AUTH;
    const phoneChangeHandler = (phoneNumber) => {
      setPhone(phoneNumber);  
      setEmailPhoneFormat(`${phoneNumber}@wherenext.com`);
    };
  
    const countryCodeChangeHandler = (countryCode) => {
      setCountryCode(`+${countryCode}`);
    };
  
    const verifyPhoneHandler = () => {
      //No logic to check for phoneNum yet
      
      alert("OTP Sent!");
    };

    const dummyOTP = "123456"; // Dummy OTP for testing
  
    const signUpHandler = async () => {
      // Sign up handler
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          emailphoneFormat,
          dummyOTP
        ); //Use dummy OTP to create account
        alert(`Account created for ${dummyOTP}`); // Debug
        router.replace({pathname:'/OTP',params:{emailphoneFormat:emailphoneFormat}})

      } catch (error) {
        setVerifyValidPhone(false);
        alert("Create Account failed");
      } finally {
        setLoading(false);
      }
    };
    const handlePress2 = () => {
      router.push('/Userprofile')
    };
    return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2}/>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{textAlign :"center",
          textAlignVertical:"bottom",
          fontSize:30,
          padding:20, 
          color:'white'}}>We want to make sure {'\n'} you're unique</Text>
          <CountryCodePicker onPhoneChange={phoneChangeHandler}
                      onCountryCodeChange={countryCodeChangeHandler}/>
          <Button label={"Next"} onPress={signUpHandler} style={{}}></Button>
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