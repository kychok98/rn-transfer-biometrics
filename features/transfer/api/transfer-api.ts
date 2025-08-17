import { useAccountStore } from "../../../store/useAccount";

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function processTransfer(input: {
  recipientId: string;
  amount: number;
  note?: string;
}): Promise<TransferResult> {
  const { balance, recipients } = useAccountStore.getState();
  if (input.amount > balance) {
    const err: any = new Error("INSUFFICIENT_FUNDS");
    err.code = "INSUFFICIENT_FUNDS";
    throw err;
  }

  // Simulate network latency
  await wait(600 + Math.random() * 900);

  if (input.amount === 404) {
    const e: any = new Error("NETWORK_ERROR");
    e.code = "NETWORK_ERROR";
    throw e;
  }
  if (input.amount === 500) {
    const e: any = new Error("SERVER_ERROR");
    e.code = "SERVER_ERROR";
    throw e;
  }

  const recipient = recipients.find((r) => r.id === input.recipientId)!;

  const result: TransferResult = {
    id: "tx_" + Math.random().toString(36).slice(2, 10),
    recipientId: input.recipientId,
    recipientName: recipient.name,
    amount: input.amount,
    note: input.note,
    createdAt: new Date().toISOString(),
  };
  return result;
}
