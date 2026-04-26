import { Client } from "@hubspot/api-client";
import type { Lead } from "@/types";

const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

export async function createHubSpotContact(lead: Lead) {
  if (!hubspotToken) {
    return null;
  }

  const client = new Client({ accessToken: hubspotToken });
  const [firstname, ...rest] = lead.name.trim().split(" ");
  const lastname = rest.join(" ") || "";

  try {
    const contactData = {
      properties: {
        firstname,
        lastname,
        email: lead.email,
        company: lead.company || "",
        ai_interest: lead.interest,
        lead_score: lead.score.toString(),
        source_page: lead.source_page || "",
      },
    };

    const response = await client.crm.contacts.basicApi.create(contactData);
    return response;
  } catch (error) {
    console.warn("HubSpot contact creation failed:", error);
    return null;
  }
}