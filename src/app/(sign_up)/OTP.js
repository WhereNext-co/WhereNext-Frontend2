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

export default function Login() {
  let { emailphoneFormat } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    console.log(password);
    if (password.length === 6) {
      // Check if OTP length is 6
      signInHandler();
    }
  }, [password]); // Dependency array to check for password change

  const OTPHandler = (OTP) => {
    setPassword(OTP);
  };

  const signInHandler = async () => {
    // Sign in handler
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailphoneFormat,
        password
      ); // Use dummy OTP to sign in
      alert("Success");
      router.replace({ pathname: "/Location", params: { name: '', surname: '' } }); // Navigate to home page
    } catch (error) {
      alert(`Error: ${error} Password: ${password} Email: ${emailphoneFormat}`); // Debug
    } finally {
      setLoading(false);
    }
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
      <Button label={"Send OTP"} onPress={() => console.log(password)} style={{}}></Button>
    </View>
  );
}
