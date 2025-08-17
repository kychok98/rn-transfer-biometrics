import { Text, TextInput, View } from "react-native";

interface IProps {
  value: string;
  onChange?: (value: string) => void;
}

export default function InputAmount({ value, onChange }: IProps) {
  return (
    <View className="gap-2">
      <View className="flex flex-row items-start">
        <Text className="leading-[34px] text-4xl text-gray-300 font-bold">
          RM
        </Text>
        <TextInput
          autoFocus
          value={value}
          onChangeText={onChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          className="rounded-xl px-2 text-4xl font-semibold"
        />
      </View>
    </View>
  );
}
