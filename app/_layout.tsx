import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  const [client] = useState(() => new QueryClient());

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={client}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
              name="index"
              options={{
                title: "Accounts",
              }}
            />
            <Stack.Screen
              name="transfer/index"
              options={{
                title: "New Transfer",
                headerBackButtonDisplayMode: "minimal",
              }}
            />
            <Stack.Screen
              name="transfer/confirm"
              options={{
                title: "Transfer Complete",
                headerBackVisible: false,
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
