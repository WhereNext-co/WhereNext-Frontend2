import { router, Stack } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomCountryCodePicker from "../components/CustomCountryCodePicker";
import OTP from "../components/OTP";
import { AuthContext, useAuth } from "../context/authContext";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { u } from "react-native-big-calendar";
import { set } from "date-fns";

import Button from "../components/componentspung/Button/Button/LongButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export default function SignIn() {
  const { login, register, isAuthenticated } = useAuth();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+66"); // Default country code is +66 (Thailand)
  const [emailphoneFormat, setEmailPhoneFormat] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyValidPhone, setVerifyValidPhone] = useState(false);

  const [pass, setPass] = useState("");

  useEffect(() => {
    console.log("pass:", pass);
    if (pass !== "") {
      router.replace("./(app)/home"); // Navigate to home page
    }
  }, [pass]);

  const phoneChangeHandler = (phoneNumber) => {
    setPhone(phoneNumber);
    setEmailPhoneFormat(`${countryCode}${phoneNumber}@wherenext.com`);
  };

  const countryCodeChangeHandler = (countryCode) => {
    setCountryCode(`+${countryCode}`);
  };
  const verifyPhoneHandler = async () => {
    setLoading(true);
    console.log("phone:", phone);
    try {
      // Send telephone number to API

      response = await axios
        .post("http://where-next.tech/users/check-telno", {
          telNo: `${phone}`,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.exists == true) {
            verifyPhoneHandler2();
            console.log("tel in firebase already");
          } else {
            alert("Account not found");
          }
        })
        .catch((error) => {
          console.error("Error sending phone number to API: checkTelNo", error);
          // Handle error condition, e.g., show error message to user
        });
    } catch (error) {
      console.error("Error sending phone number to API: checkTelNo", error);
      // Handle error condition, e.g., show error message to user
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneHandler2 = async () => {
    setLoading(true);
    try {
      // Send telephone number to API
      await sendPhoneNumberToAPI(`${countryCode}${phone}`);
    } catch (error) {
      console.error("Error sending phone number to API:", error);
      alert("Failed to send phone number to API");
      // Handle error condition, e.g., show error message to user
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneNumberToAPI = async (phoneNumber) => {
    try {
      const response = await axios.post(
        "http://where-next.tech/auth/updateFirebaseUserPassword",
        { telNo: phoneNumber }
      );
      const { message, telNo } = response.data;

      // Do something with the response data if needed
      setVerifyValidPhone(true);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Failed to send phone number to API:", error);
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
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        emailphoneFormat,
        password
      );
      setPass(userCredential._tokenResponse.idToken);
    } catch (error) {
      alert(`Error: OTP wrong`); // Debug
    } finally {
      setLoading(false);
    }
  };

  const signUpHandler = async () => {
    // Sign up handler
    router.push({ pathname: "/(sign_up)/Introduce" }); // Navigate to username page
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#14072b",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />

      {}
      {verifyValidPhone ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <OTP onOTPChange={OTPHandler} />
          <Button label={"Send OTP"} onPress={verifyPhoneHandler} />
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 30,
                padding: 20,
                marginBottom: 70,
              }}
            >
              Log in with{"\n"}your phone number
            </Text>
          </View>
          <CustomCountryCodePicker
            onPhoneChange={phoneChangeHandler}
            onCountryCodeChange={countryCodeChangeHandler}
          />
          {loading ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <View style={{ paddingVertical: 10 }}>
              <Button label={"Send OTP"} onPress={verifyPhoneHandler} />
              <Pressable style={{}} onPress={signUpHandler}>
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  Don't have an account? Sign up
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
