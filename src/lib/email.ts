import { Resend } from "resend";
import type { Lead } from "@/types";

const resendKey = process.env.RESEND_API_KEY;
const teamEmail = process.env.RESEND_TEAM_EMAIL || "team@agentforge.ai";

const resend = resendKey ? new Resend(resendKey) : null;

export async function sendConfirmationEmail(lead: Lead) {
  if (!resend) {
    return null;
  }

  try {
    return await resend.emails.send({
      from: "AgentForge <no-reply@agentforge.ai>",
      to: lead.email,
      subject: "Abbiamo ricevuto la tua richiesta — AgentForge",
      html: `
        <p>Ciao ${lead.name.split(" ")[0] || "Cliente"},</p>
        <p>Abbiamo ricevuto la tua richiesta e il nostro team sta iniziando la valutazione.</p>
        <p>Prossimi step:</p>
        <ul>
          <li>Verifica delle informazioni inviate</li>
          <li>Assegnazione al consulente più adatto</li>
          <li>Contatto entro 24 ore</li>
        </ul>
        <p>Grazie per aver scelto AgentForge.</p>
      `,
    });
  } catch (error) {
    console.warn("Confirmation email failed:", error);
    return null;
  }
}

export async function sendTeamNotification(lead: Lead) {
  if (!resend) {
    return null;
  }

  try {
    return await resend.emails.send({
      from: "AgentForge <no-reply@agentforge.ai>",
      to: teamEmail,
      subject: "Nuovo lead ricevuto — AgentForge",
      html: `
        <p>Nuovo lead ricevuto:</p>
        <ul>
          <li><strong>Nome:</strong> ${lead.name}</li>
          <li><strong>Email:</strong> ${lead.email}</li>
          <li><strong>Azienda:</strong> ${lead.company || "-"}</li>
          <li><strong>Interesse:</strong> ${lead.interest}</li>
          <li><strong>Score:</strong> ${lead.score}</li>
          <li><strong>Messaggio:</strong> ${lead.message || "-"}</li>
          <li><strong>Pagina:</strong> ${lead.source_page || "-"}</li>
        </ul>
      `,
    });
  } catch (error) {
    console.warn("Team notification email failed:", error);
    return null;
  }
}