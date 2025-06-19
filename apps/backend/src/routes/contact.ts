import express, { Request, Response, Router } from 'express';
import nodemailer from 'nodemailer';

export const contact: Router = Router();

type ContactFormBody = {
  name: string;
  number: string;
  email: string;
  message: string;
};

contact.post('/contact', async (req: Request<{}, {}, ContactFormBody>, res: Response) => {
  const { name, number, email, message } = req.body;

  if (!name || !number || !email || !message) {
     res.status(400).json({ error: 'All fields are required' });
     return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.SMTP_USER, // your Gmail
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h3>📨 New Contact Form Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${number}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

