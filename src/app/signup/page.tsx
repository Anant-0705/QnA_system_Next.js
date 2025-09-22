"use client";
import Link from "next/link";
import React from "react";
import  {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

 


export default function signupage() {
  const router=useRouter();

  const [user,setUser]=React.useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled,setButtonDisabled]=React.useState(false);
  const onSignup =async()=>{
      setButtonDisabled(true);
      try {
          const response=await axios.post("/api/users/signup",user);
          if(response.data.success){
              toast.success("Account created successfully!");
              router.push("/login");
          }
          console.log("User signed up successfully",response.data);
      } catch (error:any) {
          console.error("Error signing up:",error);
          toast.error(error.response?.data?.error || "Signup failed");
      } finally {
          setButtonDisabled(false);
      }
  }
  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup Page</h1>
      <form>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Username:
        <input 
        type="text" 
        name="username"
        value={user.username} 
        onChange={(e)=>setUser({...user,username:e.target.value})}
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '5px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Email:
        <input 
        type="email" 
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
        Password:
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
        onClick={onSignup}
        type="button"
        disabled={buttonDisabled}
        style={{
        width: '100%',
        padding: '10px',
        backgroundColor: buttonDisabled ? '#ccc' : '#007cba',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: buttonDisabled ? 'not-allowed' : 'pointer',
        marginBottom: '10px'
        }}
      >
        {buttonDisabled ? 'Creating Account...' : 'Signup'}
      </button>   
      </form>
      <Link href="/login" style={{ display: 'block', textAlign: 'center', color: '#007cba' }}>
      Go to Login
      </Link>
    </div>
  );
}
