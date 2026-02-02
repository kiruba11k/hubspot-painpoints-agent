import Hubspot from "@hubspot/api-client";

export const getHubspotClient = (accessToken) => {
  return new Hubspot.Client({ accessToken });
};
