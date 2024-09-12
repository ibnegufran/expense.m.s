import React, { useRef, useState,useEffect } from 'react'

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link,useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import axios from "axios"
import Spinner from '../components/spinner';

const Register = () => {
    const navigate=useNavigate();
const [name,setName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const toast=useRef(null)
const [loading,setLoading]=useState(false);

// console.log(name)

useEffect(()=>{
    if(localStorage.getItem("user")){
        navigate("/")
    }
},[navigate])
const handleSubmit=async(value)=>{
    try {
    value.preventDefault();
    setLoading(true);
        
  let send= await axios.post("https://expense-m-s-1.onrender.com/auth/register",{name,email,password})
  setLoading(false);

  console.log(send);
  setTimeout(()=>{

    navigate("/login");
},1500)
  toast.current.show({ severity: 'info', summary: 'Info', detail: 'register successfully' })

    } catch (error) {
    setLoading(false);

        throw new Error(error)
    }
   
}




  return (
<>
<Toast ref={toast} pt={{ message: "p-2", icon: "mx-4" }} />
<div className="container-fluid px-5 bg-gray-900">
    <div className="row d-flex justify-content-center align-items-center " style={{height:'100vh'}}>
        {/* {loading && <Spinner />} */}
        <div className="col col-md-5 p-4  shadow-sm rounded text-center bg-gray-600">
            <h1 className='text-gray-100'>Register</h1>
         
            <form onSubmit={handleSubmit}>
            <InputText placeholder='enter your name '   onChange={(e)=>setName(e.target.value)} type='text' className=' col-12 p-2' pt={{root:'my-4'}}/>
            <InputText placeholder='enter your email ' type='email'  onChange={(e)=>setEmail(e.target.value)} className=' col-12 p-2' pt={{root:'my-4'}}/>
            <InputText placeholder='enter your password' type='password'  onChange={(e)=>setPassword(e.target.value)} className=' col-12 p-2' pt={{root:'my-4'}}/>
            <Button className='rounded px-4 fs-6 text-capitalize fw-bold py-1'>register</Button>
            </form>
            <p className='mt-4 fs-6 text-capitalize text-gray-100'>already have account <Link to="/login" className='text-info my-4'>sign in </Link></p>
        </div>
    </div>
</div>

</>
)
}

export default Register