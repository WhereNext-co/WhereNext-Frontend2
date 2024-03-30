import { router } from "expo-router";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import CustomCountryCodePicker from "../components/CustomCountryCodePicker";


// import { useSession } from "../ctx";

export default function SignIn() {

  return (
    <View>

      <CustomCountryCodePicker/>
            

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