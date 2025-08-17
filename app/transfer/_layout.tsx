import { Stack } from "expo-router";

export default function TransferLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="recipient" options={{ title: "Select Recipient" }} />
      <Stack.Screen name="amount" options={{ title: "Enter Amount" }} />
      <Stack.Screen
        name="complete"
        options={{
          title: "Transfer Complete",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
