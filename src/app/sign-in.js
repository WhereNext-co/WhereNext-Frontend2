import { router } from "expo-router";
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator, Button } from "react-native";
import React, { useState } from "react";
import CustomCountryCodePicker from "../components/CustomCountryCodePicker";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


// import { useSession } from "../ctx";

export default function SignIn() {

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+66');
  const [emailphoneFormat, setEmailPhoneFormat] = useState('');
  const [password, setPassword] = useState('defaultPass');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  
  //Debug
  console.log('<------>');
  console.log(phone);
  console.log('------');
  console.log(`${countryCode}${phone}`);
  console.log('------');
  console.log(emailphoneFormat);
  console.log('<------>');
  

  const phoneChangeHandler = (phoneNumber) => {
    setPhone(phoneNumber);
    setEmailPhoneFormat(`${phoneNumber}@wherenext.com`)
  };

  const countryCodeChangeHandler = (countryCode) => {
    setCountryCode(`+${countryCode}`);
  };

  const signInHandler = async () => { // Sign in handler
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, emailphoneFormat, password);
      console.log(response)
      alert('Success')
      router.push('/otp')
    } catch (error) {
      alert('Sign in failed')
    } finally {
      setLoading(false);
    }
  }

  const signUpHandler = async () => { // Sign up handler
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, emailphoneFormat, password);
      console.log(response)
      alert('Created Successfully')
    } catch (error) {
      alert('Create Account failed')
      console.log(response)
    } finally {
      setLoading(false);
    }
  }
  


  return (
    <View>
      <CustomCountryCodePicker onPhoneChange={phoneChangeHandler} onCountryCodeChange={countryCodeChangeHandler} /> 

      { loading ? <ActivityIndicator size='large' color='gray'/>
      : <>
      <Button title="Login" onPress={signInHandler} />
      <Button title="Create Account" onPress={signUpHandler} /> 
      </>
      }
    </View>
  );
}

/*
        <Text
          onPress={() => {
            // signIn();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace("/");
          }}
        >
        Sign In
        </Text>
*/

//   const { signIn } = useSession();