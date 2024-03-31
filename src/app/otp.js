import { router } from "expo-router";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import OTP from "../components/OTP";


// import { useSession } from "../ctx";

export default function SignIn() {
    const [otpInput, setOtpInput] = useState('');

    const OTPChangeHandler = (otp) => {
        setOtpInput(otp);
    }
    
    console.log(otpInput);

    return (
        <View>
            
            <OTP onOTPChange={OTPChangeHandler} />

        </View>
);
}