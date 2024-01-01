"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

    const [email,setEmail] = useState('');
    const router = useRouter();

    const onResetPassword = async() => {
        try{
            const response = await axios.post("/api/users/forgotpassword",{email});
            console.log("Reset password email function triggered",response.data);
            router.push("/resetpassword")
        }catch(error:any){
            console.log("Reset password failed",error.response.data);
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>Forgot Password</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            disabled={email.length === 0}
            onClick={onResetPassword}
            >
                Reset Password
            </button>
        </div>
    )
}