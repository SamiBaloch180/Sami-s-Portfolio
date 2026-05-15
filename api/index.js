const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { z } = require("zod");

// Redefine the schema here to avoid workspace import issues
const SubmitContactBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

router.post("/contact", async (req, res) => {
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Missing Gmail environment variables");
    return res.status(500).json({ error: "Email configuration is missing" });
  }

  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { name, email, message } = parsed.data;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h3>New message from ${name}</h3><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    console.info("Contact email sent");
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.use("/api", router);
app.use("/", router);

module.exports = app;
