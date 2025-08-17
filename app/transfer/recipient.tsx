import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import SafeKeyboardView from "../../components/layout/SafeKeyboardView";
import { ROUTES } from "../../constants/routes";
import TransferRecipients from "../../features/transfer/TransferRecipients";

export default function TransferRecipientScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeKeyboardView keyboardOffset={80}>
      <View className="flex-1 bg-white p-6">
        <View className="mb-2 gap-3">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search recipient by name or account"
            className="border border-gray-300 rounded-xl px-3 py-2"
            autoCapitalize="none"
            textAlign="left"
          />
        </View>

        <TransferRecipients search={search} />

        <Link href={ROUTES.ROOT} dismissTo asChild className="mb-4">
          <Text className="bg-black text-white text-center py-4 rounded-xl text-base mt-6">
            Back
          </Text>
        </Link>
      </View>
    </SafeKeyboardView>
  );
}
