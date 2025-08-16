import { useMemo, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { FlatList, Text, TextInput, View } from "react-native";
import { useAccountStore } from "../../store/useAccount";
import RecipientItem from "./components/RecipientItem";
import { TransferFormValues } from "./schemas/transfer";

interface Props {
  form: UseFormReturn<TransferFormValues>;
}
export default function TransferRecipients({ form }: Props) {
  const { recipients } = useAccountStore();
  const [search, setSearch] = useState("");

  const filteredRecipients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return recipients;

    return recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.account.toLowerCase().includes(q),
    );
  }, [recipients, search]);

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 gap-3">
        <Text className="mt-4 text-base font-medium">Recipient</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search recipient by name or account"
          className="border border-gray-300 rounded-xl px-3 py-2"
          autoCapitalize="none"
          textAlign="left"
        />
      </View>

      <FlatList
        data={filteredRecipients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipientItem
            item={item}
            selected={item.id === form.watch("recipientId")}
            onPress={() =>
              form.setValue("recipientId", item.id, { shouldValidate: true })
            }
          />
        )}
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
    </View>
  );
}
