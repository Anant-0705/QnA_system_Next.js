"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
export default function profile(){

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
            <hr />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={logout}           >
                Logout
            </button>
        </div>
    )
}