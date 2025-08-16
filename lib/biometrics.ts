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
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log("Supported types:", types); // fingerprint / face / iris

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
    console.log(result);
    if (result.success) return true;
    // fall through to PIN if user prefers
  }

  // Fallback to PIN
  const pin = await pinFallback();
  return pin === "123456";
}
