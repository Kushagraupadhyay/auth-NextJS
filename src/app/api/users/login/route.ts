import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(request.body)

        // check if the user already exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:'User does not exist'},
            {status:400})
        }

        // check if the password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:'Enter valid password'},{status:400})
        }
        // we encrypt the json web token JWT.JWT is not set in local storage otherwise use will be able to manipulate that, the JWT token is set in cookie by the server
        // the cookie contains user related payload like user ID as well along with JWT

        // create token data
        const tokenData = {
            id: user._id, //in the DB the id is stored as _id
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        // JWT.sign() method takes in the payload, secret and options as parameters to create a signed token

        const response = NextResponse.json({
            message:'Login Successful',
            success:true
        })
        
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        // set cookie with userdata and jwt

        return response


    }catch(error:any){
        return NextResponse.json({error:error.messafe},{status:500})
    }
}