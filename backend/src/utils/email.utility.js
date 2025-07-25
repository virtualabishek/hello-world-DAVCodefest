import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
    }, secure: false,
  port:587
});

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} heading - Email heading (for plain text emails)
 * @param {string} text - Email body (for plain text emails)
 * @param {string} html - Optional: HTML content instead of plain text
 */
export const sendEmail = async ({ to, subject, heading, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: html ? null : `**${heading}**\n\n${text}`,
      html: html || null, 
    };

    const info =  transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

