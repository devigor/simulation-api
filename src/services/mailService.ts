import * as dotenv from 'dotenv';
dotenv.config();
import * as nodemailer from 'nodemailer';

export type SendEmailProps = {
  to: string;
  subject: string;
  text: string;
  pdfPath: string;
  filename: string;
}

export const transporder = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = async (content: SendEmailProps) => {
  try {
  const { pdfPath, to, subject, text, filename } = content;

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_SENDER,
    to, subject, text,
    attachments: [
      {
        filename,
        path: pdfPath,
        contentType: 'application/pdf'
      }
    ]
  }

  await transporder.sendMail(mailOptions);
  } catch(e) {
    console.log(e)
  }
}
