import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { ser, us, emails, workerEmail, name } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ success: false, msg: "emails must be array" });
    }

    for (let email of emails) {
      await resend.emails.send({
        from: "akeraa191@gmail.com
        to: emails,
        subject: "New Form Submission",
        text: `
New Form Data:

Name: ${name}
SER: ${ser}
US: ${us}
Worker Email: ${workerEmail}

Sent automatically from backend.
        `,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Emails sent successfully"
    });

  } catch (err) {
    console.log("Email Error:", err);
    return res.status(500).json({
      success: false,
      msg: "Error sending email"
    });
  }
}
