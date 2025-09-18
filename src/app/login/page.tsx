"use client";
import Link from "next/link";
import React from "react";
import  {useRouter} from "next/navigation";
import axios from "axios";
import router from "next/dist/shared/lib/router/router";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function loginpage() {
   const router=useRouter();
  const [user,setUser]=React.useState({
    email:"",
    password:"",
  
  })

  const[buttonDisabled,setButtonDisabled]=React.useState(false);
  const[loading,setLoading]=React.useState(false);
  const onLogin =async()=>{
    setButtonDisabled(true);
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login', user);
      if(response.data.success){
        toast.success("User logged in successfully");
        router.push('/profile');
        console.log("User logged in successfully",response.data);
      }
    } catch (error:any) {
      console.error("Error logging in:", error.message);
      toast.error(error.message);
    }
    finally{
      setButtonDisabled(false);
      setLoading(false);''
    }

  }
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Login Page</h1>
      <form>
        <label style={{ display: 'block', marginBottom: '15px' }}>
            Email
          <input 
            type="text" 
            name="email" 
            value={user.email} 
            onChange={(e)=>setUser({...user,email:e.target.value})}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }} 
          />
        </label>
        <label style={{ display: 'block', marginBottom: '15px' }}>
          Password
          <input 
            type="password" 
            name="password" 
            value={user.password} 
            onChange={(e)=>setUser({...user,password:e.target.value})}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }} 
          />
        </label>
        <Link
          href="/profile"
          onClick={onLogin}
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}      >
          {loading?"Loading...":"Login"}
        </Link>
      </form>
      <Link 
        href="/signup"
        style={{ 
          display: 'block', 
          textAlign: 'center', 
          color: '#007bff', 
          textDecoration: 'none' 
        }}
      >
        Go to Signup
      </Link>
    </div>
  );
}

