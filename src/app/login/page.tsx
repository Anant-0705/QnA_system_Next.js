"use client";
import Link from "next/link";
import React from "react";
import  {useRouter} from "next/navigation";
import axios from "axios";

import toast from "react-hot-toast";

export default function loginpage() {
   const router=useRouter();
  const [user,setUser]=React.useState({
    email:"",
    password:"",
  
  })

  const[buttonDisabled,setButtonDisabled]=React.useState(false);
  const[loading,setLoading]=React.useState(false);
  
  
  
  const onLogin=async()=>{
    try {
      const response = await axios.post("/api/users/login",user);
      if(response.data.success){
        toast.success("Login successful");
        router.push("/profile")
      }
    } catch (error:any) {
      console.log("Unable to login",error.message);
      toast.error("Login failed");
    }finally{
      setLoading(false);
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
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          type="button"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: buttonDisabled ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: buttonDisabled ? 'not-allowed' : 'pointer',
            marginBottom: '15px'
          }}      >
          {loading?"Loading...":"Login"}
        </button>
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

