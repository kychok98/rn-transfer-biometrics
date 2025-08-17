import { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface IRecipientProps {
  item: Recipient;
  onPress: () => void;
}

function RecipientItem({ item, onPress }: IRecipientProps) {
  return (
    <Pressable
      onPress={onPress}
      className="px-4 h-16 flex-row items-center justify-between border-b border-gray-100"
    >
      <View>
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-gray-500 text-xs">{item.account}</Text>
      </View>
      <Text className="text-gray-400 text-3xl font-black mr-2">›</Text>
    </Pressable>
  );
}

export default memo(RecipientItem);
