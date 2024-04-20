import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React,{ useState, useEffect } from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams} from "expo-router";
import Button from '../../components/componentspung/Button/Button/Button';
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import OTP from '../../components/componentspung/OTP/OTP';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext, useAuth } from "../../context/authContext";
import axios from "axios";
export default function Login() {
  let { title,name,surname,mail,username,birthdate,profile,phone,countryCode,password,uid } = useLocalSearchParams();
  const [password2, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const { login, register, isAuthenticated } = useAuth();

  const auth = FIREBASE_AUTH;
  console.log(title,name,surname,mail,username,birthdate,profile,phone,countryCode,password,uid )
  useEffect(() => {
    console.log(password2);
    if (password2.length === 6) {
      // Check if OTP length is 6
      signInHandler();
    }
  }, [password2]); // Dependency array to check for password change

  const OTPHandler = (OTP) => {
    setPassword(OTP);
  };

  const sendPhoneNumberToAPI = async (phoneNumber) => {
    try {
      const response = await axios.post(
        "http://where-next.tech/auth/updateFirebaseUserPassword",
        { telNo: `${countryCode}${phone}` }
      );
      const { message, telNo } = response.data;
      setResend(true);
      // Do something with the response data if needed
      alert("OTP Sent!");
    } catch (error) {
      console.error("Failed to send phone number to API:", error);
    }
  };
  const signInHandler = async () => {
    // Sign in handler
    setLoading(true);
    console.log(password, password2);
    if (resend==false) {if (password==password2) {
      alert("Success");
      router.replace({ pathname: "/Location", params: { name: '', surname: '' } }); // Navigate to home page
    } else {
      alert("Error: OTP is incorrect"); // Debug
    }} else {try {
      await login(mail, password2);
      alert("Success");
      router.replace("/(app)/home"); // Navigate to home page
    } catch (error) {
      alert(`Error: ${error} Password: ${password} Email: ${emailphoneFormat}`); // Debug
    } finally {
      setLoading(false);
    }}
    // try {
    //   const response = await signInWithEmailAndPassword(
    //     auth,
    //     emailphoneFormat,
    //     password
    //   ); // Use dummy OTP to sign in
    //   alert("Success");
    //   router.replace({ pathname: "/Location", params: { name: '', surname: '' } }); // Navigate to home page
    // } catch (error) {
    //   alert(`Error: ${error} Password: ${password} Email: ${emailphoneFormat}`); // Debug
    // } finally {
    //   setLoading(false);
    // }
  };

  const handlePress = () => {
    router.push({ pathname: "/Name", params: { name: '', surname: '' } });
  };

  const handlePress2 = () => {
    router.push('Phone');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', marginBottom: 20 }}>
        <OTP onOTPChange={OTPHandler} />
      </View>
      <Button label={"Send OTP"} onPress={sendPhoneNumberToAPI} style={{}}></Button>
    </View>
  );
}
