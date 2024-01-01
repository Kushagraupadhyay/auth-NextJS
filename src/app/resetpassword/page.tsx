"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ResetPasswordPage() {

    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmPassword] = useState("");
    const[buttonDisabled,setButtonDisabled] = useState(false);
    const[error,setError] = useState(false);
    const[token,setToken] = useState("");
    const[success,setSuccess] = useState(false);

    const onChangePassword = async() => {
        try{
            const resopnse = await axios.post("/api/users/updatepassword",{token,password});
            console.log("Password changed",resopnse.data);
            setSuccess(true);
        }catch(error:any){
            console.log(error);
            setError(true);            
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");//if urlToken is undefined this will, set it to empty string
    },[]);

    useEffect(()=>{
        if(password !== confirmpassword){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    },[password,confirmpassword]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>Reset Password</h1>
            <hr />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            />
            <label htmlFor="password">confirm password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="confirmpassword"
            type="password"
            value={confirmpassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            />
            <button 
            onClick={onChangePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled ? "Both passwords must match"  : "Change password"}
            </button>
            { success && (
                <div>
                <h2 className="text-2xl">Password Changed</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
            )}
            {error && (
                <div>
                <h2 className="text-2xl">Password change failed : Error</h2>
                </div>
            )}
        </div>

    )
}