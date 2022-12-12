import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";

const Email = (options) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  var transpoter = nodemailer.createTransport({
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

  transpoter.use("compile", hbs(handlebarOptions));
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const EmailSender = ({ name, email, message }) => {
  const options = {
    from: `DevIdol 👨‍💻 <${email}>`,
    to: "devidol.mm@gmail.com",
    subject: `Message From ${email}`,
    template: "contactmail",
    context: {
      name: name,
      email: email,
      message: message,
    },
  };

  Email(options);
};

export default EmailSender;
