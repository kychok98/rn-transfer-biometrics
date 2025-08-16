import { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface IRecipientProps {
  item: Recipient;
  selected: boolean;
  onPress: () => void;
}

function RecipientItem({ item, selected, onPress }: IRecipientProps) {
  return (
    <Pressable
      onPress={onPress}
      className="px-4 h-16 flex-row items-center justify-between border-b border-gray-100"
    >
      <View>
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-gray-500 text-xs">{item.account}</Text>
      </View>
      <View
        className={`w-4 h-4 rounded-full ${selected ? "bg-black" : "border border-gray-400"}`}
      />
    </Pressable>
  );
}

export default memo(RecipientItem);
