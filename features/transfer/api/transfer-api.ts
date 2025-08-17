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
    const e: any = new Error("INSUFFICIENT_FUNDS");
    e.code = "INSUFFICIENT_FUNDS";
    throw e;
  }

  // Simulate NETWORK_ERROR
  if (input.amount === 504) {
    const e: any = new Error("NETWORK_ERROR");
    e.code = "NETWORK_ERROR";
    throw e;
  }

  // Simulate SERVER_ERROR
  if (input.amount === 500) {
    const e: any = new Error("SERVER_ERROR");
    e.code = "SERVER_ERROR";
    throw e;
  }

  const result: TransferResult = {
    id: "tx_" + Math.random().toString(36).slice(2, 10),
    recipientId: input.recipientId,
    recipientName: input.recipientName,
    amount: input.amount,
    note: input.note,
    createdAt: new Date().toISOString(),
  };
  return result;
}
