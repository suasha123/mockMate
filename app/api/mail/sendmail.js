import transporter from "@/lib/mailconfig";
async function sendmail(email , otp) {
    const mailOptions = {
    from: '"mockMate OTP" <suryaprataps471@gmail.com>',
    to: email,
    subject: "Verify your account",
    html: `
      <div style="
        background: linear-gradient(135deg, #11accbff 0%, #2575fc 100%);
        padding: 40px;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        border-radius: 10px;
      ">
        <h2 style="margin-bottom: 20px;">Welcome to mockMate!</h2>
        <p style="font-size: 18px;">Your One Time Password (OTP) is:</p>
        <h1 style="font-size: 48px; color : white; letter-spacing: 5px;">${otp}</h1>
        <p style="margin-top: 20px;">Please use this to verify your email.</p>
      </div>
    `
  };
    return transporter.sendMail(mailOptions);
}
export default sendmail;