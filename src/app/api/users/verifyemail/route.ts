import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/userModel"

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {token} = reqBody;  // a front end call will be handling the sending of to the backend. Here token is the verify token
        console.log(token);
        const user = await User.findOne({verifyToken:token, // find the user with the token
            verifyTokenExpiry:{$gt:Date.now()}})
        
        if(!user){// if user is not found
            return NextResponse.json({error:"Invalid Token/User not found"},{status:400})
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save(); // save the user with the updated values in the database

        return NextResponse.json({
            message:"Email verified successfully",
            success:true
        })


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
