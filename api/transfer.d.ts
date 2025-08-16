type Recipient = {
  id: string;
  name: string;
  account: string;
};

type TransferResult = {
  id: string;
  recipientId: string;
  recipientName: string;
  amount: number;
  note?: string;
  createdAt: string;
};
