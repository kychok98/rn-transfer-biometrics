import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import RecipientItem from "./components/RecipientItem";
import { useRecipients } from "./hooks/useRecipients";

export default function TransferRecipients() {
  const router = useRouter();

  const { data: recipients = [], isLoading, isError } = useRecipients();

  const [search, setSearch] = useState("");

  const filteredRecipients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return recipients;

    return recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.account.toLowerCase().includes(q),
    );
  }, [recipients, search]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-500">Loading recipients...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Failed to load recipients.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 gap-3">
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
            onPress={() =>
              router.push({
                pathname: "/transfer/amount",
                params: {
                  recipientAccount: item.account,
                  recipientName: item.name,
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text className="px-4 text-gray-500">No recipients found.</Text>
        }
        initialNumToRender={12}
        windowSize={8}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: 64,
          offset: 64 * index,
          index,
        })}
      />
    </View>
  );
}
