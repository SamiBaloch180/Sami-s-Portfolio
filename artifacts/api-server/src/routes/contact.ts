import { Router } from "express";
import nodemailer from "nodemailer";
import { SubmitContactBody } from "../../../../lib/api-zod/src/index.js";

const contactRouter = Router();

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });
}

contactRouter.post("/contact", async (req: any, res: any) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing Gmail environment variables (GMAIL_USER or GMAIL_APP_PASSWORD)");
    res.status(500).json({ error: "Email configuration is missing" });
    return;
  }

  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, message } = parsed.data;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #f8fafc; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
          <!-- Gradient Header -->
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 48px 40px; text-align: center;">
            <div style="display: inline-block; padding: 12px; background: rgba(255, 255, 255, 0.1); border-radius: 16px; margin-bottom: 20px; backdrop-filter: blur(10px);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </div>
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">New Connection!</h1>
            <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Someone reached out through your portfolio.</p>
          </div>

          <!-- Content Body -->
          <div style="padding: 40px;">
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; padding: 32px; margin-bottom: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 4px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">From Name</p>
                    <p style="margin: 0; color: #f8fafc; font-size: 18px; font-weight: 700;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 4px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</p>
                    <a href="mailto:${email}" style="margin: 0; color: #06b6d4; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message Content</p>
                    <div style="background: #1e293b; border-radius: 12px; padding: 20px; color: #e2e8f0; line-height: 1.6; font-size: 15px; white-space: pre-wrap; border-left: 4px solid #06b6d4;">${message}</div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Footer Action -->
            <div style="text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #06b6d4; color: #ffffff; padding: 16px 32px; border-radius: 14px; font-weight: 700; text-decoration: none; font-size: 16px; transition: all 0.2s ease;">Reply Directly</a>
              <p style="margin: 24px 0 0; color: #475569; font-size: 13px;">
                Sent from your portfolio website dashboard.<br>
                © ${new Date().getFullYear()} Sami Hassan. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    });
    console.info("Contact email sent");
  } catch (err) {
    console.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email" });
    return;
  }

  res.status(201).json({
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });
});

export default contactRouter;
