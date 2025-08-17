import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { processTransfer } from "../api/transfer-api";
import { authenticateWithBiometrics } from "../../../lib/biometrics";
import { useAccountStore } from "../../../store/useAccount";

interface UseTransactionParams {
  requestPin: (resolver: (pin: string | null) => void) => void;
}

export const useTransaction = ({ requestPin }: UseTransactionParams) => {
  const router = useRouter();
  const { debit, addTransaction } = useAccountStore();

  return useMutation({
    mutationFn: async (input: InputTransfer) => {
      // Step 1: biometrics (with PIN fallback handled inside helper)
      const authed = await authenticateWithBiometrics({
        promptMessage: "Authenticate to transfer",
        pinFallback: () =>
          new Promise<string | null>((resolve) => {
            requestPin(resolve); // tell UI: “show PIN modal and call me back”
          }),
      });
      if (!authed) {
        throw new Error("AUTH_CANCELLED");
      }

      // Step 2: process transfer via simulated API
      const res = await processTransfer(input);
      return res;
    },
    onSuccess: (res) => {
      // update local store
      debit(res.amount);
      addTransaction(res);
      router.replace({
        pathname: "/transfer/confirm",
        params: {
          id: res.id,
          name: res.recipientName,
          amount: String(res.amount),
          note: res.note ?? "",
        },
      });
    },
    onError: (err: any) => {
      console.log("error", err);
      const code = err?.code || err?.message;
      console.log(code);
      switch (code) {
        case "INSUFFICIENT_FUNDS":
          Alert.alert(
            "Insufficient funds",
            "Your balance is not enough for this transfer.",
          );
          break;
        case "NETWORK_ERROR":
          Alert.alert(
            "Network issue",
            "Please check your connection and try again.",
          );
          break;
        case "AUTH_CANCELLED":
          Alert.alert("Authentication cancelled", "Transfer not authorized.");
          break;
        default:
          Alert.alert(
            "Transfer failed",
            "Something went wrong. Please try again.",
          );
      }
    },
  });
};
