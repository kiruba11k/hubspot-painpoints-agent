export function normalizeRecords(records) {
  return records.map(r => ({
    dealName: r.properties?.dealname,
    amount: r.properties?.amount,
    winLossReason: r.properties?.closed_lost_reason,
    persona: r.properties?.persona,
    jobTitle: r.properties?.jobtitle,
    industry: r.properties?.industry,
    challenge: r.properties?.challenge || "",
    rawText: [
      r.properties?.closed_lost_reason,
      r.properties?.challenge
    ].filter(Boolean).join(" | ")
  }));
}
