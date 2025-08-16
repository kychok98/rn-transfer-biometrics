import { create } from "zustand";

const seedRecipients: Recipient[] = Array.from({ length: 1000 }).map((_, i) => {
  return {
    id: `r${i + 1}`,
    name: `Recipient ${i + 1}`,
    account: `12-34-${(100000 + i).toString()}`,
  };
});

type State = {
  balance: number;
  recipients: Recipient[];
  transactions: TransferResult[];
  debit: (amount: number) => void;
  addTransaction: (tx: TransferResult) => void;
};

export const useAccountStore = create<State>((set) => ({
  balance: 10000,
  recipients: seedRecipients,
  transactions: [],
  debit: (amount) => set((s) => ({ balance: Math.max(0, s.balance - amount) })),
  addTransaction: (tx) =>
    set((s) => ({ transactions: [tx, ...s.transactions] })),
}));
