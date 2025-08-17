import { Controller, UseFormReturn } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import InputAmount from "../../components/input/InputAmount";
import { useAccountStore } from "./stores/useAccount";
import { formatCurrency } from "../../utils/format";
import { TransferFormValues } from "./schemas/transfer";

interface Props {
  form: UseFormReturn<TransferFormValues>;
}

export default function TransferForm({ form }: Props) {
  const { balance } = useAccountStore();

  return (
    <View className="p-4 gap-3 border-t border-gray-100">
      <Text className="text-gray-500 font-semibold">
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
  );
}
