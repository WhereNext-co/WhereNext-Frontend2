import { View, Text, TextInput,  StyleSheet,Pressable,} from "react-native";
import React,{ useState, useEffect } from "react";
import Backbutton from '../../components/componentspung/Button/turnbackbutton/Backbutton';
import { router, useLocalSearchParams,Stack} from "expo-router";
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
  let { title,name,surname,mail,username,birthdate,profile,phone2,countryCode2,password,uid } = useLocalSearchParams();
  const [password2, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [token, setToken] = useState(''); // Token for user login
  const { login, register, isAuthenticated } = useAuth();
  console.log(title,name,surname,mail,username,birthdate,profile,phone2,countryCode2,password,uid);
  const auth = FIREBASE_AUTH;
  useEffect(() => {
    console.log(password2);
    if (password2.length === 6) {
      // Check if OTP length is 6
      signInHandler();
    }
  }, [password2]); // Dependency array to check for password change
useEffect(() => {
    if (token !== "") {
      createdatabase();
    }
}, [token]);
  const OTPHandler = (OTP) => {
    setPassword(OTP);
  };
  const createdatabase = async () => {
    try {
      console.log("create database");
      console.log(token);
      console.log(username, title, name, surname, mail, birthdate, countryCode2, phone2, profile);
      const response = await axios.post(
        "http://where-next.tech/users/create-info",
        {
          userName: username,
          title: title,
          name: name + " " + surname,
          email: mail,
          birthdate: birthdate,
          region: countryCode2,
          telNo: phone2,
          profilePicture: profile,
          bio: "",
        },
        {
          headers: {
            Authorization: "Bearer "+token,
          },
        }
      ).then((response) => {
        console.log(response.data);
        router.replace({ pathname: "../(app)/home"});
      })
      .catch((error) => {
        console.error("There was a problem with your Axios request: here", error);
      });
      
      // Do something with the response data if needed
    } catch (error) {
      console.error("Failed to send phone number to API:", error);
    } finally {
      console.log("finally");
      setLoading(false);
    }
  }

  const sendPhoneNumberToAPI = async (phoneNumber) => {
    try {
      console.log(`${countryCode2}${phone2}`);
      const response = await axios.post(
        "http://where-next.tech/auth/updateFirebaseUserPassword",
        { telNo: `${countryCode2}${phone2}` }
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
    console.log(password2);
     try {
      console.log('check-telno')
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        mail,
        password2
      );
      console.log(userCredential._tokenResponse.idToken)
      setToken(userCredential._tokenResponse.idToken);
      alert("Success");
      // router.replace("/(app)/home"); // Navigate to home page
    } catch (error) {
      alert(`Error: ${error} Password: ${password} Email: ${emailphoneFormat}`); // Debug
    } finally {
      console.log('finally')
    }
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

 
  const handlePress2 = () => {
    router.replace({pathname:'/Phone',params: {
          title: title,
          name: name,
          surname: surname,
          mail: mail,
          username: username,
          birthdate:birthdate,
          profile:profile,
          phone2:phone2,
          countryCode2:countryCode2,
          uid:uid
        }
  }
    )}
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ position: 'absolute', top: 60, left: 20 }}>
        <Backbutton style={{}} onPress={handlePress2} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#14072b', marginBottom: 20 }}>
        <OTP onOTPChange={OTPHandler} />
      </View>
      <Button label={"Send OTP"} onPress={sendPhoneNumberToAPI} style={{}}></Button>
    </View>
  );
}
