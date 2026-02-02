import { sanitize } from "./sanitize.js";

export function normalizeRecords(records) {
  return records.map(r => ({
    industry: r.properties?.industry,
    persona: r.properties?.persona,
    rawText: sanitize(
      [
        r.properties?.closed_lost_reason,
        r.properties?.challenge
      ].filter(Boolean).join(" | ")
    )
  }));
}
