import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
    console.log("Hi");
    try{
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(reqBody,"reqBody");

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

       await sendEmail({email,emailType:'RESET',userId:user._id})

       return NextResponse.json({
        message:"Password Reset Email sent successfully",
        success:true
    })
    }catch(error:any){
        console.log(error.response.data);
        return NextResponse.json({error: error.response.data} ,{status:500})
    }
}