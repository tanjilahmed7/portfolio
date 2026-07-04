import nodemailer from "nodemailer";

export function getBrevoTransport() {
  const smtpKey = process.env.BREVO_SMTP_KEY;
  const smtpLogin = process.env.BREVO_SMTP_LOGIN;

  if (!smtpKey || !smtpLogin) {
    throw new Error("BREVO_SMTP_KEY and BREVO_SMTP_LOGIN must be configured");
  }

  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: smtpLogin,
      pass: smtpKey,
    },
  });
}
