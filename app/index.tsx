import { Link } from "expo-router";
import { View, Text } from "react-native";
import { useAccountStore } from "../features/transfer/stores/useAccount";
import { formatCurrency } from "../utils/format";

export default function Home() {
  const balance = useAccountStore((s) => s.balance);

  return (
    <View className="flex-1 bg-white p-6 gap-6">
      <View className="mt-6">
        <Text className="text-gray-500 text-base">Current Balance</Text>
        <Text className="text-3xl font-bold mt-1">
          {formatCurrency(balance)}
        </Text>
      </View>

      <Link href="/transfer" asChild>
        <Text
          className="bg-black text-white text-center py-4 rounded-xl text-base"
          accessibilityRole="button"
        >
          New Transfer
        </Text>
      </Link>
    </View>
  );
}
