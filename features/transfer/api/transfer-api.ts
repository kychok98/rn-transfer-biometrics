import { API_ERROR } from "../constants/errors";

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function processTransfer(
  input: InputTransfer,
): Promise<TransferResult> {
  // Simulate network latency
  await wait(600 + Math.random() * 900);

  // Simulate INSUFFICIENT_FUNDS
  if (input.amount === 404) {
    throw new Error(API_ERROR.INSUFFICIENT_FUNDS);
  }

  // Simulate NETWORK_ERROR
  if (input.amount === 500) {
    throw new Error(API_ERROR.NETWORK_ERROR);
  }

  const result: TransferResult = {
    id: "tx_" + Math.random().toString(36).slice(2, 10),
    recipientAccount: input.recipientAccount,
    recipientName: input.recipientName,
    amount: input.amount,
    note: input.note,
    createdAt: new Date().toISOString(),
  };
  return result;
}
