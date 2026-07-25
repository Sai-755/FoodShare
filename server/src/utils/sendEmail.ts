import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASSWORD,

  },

});



export async function sendEmail(
  to: string,
  subject: string,
  message: string
) {

  await transporter.sendMail({

    from: {
      name: "FoodShare",
      address: process.env.EMAIL_USER as string,
    },

    to,

    subject,

    text: message,

    html: `
      <div style="
        font-family:Arial;
        padding:30px;
        background:#f7faf8;
      ">

        <div style="
          max-width:500px;
          margin:auto;
          background:white;
          padding:30px;
          border-radius:20px;
        ">

          <h2 style="color:#047857">
            FoodShare
          </h2>

          <p>
            ${message}
          </p>

          <p style="color:#64748b">
            Together, we reduce food waste and help communities.
          </p>

        </div>

      </div>
    `,

  });

}