// seed data
const seedRecipients: Recipient[] = Array.from({ length: 1000 }).map((_, i) => {
  return {
    id: `r${i + 1}`,
    name: `Recipient ${i + 1}`,
    account: `12-34-${(100000 + i).toString()}`,
  };
});

export async function fetchRecipientsApi(): Promise<Recipient[]> {
  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // simulate occasional API error (e.g. 10% chance)
  if (Math.random() < 0.1) {
    throw new Error("NETWORK_ERROR");
  }

  return seedRecipients;
}
