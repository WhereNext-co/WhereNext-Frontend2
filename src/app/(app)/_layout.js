import React from "react";
import { Tabs } from "expo-router";
import FriendsOutline from "../../../assets/tabs/outline/friends.svg";
import ProfileOutline from "../../../assets/tabs/outline/profile.svg";
import DiaryOutline from "../../../assets/tabs/outline/dairy.svg";
import HomeOutline from "../../../assets/tabs/outline/home.svg";
import PlusCircleOutline from "../../../assets/tabs/outline/plusCircle.svg";
import FriendsSolid from "../../../assets/tabs/solid/friends.svg";
import ProfileSolid from "../../../assets/tabs/solid/profile.svg";
import DiarySolid from "../../../assets/tabs/solid/dairy.svg";
import HomeSolid from "../../../assets/tabs/solid/home.svg";
import PlusCircleSolid from "../../../assets/tabs/solid/plusCircle.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#181D45",
          borderBlockColor: "#181D45",
        },
        tabBarLabelStyle: {
          fontWeight: "black",
          fontSize: 10,
        },
        tabBarIconStyle: {
          marginBottom: -3, // Adjust icon position to align with text
        },
      }}
    >
      <Tabs.Screen
        name="createRendezvous"
        options={({ route }) => ({
          title: "Rendezvous",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <PlusCircleSolid width={30} height={30} color={color} />
            ) : (
              <PlusCircleOutline width={30} height={30} color={color} />
            ),
        })}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <DiarySolid width={30} height={30} color={color} />
            ) : (
              <DiaryOutline width={30} height={30} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeSolid width={30} height={30} color={color} />
            ) : (
              <HomeOutline width={30} height={30} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FriendsSolid width={30} height={30} color={color} />
            ) : (
              <FriendsOutline width={30} height={30} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ProfileSolid width={30} height={30} color={color} />
            ) : (
              <ProfileOutline width={30} height={30} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
