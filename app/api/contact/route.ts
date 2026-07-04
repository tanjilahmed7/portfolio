import { NextResponse } from "next/server";
import { getBrevoTransport } from "@/lib/brevo";
import { site } from "@/data/site";

type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const projectType =
    typeof data.projectType === "string" ? data.projectType.trim() : "";
  const budget = typeof data.budget === "string" ? data.budget.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !email || !projectType || !budget || !message) return null;
  if (!emailPattern.test(email)) return null;
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return null;
  }

  return { name, email, projectType, budget, message };
}

export async function POST(request: Request) {
  try {
    const payload = parsePayload(await request.json());

    if (!payload) {
      return NextResponse.json(
        { error: "Please fill in all fields with valid values." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? site.email;
    const senderEmail = process.env.BREVO_SENDER_EMAIL ?? site.email;
    const senderName = process.env.BREVO_SENDER_NAME ?? `${site.name} Portfolio`;

    const transport = getBrevoTransport();

    await transport.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: `"${site.name}" <${toEmail}>`,
      replyTo: `"${payload.name}" <${payload.email}>`,
      subject: `Portfolio inquiry from ${payload.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(payload.projectType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(payload.budget)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
      `,
      text: [
        "New contact form submission",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Project type: ${payload.projectType}`,
        `Budget: ${payload.budget}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
