import { router } from "expo-router";
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator, Button } from "react-native";
import React, { useState } from "react";
import CustomCountryCodePicker from "../components/CustomCountryCodePicker";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


// import { useSession } from "../ctx";

export default function SignIn() {

  const [phone, setPhone] = useState('');
  const [emailphoneFormat, setEmailPhoneFormat] = useState('');
  const [password, setPassword] = useState('defaultPass');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  console.log(phone);
  console.log(password);
  console.log(emailphoneFormat);

  const phoneChangeHandler = (phoneNumber) => {
    setPhone(phoneNumber);
    setEmailPhoneFormat('${phoneNumber}@wherenext.com')
  };

  const signInHandler = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, emailphoneFormat, password);
      console.log(response)
      alert('Success')
    } catch (error) {
      alert('Sign in failed')
    } finally {
      setLoading(false);
    }
  }
  


  return (
    <View>
      <CustomCountryCodePicker onPhoneChange={phoneChangeHandler} /> 

      { loading ? <ActivityIndicator size='large' color='gray'/>
      : <>
      <Button title="Login" onPress={signInHandler} />
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