//import {connect} from '../../../dbConfig/dbConfig.ts';
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect(); // this will connect to the database

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();// The request.json() method is asynchronous because it returns a Promise that resolves with the result of parsing the body text as JSON
        const {username,email,password} = reqBody;// this will get the username, email and password from the request body
        console.log(reqBody);

        // check of the user already exists

        const user = await User.findOne({email}) //The { email } syntax is shorthand for { email: email }
        if(user){
            return NextResponse.json({error:'User already exists'},
            {status:400})
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        // create a new user
        const newUser = new User({
            username,
            email,
            password :hashedPassword,
        })

        // save the user
        const savedUser = await newUser.save();
        console.log(savedUser);

        //send the user a verification email
        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({
            message:'User created successfully',
            success: true,
            savedUser            
        })


    }catch(error:any){
        return NextResponse.json({error: error.message},{status: 500})
    }
}
