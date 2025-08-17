import { useState } from "react";
import { View } from "react-native";
import SafeKeyboardView from "../../components/layout/SafeKeyboardView";
import ModalPin from "../../features/transfer/components/ModalPin";
import { useTransaction } from "../../features/transfer/hooks/useTransaction";
import TransferForm from "../../features/transfer/TransferForm";

export default function TransferAmountScreen() {
  const [pinVisible, setPinVisible] = useState(false);
  const [pinResolver, setPinResolver] = useState<
    ((pin: string | null) => void) | null
  >(null);

  const { mutate, isPending } = useTransaction({
    requestPin: (pin) => {
      setPinResolver(() => pin); // save resolver
      setPinVisible(true); // show
    },
  });

  return (
    <SafeKeyboardView keyboardOffset={80}>
      <View className="flex-1 bg-white p-6">
        <TransferForm mutate={mutate} isLoading={isPending} />

        <ModalPin
          visible={pinVisible}
          onCancel={() => {
            setPinVisible(false);
            pinResolver?.(null);
          }}
          onSubmit={(pin) => {
            setPinVisible(false);
            pinResolver?.(pin);
          }}
        />
      </View>
    </SafeKeyboardView>
  );
}
