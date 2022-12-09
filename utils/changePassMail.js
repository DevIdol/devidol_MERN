import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";
export const ChangePassMail = async (email, subject, text) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: "ucsk.mm@gmail.com",
        pass: "pkbcvtqmafmchxxu",
      },
    });
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "../view"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../view"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: `DevIdol 🛍️ <${process.env.USER}>`,
      to: "devidol.mm@gmail.com",
      subject: subject,
      template: "changepass",
      context: {
        title: "DevIdol Account",
        text: text,
      },
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log(`Email couldn't sent!`);
    console.log(error);
  }
};
