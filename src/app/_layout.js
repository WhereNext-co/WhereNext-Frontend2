import { Stack } from "expo-router/stack";
// import { SessionProvider } from "../ctx";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
