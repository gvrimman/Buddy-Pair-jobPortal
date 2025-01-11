const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const nodemailer = require("nodemailer");
const validator = require("validator");

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const SendContactForm = asyncHandler(async (req, res) => {
  let { name, email, message } = req.body;

  // Sanitize inputs
  name = validator.escape(name); // Escapes special characters like <, >, & to avoid XSS
  email = validator.normalizeEmail(email); // Normalizes email format
  message = validator.escape(message); // Escapes special characters

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // Send email to the owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // Send confirmation email to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us!",
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nBuddy Pair Team`,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
});

module.exports = {
  SendContactForm,
};
