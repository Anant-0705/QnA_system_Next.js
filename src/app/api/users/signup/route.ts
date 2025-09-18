import {connectToDatabase} from "@/dbConfig/dbConfig";
import Users from "../../../../models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/userModel";


connectToDatabase();


export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const{username,email,password}=reqBody
        console.log(reqBody);
        // check if user already exists
        const user=await Users.findOne({email});
        if(user){
            return NextResponse.json({error:"user already exists"},{status:400})

            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            const newUser=new user({
                username,
                email,
                password: hashedPassword
            })
            const savedUser=await newUser.save()
            console.log(savedUser);
            return NextResponse.json({
                message:"User created successfully",
                success:true,
                savedUser
            })
        }
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}