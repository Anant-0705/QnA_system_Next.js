import {connectToDatabase} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try{
        await connectToDatabase();
        
        const reqbody=await request.json();
        const{email,password}=reqbody;
        console.log(reqbody);
        
        // Check if user exists in database
        const user= await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({error:"Invalid credentials"},{status:400});
        }

        // create token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email

        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn:"1h"});
        const  response=NextResponse.json({
            message:"User logged in successfully",
            success:true,
            
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response;
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500});
    }
} 