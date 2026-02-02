import Hubspot from "@hubspot/api-client";

export const getHubspotClient = (accessToken) =>
  new Hubspot.Client({ accessToken });
