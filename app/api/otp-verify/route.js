import connectDb from "@/lib/connectdb";
import sendmail from "../mail/sendmail";
import otpmodel from "@/models/otpmodel";
import usermodel from "@/models/usermodel";
import argon2 from "argon2";
export async function POST(req) {
    await connectDb();
    const { email } = await req.json();
    if (!email) {
        return new Response(JSON.stringify({ msg: "Email required" }), { status: 400 });
    }
    try {
        const userexists = await usermodel.findOne({email});
        const otpexists = await otpmodel.findOne({email});
        if(otpexists){
            return new Response(JSON.stringify({msg : "Retry after sometime"}) , {status : 401});
        }
        if(userexists){
            return new Response(JSON.stringify({msg : "User already exists"}) , {status : 401});
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
         await sendmail(email, otp);
         const hashedotp = await argon2.hash(otp.toString());
        await otpmodel.create({
            otp :hashedotp,
            email : email 
        });
        return new Response(JSON.stringify({ msg: "OTP sent successfully", otpSent: true }), { status: 200 });
    } catch (error) {
        console.error("Failed to send OTP:", error);
        return new Response(JSON.stringify({ msg: "Failed to send OTP" }), { status: 500 });
    }
}
