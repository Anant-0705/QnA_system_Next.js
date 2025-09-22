"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function profile(){
    const router=useRouter();
    const [data,setData]=useState("nothing");


    const getUserDetails=async()=>{
       const response= await axios.get("/api/users/me")
       console.log(response.data);
       setData(response.data.data.user)
    }
    const logout=async()=>{
        try {
            const response= await axios.get("/api/users/logout")
            if(response.data.success){
                toast.success(response.data.message)
                window.location.href="/login"
            }
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return(
        <div>
            <h1>Profile</h1>
            <p>Welcome to your profile page!</p>
            <h2>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={logout}           >
                Logout
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
            onClick={getUserDetails}           >
                Get User Details
            </button>
        </div>
    )
}