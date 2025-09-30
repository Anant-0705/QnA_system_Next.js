
import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";


connectToDatabase();

export async function verifyEmail(req: NextRequest) {

    try {
        const reqBody=await req.json();
        const { token } = reqBody;
        const user= await User.findOne({verifyToken: token, verifyTokenExpiry: { $gt: Date.now() }});
        if(!user){
            return NextResponse.json({message:"Invalid or expired token",success:false},{status:400});
        }

        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry= undefined;
        await user.save();
     


        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500});
    }
    
}