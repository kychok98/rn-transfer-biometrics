type Recipient = {
  id: string;
  name: string;
  account: string;
};

type TransferResult = {
  id: string;
  recipientAccount: string;
  recipientName: string;
  amount: number;
  note?: string;
  createdAt: string;
};

interface InputTransfer {
  recipientAccount: string;
  recipientName: string;
  amount: number;
  note?: string;
}
