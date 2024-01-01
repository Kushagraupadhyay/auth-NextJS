"use client"

import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"

export default function VerifyEmailPage(){

    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false);

    const verifyUserEmail = async() => {
        try{
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true);
    
        }catch(error:any){
            setError(true);
            console.log(error.response.data);
        }
    }
    //every  useEffect automatically runs on page reload
    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]; // get the token from the url
        setToken(urlToken || "") // sets the token from url , if URL value is undefined , the value will be set to empty string
    },[]);

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ?`${token}` :"no token"}</h2>
            {verified && (  //if verifies is true then only this component will render
                <div>
                    <h2 className="text-2xl">Email verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (  //if verifies is true then only this component will render
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Email verification failed - Error</h2>
                </div>
            )}

        </div>
    )

}