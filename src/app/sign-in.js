import { router } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomCountryCodePicker from "../components/CustomCountryCodePicker";
import OTP from "../components/OTP";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// import { useSession } from "../ctx";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+66"); // Default country code is +66 (Thailand)
  const [emailphoneFormat, setEmailPhoneFormat] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyValidPhone, setVerifyValidPhone] = useState(false);
  const auth = FIREBASE_AUTH;

  //Debug
  console.log("<--Phone w/o CC-->");
  console.log(phone);
  console.log("--Phone with CC--");
  console.log(`${countryCode}${phone}`);
  console.log("--Email Format--");
  console.log(emailphoneFormat);
  console.log("--Input OTP--");
  console.log(password);
  console.log("<------>");

  const phoneChangeHandler = (phoneNumber) => {
    setPhone(phoneNumber);
    setEmailPhoneFormat(`${countryCode}${phoneNumber}@wherenext.com`);
  };

  const countryCodeChangeHandler = (countryCode) => {
    setCountryCode(`+${countryCode}`);
  };

  const verifyPhoneHandler = async () => {
    setLoading(true);
    try {
      // Send telephone number to API
      await sendPhoneNumberToAPI(`${countryCode}${phone}`);
      setVerifyValidPhone(true);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending phone number to API:", error);
      // Handle error condition, e.g., show error message to user
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneNumberToAPI = async (phoneNumber) => {
    try {
      const response = await fetch('http://192.168.100.198:5000/auth/updateFirebaseUserPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telNo : phoneNumber }), // Send telephone number in JSON format
      });
      if (!response.ok) {
        throw new Error('Failed to send phone number to API');
      }
          // If response is successful, parse the JSON response
    const data = await response.json();
    console.log(data); // Log the response data

    // Handle the response data as needed
    const { message, telNo } = data;
    console.log("Message:", message);
    console.log("Telephone Number:", telNo);
  } catch (error) {
    throw new Error('Error sending phone number to API In sendPhoneNum', error);
  }
  };

  const OTPHandler = (OTP) => {
    setPassword(OTP);
  };

  useEffect(() => {
    if (password.length === 6) {
      // Check if OTP length is 6
      signInHandler();
    }
  }, [password]); // Dependency array to check for password change

  const signInHandler = async () => {
    // Sign in handler
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailphoneFormat,
        password
      ); //Use dummy OTP to sign in
      alert("Success");
      router.replace("/(app)/home"); // Navigate to home page
    } catch (error) {
      alert(`Error: ${error} Password: ${password} Email: ${emailphoneFormat}`); // Debug
    } finally {
      setLoading(false);
    }
  };

  const dummyOTP = "123456"; // Dummy OTP for default sign up

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
    } catch (error) {
      alert("Create Account failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {}
      {verifyValidPhone ? (
        <OTP onOTPChange={OTPHandler} />
      ) : (
        <>
          <CustomCountryCodePicker
            onPhoneChange={phoneChangeHandler}
            onCountryCodeChange={countryCodeChangeHandler}
          />
          {loading ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <>
              <Button title="Send OTP" onPress={verifyPhoneHandler} />
              <Button title="Create Account" onPress={signUpHandler} />
            </>
          )}
        </>
      )}
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
