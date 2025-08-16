import { useLocalSearchParams, Link } from "expo-router";
import { View, Text } from "react-native";
import { formatCurrency } from "../../utils/format";

export default function Confirm() {
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    amount: string;
    note?: string;
  }>();

  return (
    <View className="flex-1 bg-white p-6 gap-4">
      <Text className="text-2xl font-semibold">Transfer Successful</Text>
      <Text className="text-gray-600">Transaction ID</Text>
      <Text className="font-mono">{params.id}</Text>

      <Text className="text-gray-600 mt-2">Recipient</Text>
      <Text className="font-medium">{params.name}</Text>

      <Text className="text-gray-600 mt-2">Amount</Text>
      <Text className="font-medium">
        {formatCurrency(Number(params.amount))}
      </Text>

      {params.note ? (
        <>
          <Text className="text-gray-600 mt-2">Note</Text>
          <Text className="font-medium">{params.note}</Text>
        </>
      ) : null}

      <Link href="/" asChild>
        <Text
          className="bg-black text-white text-center py-4 rounded-xl text-base mt-6"
          accessibilityRole="button"
        >
          Back to Home
        </Text>
      </Link>
    </View>
  );
}
