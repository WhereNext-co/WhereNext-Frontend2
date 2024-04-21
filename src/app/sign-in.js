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
import { AuthContext, useAuth } from "../context/authContext";
import axios from "axios";

export default function SignIn() {
  const { login, register, isAuthenticated } = useAuth();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+66"); // Default country code is +66 (Thailand)
  const [emailphoneFormat, setEmailPhoneFormat] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyValidPhone, setVerifyValidPhone] = useState(false);

  //Debug
  console.log("<--Phone w/o CC-->");
  console.log(phone);
  console.log("--Phone with CC--");
  console.log(`${countryCode}${phone}`);
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
      await login(emailphoneFormat, password);
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
      await register(emailphoneFormat, dummyOTP);
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
              <Button
                title="Go to Home"
                onPress={() => router.replace("./(app)/home")}
              />
              <Button
                title="Go to Schedule Sync"
                onPress={() =>
                  router.replace("./(app)/createRendezvous/scheduleSync")
                }
              />
            </>
          )}
        </>
      )}
    </View>
  );
}
