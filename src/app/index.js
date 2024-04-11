import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { fbApp } from "../../firebaseConfig";

export default function index() {
  return (
    <View>
      <Text
        onPress={() => {
          // signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.push("./home");
        }}
      >
        To Home
      </Text>
      <Text
        onPress={() => {
          // signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.push("./sign-in");
        }}
      >
        To Sign In page
      </Text>
      <Text
        onPress={() => {
          // signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.push("./Introduce");
        }}
      >
        To Sign Up page
      </Text><Text
        onPress={() => {
          // signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.push("./Userprofile");
        }}
      >
        Userprofile
      </Text>
    </View>
  );
}
