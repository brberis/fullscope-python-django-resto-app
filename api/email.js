import nodemailer from 'nodemailer';

const send = async (req, res) => {
  if (req.method === 'POST') {
    const { first_name, last_name, email, subject, message } = req.body;

    const SMTP_SERVER = process.env.SMTP_SERVER;
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;

    try {
        // create a transporter object to send the email
        const transporter = nodemailer.createTransport({
          host: SMTP_SERVER,
          port: 587,
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          }
        });
        const body = `
        First Name: ${first_name} 
        Last Name: ${last_name} 
        Email: ${email} 
        Message: ${message}
        `;

        // define the email options
        const mailOptions = {
          from: EMAIL_USER,
          to: EMAIL_RECIPIENT,
          subject: subject,
          text: body
        };


        // send the email
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            return error;
          }else{
            return res.status(200).json({ success: 'Form sent' });
          }
        })
      } catch (error) {
        return res
          .status(500)
          .json({ error: 'Something went wrong while sending the message' });
      }
    }

};
export default send;
