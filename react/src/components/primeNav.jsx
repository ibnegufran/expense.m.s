import React, { useEffect, useState } from 'react'

import 'primeicons/primeicons.css';
        
// import { Menubar } from 'primereact/menubar';
        
const Nav = () => {

const [username,setUsername]=useState('');
useEffect(()=>{
  let user=JSON.parse(localStorage.getItem("user"));
  if(user){
    setUsername(user);
  }
},[])
  const items = [
    {
        label: 'Home',
        
        
    },
    {
        label: 'Features',
        
    },
    {
      label: 'about',
      
  },   {
    label: 'contact',
    
},

  ]

const start=<h1 className='text-white text-uppercase fs-2 fst-italic mx-4'>frais</h1>;
const end=(
  <div className="me-5">
<i className='pi pi-user d-inline-block text-white fs-5 mx-2'></i>
<p  className='text-white fs-5 mx-2 d-inline-block'>{username && username.name}</p>
</div>
);


  return (
<>
<div className="card border-0 d-md-flex justify-content-md-around">
            <Menubar model={items} className='border-0 bg-primary navbar'  start={start} end={end} pt={{root:'border-0 rounded-0  ',
              label:'text-white mx-3 navItem',
              menu:'ul',
              start:"  d-flex align-items-center h-full pt-2 me-4",
              end:"  d-flex align-items-center h-full pt-2 ms-4",
              content:"text-decoration-none",
              button:'text-white bg-primary',
              seperator:""

              // menuitem:'text-md-black'
            }}/>
        </div>
</>

)
}

export default Nav