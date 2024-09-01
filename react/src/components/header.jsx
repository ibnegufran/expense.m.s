import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

 const   navigate=useNavigate();
const logoutHandler=()=>{
    localStorage.removeItem("user")
   navigate('/login')
}
  return (
  <>
  
        <div className="header col-12  overflow-hidden position-relative" style={{height:'8vh'}}>
        <h1 className='text-yellow-500 mt-3 text-uppercase fs-1 fs-md-2 fst-italic ml-md-8 '>frais</h1>
        <div className="right mr-0 mr-md-8" >
        <ul className='list-unstyled d-none d-md-inline-flex mb-0 ' >
            <li><Link className='text-white mx-3 text-decoration-none text-capitalize '>home</Link></li>
            <li><Link className='text-white mx-3 text-decoration-none text-capitalize '>about</Link></li>
            <li><Link className='text-white mx-3 text-decoration-none text-capitalize '>contact</Link></li>
           

        </ul>
        
{/* */}

    {/* <button className='bg-danger px-4 py-1 border-0 text-white fs-6 rounded-5 text-capitalize fw-bold mx-4' onClick={logoutHandler}>logout</button> */}

    <button className='bg-yellow-500 px-4 py-1 border-0 text-white fs-6 rounded-5 text-capitalize ' onClick={logoutHandler}>login</button>

</div>
  </div>
  </>
  )
}

export default Header