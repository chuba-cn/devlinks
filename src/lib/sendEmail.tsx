import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import VerificationEmail from '@/components/emails/VerificationEmail';

interface SendVerificationEmailProps {
  to: string;
  verificationUrl: string;
}

export async function sendVerificationEmail({ to, verificationUrl }: SendVerificationEmailProps) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHtml = render(<VerificationEmail verificationUrl={verificationUrl} />);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify your email address',
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.log(error)
  }
}
