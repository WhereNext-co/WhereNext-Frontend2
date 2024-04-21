import { Stack } from "expo-router/stack";
import React, { useState, useEffect } from "react";
// import { SessionProvider } from "../ctx";
import * as Location from "expo-location";
import { UserLocationContext } from "../context/userLocationContext";
import { useSegments, router } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";

function AppLayout() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    //Check if user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      //To home
      // router.replace("home");
    } else if (isAuthenticated == false) {
      //To signIn
      router.replace("Introduce");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(sign_up)" options={{ headerShown: false }} />
      </Stack>
    </UserLocationContext.Provider>
  );
}
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <AppLayout />
    </AuthContextProvider>
  );
}
