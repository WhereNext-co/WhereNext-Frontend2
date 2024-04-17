import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
// import { useSession } from "../../ctx";
import Bell from "../../../assets/tabs/bell.svg";
import Friends from "../../../assets/tabs/friends.svg";
import Profile from "../../../assets/tabs/profile.svg";
import Dairy from "../../../assets/tabs/dairy.svg";
import Home from "../../../assets/tabs/home.svg";
import { View } from "react-native";
import { userLocationContext } from "../../context/userLocationContext";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color }) => (
            <Bell width={30} height={30} name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dairy"
        options={{
          title: "Dairy",
          tabBarIcon: ({ color }) => (
            <Dairy width={30} height={30} name="Dairy" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home width={30} height={30} name="Home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <Friends width={30} height={30} name="Friends" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Profile width={30} height={30} name="Profile" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// const { session, isLoading } = useSession();

// // You can keep the splash screen open, or render a loading screen like we do here.
// if (isLoading) {
//   return <Text>Loading...</Text>;
// }

// // Only require authentication within the (app) group's layout as users
// // need to be able to access the (auth) group and sign in again.
// if (!session) {
//   // On web, static rendering will stop here as the user is not authenticated
//   // in the headless Node process that the pages are rendered in.
//   return <Redirect href="/sign-in" />;
// }
