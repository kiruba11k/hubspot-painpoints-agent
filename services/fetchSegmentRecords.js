import { getHubspotClient } from "../config/hubspot.js";
import { normalizeRecords } from "../utils/normalize.js";

export async function fetchSegmentRecords({
  accessToken,
  mode,
  listId,
  pipelineId,
  stages,
  limit = 200
}) {
  const hubspot = getHubspotClient(accessToken);

  let records = [];

  if (mode === "list") {
    const res = await hubspot.apiRequest({
      method: "GET",
      path: `/crm/v3/lists/${listId}/memberships/joined`,
      qs: { limit }
    });
    records = res.body.results;
  }

  if (mode === "deals") {
    const res = await hubspot.crm.deals.searchApi.doSearch({
      filterGroups: [{
        filters: [
          { propertyName: "pipeline", operator: "EQ", value: pipelineId },
          { propertyName: "dealstage", operator: "IN", values: stages }
        ]
      }],
      limit
    });
    records = res.results;
  }

  return normalizeRecords(records);
}
