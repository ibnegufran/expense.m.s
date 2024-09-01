import { Button } from 'primereact/button'
import React, { useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { DashContext, MenuContext, ToggleContext, VisibleContext } from '../context/context';


const Sidebar = () => {
  const {dash,setDash}=useContext(DashContext);

  const {visible,setVisible}=useContext(VisibleContext);
const {toggle,setToggle}=useContext(ToggleContext);
const   navigate=useNavigate();
const logoutHandler=()=>{
  localStorage.removeItem("user")
 navigate('/login')
}
const {menu,setMenu}=useContext(MenuContext);

  return (
    <div className={`sidebar col-12 z-2 col-md-2  bg-gray-900 ${menu ? "left-0" :""} h-screen py-6 px-4 text-left flex flex-column justify-content-between align-items-start`}>
      <span className='pi pi-times fs-4 absolute d-inline-block d-md-none top-8 right-0 me-4 text-white' onClick={()=>setMenu(!menu)}></span>
        <div className="">
        <h1 className='text-yellow-500 text-uppercase fs-1 fst-italic  text-left mb-4'>frais</h1>
    <div className={`cursor-pointer w-12  py-2 px-2 rounded-2 mb-3 ${toggle === "dashboard" ?  "bg-yellow-500 text-gray-00" :"bg-transparent text-white" }`} onClick={()=>{
      setToggle("dashboard")
      setDash(true)
      setMenu(false)

    }}><span className='pi pi-home  fs-5 mr-2'></span><Link to="/dashboard" className={`text-decoration-none  fs-5 text-capitalize  ${toggle === "dashboard" ? " text-gray-900" : "text-white"}`}>dashboard</Link></div>

    <div className={`cursor-pointer w-12  py-2 px-2 rounded-2 mb-3 ${toggle === "analysis" ?  "bg-yellow-500 text-gray-900" :"bg-transparent text-white" }`} onClick={()=>{
      setToggle("analysis")
      setDash(false)
      setMenu(false)

    }}><span className='pi pi-chart-bar  fs-5 mr-2' ></span><Link to="/dashboard" className={`text-decoration-none  fs-5 text-capitalize  ${toggle === "analysis" ? " text-gray-900" : "text-white"}`}>analysis</Link></div>

    <div className={ `flex justify-content-start align-items-center cursor-pointer w-12  py-2 px-2 rounded-2 mb-3 ${toggle === "table" ? "bg-yellow-500 text-gray-900" : "bg-transparent text-white"}`}  onClick={()=>{setToggle("table")
        setMenu(false)
    }
    }><span className='pi pi-table  fs-5 mr-2'></span><Link to="/dashboard" className={`text-decoration-none  fs-5 text-capitalize  ${toggle === "table" ? " text-gray-900" : "text-white"}`}>table</Link></div>

   
    </div>
    <div className="action-buttons float-bottom">
        <Button className='bg-yellow-500 col-12 fs-6 px-4 fw-bold border-0 text-gray-900 rounded-5 text-capitalize outline-none' onClick={() => {
            setVisible(true);
          }}><span className='pi pi-plus fw-bold mr-2'></span>add transaction</Button>
        <Button className='bg-red-500 col-12 fs-6 px-4 fw-bold border-0 text-white rounded-5 text-capitalize my-3' onClick={logoutHandler}><span className='pi pi-minus fw-bold mr-2' ></span>logout</Button>
    </div>
        
    </div>
  )
}

export default Sidebar