import type { Lead } from "@/types";

const slackWebhook = process.env.SLACK_WEBHOOK_URL;

export async function sendLeadNotification(lead: Lead) {
  if (!slackWebhook) {
    return null;
  }

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Nuovo Lead",
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Nome:* ${lead.name}`,
        },
        {
          type: "mrkdwn",
          text: `*Azienda:* ${lead.company || "-"}`,
        },
        {
          type: "mrkdwn",
          text: `*Interesse:* ${lead.interest}`,
        },
        {
          type: "mrkdwn",
          text: `*Score:* ${lead.score}`,
        },
        {
          type: "mrkdwn",
          text: `*Email:* ${lead.email}`,
        },
      ],
    },
  ];

  if (lead.score > 80) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":fire: *Lead caldo!*",
      },
    });
  }

  try {
    const response = await fetch(slackWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.warn("Slack notification failed:", error);
    return null;
  }
}