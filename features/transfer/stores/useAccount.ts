import { create } from "zustand";

type State = {
  balance: number;
  debit: (amount: number) => void;
};

export const useAccountStore = create<State>((set) => ({
  balance: 10000,
  debit: (amount) => set((s) => ({ balance: Math.max(0, s.balance - amount) })),
}));
