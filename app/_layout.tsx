import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Providers from "./providers";
import "../global.css";

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name="index" options={{ title: "Accounts" }} />
        <Stack.Screen name="transfer" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
