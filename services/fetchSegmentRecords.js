import { getHubspotClient } from "../config/hubspot.js";
import { normalizeRecords } from "../utils/normalize.js";

const MAX_SAMPLE = 200;

export async function fetchSegmentRecords({
  accessToken,
  mode,
  listId,
  pipelineId,
  stages,
  limit = MAX_SAMPLE
}) {
  const hubspot = getHubspotClient(accessToken);
  const safeLimit = Math.min(limit, MAX_SAMPLE);

  let records = [];

  if (mode === "deals") {
    const res = await hubspot.crm.deals.searchApi.doSearch({
      limit: safeLimit,
      filterGroups: [{
        filters: [
          { propertyName: "pipeline", operator: "EQ", value: pipelineId },
          { propertyName: "dealstage", operator: "IN", values: stages }
        ]
      }]
    });
    records = res.results;
  }

  return normalizeRecords(records);
}
