import nodemailer from "nodemailer";

export async function sendNoReplyMail({
  sendTo,
  subject,
  html,
  fromName = "Anix7",
}: {
  sendTo: string;
  subject: string;
  html: string;
  fromName?: string;
}) {
  if (!sendTo || !subject || !html) {
    console.error("Missing Parameters in sendMail");
    return { success: false, error: "Missing required parameters" };
  }

  const SMTP_SERVER_HOST = process.env.EMAIL_HOST;
  const SMTP_SERVER_USERNAME = process.env.NO_REPLY_EMAIL;
  const SMTP_SERVER_PASSWORD = process.env.EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
  });

  try {
    // Verify SMTP connection
    await transporter.verify();

    // Send email
    const info = await transporter.sendMail({
      from: `"${fromName}" <${SMTP_SERVER_USERNAME}>`,
      to: sendTo,
      subject: subject,
      html: html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);

    let errorMessage = "Something went wrong while sending the email.";

    // Narrow unknown → object
    if (typeof error === "object" && error !== null) {
      const maybeErr = error as { responseCode?: number; message?: string };

      if (maybeErr.responseCode === 550) {
        errorMessage = "Invalid recipient email address.";
      } else if (maybeErr.responseCode === 535) {
        errorMessage = "Authentication failed. Check SMTP credentials.";
      } else if (maybeErr.message?.includes("getaddrinfo ENOTFOUND")) {
        errorMessage = "SMTP server not found. Check EMAIL_HOST.";
      }
    }

    return { success: false, error: errorMessage };
  }
}
