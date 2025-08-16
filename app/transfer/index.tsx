import { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { processTransfer } from "../../api/transfer-api";
import ModalPin from "../../components/modal-pin";
import RecipientItem from "../../components/recipient-item";
import { useAccountStore } from "../../store/useAccount";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authenticateWithBiometrics } from "../../lib/biometrics";
import { useRouter } from "expo-router";
import { formatCurrency } from "../../utils/format";

const schema = z.object({
  recipientId: z.string().min(1, "Please select a recipient"),
  amountStr: z
    .string()
    .min(1, "Enter amount")
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v), "Invalid amount format"),
  note: z.string().max(140, "Max 140 chars").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function TransferScreen() {
  const router = useRouter();
  const { balance, recipients, debit, addTransaction } = useAccountStore();
  const [search, setSearch] = useState("");
  const [pinVisible, setPinVisible] = useState(false);
  const [pinResolver, setPinResolver] = useState<
    ((pin: string | null) => void) | null
  >(null);

  const filteredRecipients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return recipients;
    return recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.account.toLowerCase().includes(q),
    );
  }, [recipients, search]);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { recipientId: "", amountStr: "", note: "" },
  });

  const amountStr = watch("amountStr");
  const selectedRecipientId = watch("recipientId");
  const selectedRecipient = useMemo(
    () => recipients.find((r) => r.id === selectedRecipientId) || null,
    [recipients, selectedRecipientId],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (input: {
      recipientId: string;
      amount: number;
      note?: string;
    }) => {
      // Step 1: biometrics (with PIN fallback handled inside helper)
      const authed = await authenticateWithBiometrics({
        promptMessage: "Authenticate to transfer",
        pinFallback: () =>
          new Promise<string | null>((resolve) => {
            setPinResolver(() => resolve);
            setPinVisible(true);
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
      const code = err?.code || err?.message;
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

  const onSubmit = useCallback(
    (values: FormValues) => {
      const amount = Number(values.amountStr);
      if (amount <= 0) return;
      if (amount > balance) {
        Alert.alert(
          "Insufficient funds",
          "Amount exceeds your current balance.",
        );
        return;
      }
      mutate({
        recipientId: values.recipientId,
        amount,
        note: values.note || undefined,
      });
    },
    [balance, mutate],
  );

  const renderItem = useCallback(
    ({ item }: any) => (
      <RecipientItem
        item={item}
        selected={item.id === selectedRecipientId}
        onPress={() =>
          setValue("recipientId", item.id, { shouldValidate: true })
        }
      />
    ),
    [selectedRecipientId, setValue],
  );

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 gap-3">
        <Text className="text-gray-500">Balance</Text>
        <Text className="text-2xl font-semibold">
          {formatCurrency(balance)}
        </Text>

        <Text className="mt-4 text-base font-medium">Recipient</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search recipient by name or account"
          className="border border-gray-300 rounded-xl px-3 py-2"
          autoCapitalize="none"
        />
      </View>

      <FlatList
        data={filteredRecipients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={12}
        windowSize={8}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: 64,
          offset: 64 * index,
          index,
        })}
        ListEmptyComponent={
          <Text className="px-4 text-gray-500">No recipients.</Text>
        }
      />

      <View className="p-4 gap-3 border-t border-gray-100">
        <Text className="text-base font-medium">Amount</Text>
        <Controller
          control={control}
          name="amountStr"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              keyboardType="decimal-pad"
              placeholder="0.00"
              className="border border-gray-300 rounded-xl px-3 py-3 text-lg"
            />
          )}
        />
        {errors.amountStr && (
          <Text className="text-red-500">{errors.amountStr.message}</Text>
        )}

        <Text className="text-base font-medium">Note (optional)</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Add a note (max 140 chars)"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
          )}
        />
        {errors.note && (
          <Text className="text-red-500">{errors.note.message}</Text>
        )}

        {errors.recipientId && (
          <Text className="text-red-500">{errors.recipientId.message}</Text>
        )}

        <Pressable
          disabled={!isValid || isPending}
          onPress={handleSubmit(onSubmit)}
          className="bg-black rounded-xl py-4 mt-2 opacity-100 disabled:opacity-50"
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-base font-medium">
              Send{" "}
              {amountStr ? `· ${formatCurrency(Number(amountStr) || 0)}` : ""}
            </Text>
          )}
        </Pressable>
      </View>

      {/* PIN fallback modal */}
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
  );
}
