import { create } from "zustand";

type State = {
  balance: number;
  transactions: TransferResult[];
  debit: (amount: number) => void;
  addTransaction: (tx: TransferResult) => void;
};

export const useAccountStore = create<State>((set) => ({
  balance: 10000,
  transactions: [],
  debit: (amount) => set((s) => ({ balance: Math.max(0, s.balance - amount) })),
  addTransaction: (tx) =>
    set((s) => ({ transactions: [tx, ...s.transactions] })),
}));
