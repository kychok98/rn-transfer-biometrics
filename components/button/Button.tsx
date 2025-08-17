import { Pressable, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  className = "",
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`bg-black rounded-xl opacity-100 disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-center font-medium">{title}</Text>
      )}
    </Pressable>
  );
}
