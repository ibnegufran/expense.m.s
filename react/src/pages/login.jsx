import React, { useState,useRef,useEffect } from 'react'

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link,useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import axios from "axios"
        
const Login = () => {
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const toast=useRef(null)
const [error,setError]=useState();

const navigate=useNavigate();


// console.log(name)
useEffect(()=>{
    if(localStorage.getItem("user")){
        navigate("/dash")
    }
},[navigate])


//   toast.current.show({ severity: 'info', summary: 'Info', detail:"error" })
const handleSubmit=async(value)=>{

    try {
        
        value.preventDefault();
        const {data}=await axios.post("https://expense-m-s-1.onrender.com/auth/login",{email,password})
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'login successfully' })
        localStorage.setItem("user",JSON.stringify({...data,password:''}))
        setTimeout(()=>{

            navigate("/dashboard");
        },1500)
    }
     catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail:"please check your email and password" })
        
    }
   
}




  return (
<>
<div className="container-fluid px-5 bg-gray-900">
    <div className="row d-flex justify-content-center align-items-center " style={{height:'100vh'}}>
        <div className="col col-md-5 p-4  shadow-md rounded text-center bg-gray-600">
        <Toast ref={toast} pt={{ message: "p-2", icon: "mx-4" }} />
            <h1 className='text-gray-100'>Login</h1>

            <form onSubmit={handleSubmit}>
            <InputText placeholder='enter your email ' type='email'  onChange={(e)=>setEmail(e.target.value)} className='col-12 p-2' pt={{root:'my-4'}}/>
            <InputText placeholder='enter your password' type='password'  onChange={(e)=>setPassword(e.target.value)} className='col-12 p-2' pt={{root:'my-4'}}/>
            <Button className='rounded px-4 fs-6 text-capitalize fw-bold py-1' >Sign in </Button>
            </form>
            <p className='mt-4 fs-6 text-capitalize text-gray-100'>don't have an account ? <Link to="/register" className='text-info my-4'>register </Link></p>
        </div>
    </div>
</div>

</>
)
}

export default Login