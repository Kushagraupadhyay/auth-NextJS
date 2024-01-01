"use client"; // convert to client side component
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation"; // use router now comes from navigation
import axios, {Axios} from "axios";
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();// create router object because we need to push the user to login page upon successfull signup
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })
    const[buttonDisabled,setButtonDisabled]=React.useState(false);
    const[loading,setLoading]=React.useState(false)

    const onLogin = async()=>{ // async function as this method will talk to database
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success",response.data);
            toast.success("Login success");
            router.push("/profile");

        }catch(error:any){
            console.log("Login failed",error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length >0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading? "Loading":"Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />
            <button 
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled?"No login":"Login here"}
            </button>
            <Link href="/signup">Visit signup page</Link>
            <br />
            <label htmlFor="forgotPassword">Forgot Password ?</label>
            <button 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                <Link href="/forgotpassword">Reset Password</Link>
            </button>
        </div>
    );
}
