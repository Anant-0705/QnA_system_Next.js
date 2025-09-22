import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import Users from "../../../../models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";
connectToDatabase();


export async function GET(req:NextRequest){
    try {
        const reqUserId = await getDataFromToken(req);
        const user=await Users.findById(reqUserId).select("-password ");
        return NextResponse.json({
            message:"User Found",
            data:user

        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}