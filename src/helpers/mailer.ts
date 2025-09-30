import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';



export const sendEmail=async({email,emailType,userId}:{email:string,emailType:string,userId:any})=>{
    try {
        console.log(`Starting email process for ${emailType} to ${email}`);
        
        // create a hash token
        const hashToken= await bcrypt.hash(userId.toString(),10);
        console.log('Hash token created successfully');
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken: hashToken ,verifyTokenExpiry:Date.now()+30*60*1000});
            console.log('User updated with verification token');
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashToken ,forgotPasswordTokenExpiry:Date.now()+30*60*1000});
            console.log('User updated with reset token');
        }

        console.log('Creating email transporter...');
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
    const mailOptions = {
        from:"vanshs2234@gmail.com",
        to: email,
        subject:emailType==="VERIFY"?"Verify your email":"Reset your password",
        html:`<p>Click <a href="${emailType==="VERIFY"?`http://localhost:3000/verifyemail?token=${hashToken}`:`http://localhost:3000/resetpassword?token=${hashToken}`}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"}
        or copy paste the link: ${emailType==="VERIFY"?`http://localhost:3000/verifyemail?token=${hashToken}`:`http://localhost:3000/resetpassword?token=${hashToken}`}</p>`
    }

    console.log('Sending email...');
    const mailresponse = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', mailresponse.messageId);
    return mailresponse;
    } catch (error:any) {
        console.error('Email sending failed:', error.message);
        console.error('Full error:', error);
        throw new Error(`Email sending failed: ${error.message}`);
    }
}