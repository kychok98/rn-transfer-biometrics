import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import InputAmount from "../../components/input/InputAmount";
import { formatCurrency } from "../../utils/format";
import { transferFormSchema, TransferFormValues } from "./schemas/transfer";
import { useAccountStore } from "./stores/useAccount";

interface IProps {
  mutate: UseMutateFunction<any, any, InputTransfer>;
  isLoading: boolean;
}

export default function TransferForm({ mutate, isLoading }: IProps) {
  const { recipientName, recipientAccount } = useLocalSearchParams<{
    recipientName: string;
    recipientAccount: string;
  }>();

  const { balance } = useAccountStore();

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    mode: "onChange",
    defaultValues: { amountStr: "", note: "" },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutate({
      recipientAccount: recipientAccount,
      recipientName: recipientName,
      amount: Number(values.amountStr),
      note: values.note,
    });
  });

  return (
    <View>
      <View className="gap-1 mb-2">
        <Text className="font-medium text-xl">{recipientName}</Text>
        <Text className="text-gray-500 text-2xl">{recipientAccount}</Text>
      </View>

      <View className="py-4 gap-3">
        <Text className="text-gray-600 font-semibold">
          Balance: {formatCurrency(balance)}
        </Text>

        <Controller
          control={form.control}
          name="amountStr"
          render={({ field: { value, onChange } }) => (
            <InputAmount
              value={value}
              onChange={(val) => {
                const num = parseFloat(val || "0");

                // clamp to balance
                if (num > balance) {
                  onChange(String(balance.toFixed(2)));
                } else {
                  onChange(val);
                }
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Note (optional)"
              className="border border-gray-300 rounded-xl px-3 py-2 "
            />
          )}
        />
      </View>

      <Pressable
        disabled={!form.formState.isValid || isLoading}
        onPress={handleSubmit}
        className="bg-black rounded-xl py-4 mt-2 opacity-100 disabled:opacity-50 mb-8"
      >
        {isLoading ? (
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
    </View>
  );
}
