import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import SafeKeyboardView from "../../components/layout/SafeKeyboardView";
import { formatCurrency } from "../../utils/format";
import ModalPin from "./components/ModalPin";
import { useTransaction } from "./hooks/useTransaction";
import { transferFormSchema, TransferFormValues } from "./schemas/transfer";
import TransferForm from "./TransferForm";
import TransferRecipients from "./TransferRecipients";

export default function TransferScreen() {
  const [pinVisible, setPinVisible] = useState(false);
  const [pinResolver, setPinResolver] = useState<
    ((pin: string | null) => void) | null
  >(null);

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    mode: "onChange",
    defaultValues: { recipientId: "", amountStr: "", note: "" },
  });

  const transaction = useTransaction({
    requestPin: (res) => {
      setPinResolver(() => res); // save resolver
      setPinVisible(true); // show modal
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    transaction.mutate({
      recipientId: values.recipientId,
      amount: Number(values.amountStr),
      note: values.note,
    });
  });

  return (
    <SafeKeyboardView keyboardOffset={80}>
      <View className="flex-1 bg-white">
        <TransferForm form={form} />
        <TransferRecipients form={form} />

        <Pressable
          disabled={!form.formState.isValid || transaction.isPending}
          onPress={handleSubmit}
          className="bg-black rounded-xl py-4 mt-2 opacity-100 disabled:opacity-50 mb-8"
        >
          {transaction.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-base font-medium">
              Send
              {form.watch("amountStr")
                ? ` · ${formatCurrency(Number(form.getValues("amountStr")) || 0)}`
                : ""}
            </Text>
          )}
        </Pressable>

        <ModalPin
          visible={pinVisible}
          onCancel={() => {
            setPinVisible(false);
            pinResolver?.(null);
          }}
          onSubmit={(pin) => {
            setPinVisible(false);
            pinResolver?.(pin);
          }}
        />
      </View>
    </SafeKeyboardView>
  );
}
