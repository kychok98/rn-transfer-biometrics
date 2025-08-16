import { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";

export default function ModalPin({
  visible,
  onSubmit,
  onCancel,
}: {
  visible: boolean;
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}) {
  const [pin, setPin] = useState("");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 items-center justify-center p-6">
        <View className="bg-white rounded-2xl p-6 w-full gap-3">
          <Text className="text-lg font-semibold">Enter PIN</Text>
          <Text className="text-gray-500">
            Biometrics unavailable — use your 6‑digit PIN.
          </Text>
          <TextInput
            value={pin}
            onChangeText={setPin}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry
            className="border border-gray-300 rounded-xl px-3 py-3 tracking-widest text-center text-lg"
          />
          <View className="flex-row gap-3 mt-2">
            <Pressable
              onPress={onCancel}
              className="flex-1 border border-gray-300 rounded-xl py-3"
            >
              <Text className="text-center">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => onSubmit(pin)}
              className="flex-1 bg-black rounded-xl py-3"
            >
              <Text className="text-white text-center">Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
