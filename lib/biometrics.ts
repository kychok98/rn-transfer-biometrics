import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateWithBiometrics({
  promptMessage,
  pinFallback,
}: {
  promptMessage: string;
  pinFallback: () => Promise<string | null>;
}): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
    if (result.success) return true;
    // fall through to PIN if user prefers
  }

  // Fallback to PIN
  const pin = await pinFallback();
  // For demo: accept 6-digit PIN "123456". In real app, verify via backend.
  return pin === "123456";
}
