import React, { useState } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import 'bootstrap/dist/css/bootstrap.css';
// import './custom.css';
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/register';
import Login from './pages/login';
import Front from './pages/front';
import Dashboard from './pages/dashboard';
import { ToggleContext, VisibleContext,DatesContext, DashContext, EditContext, MenuContext } from './context/context';
import Loader from './components/loader';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
const App = () => {
  const [visible, setVisible] = useState(false);
  const [toggle,setToggle]=useState("dashboard");
  const [days,setDays]=useState("7");
  const [dash,setDash]=useState("total")
  const [editable,setEditable]=useState(null); 
  ; 
const [loader,setLoader]=useState(true);
const [menu,setMenu]=useState(false);

  
  return (
<>
{/* {loader && <Loader /> } */}
<VisibleContext.Provider value={{visible,setVisible}}>
  <ToggleContext.Provider value={{toggle,setToggle}}>
    <DatesContext.Provider value={{days,setDays}}>
      <DashContext.Provider value={{dash,setDash}}>
        <EditContext.Provider value={{editable,setEditable}}>
          <MenuContext.Provider value={{menu,setMenu}}>
    <Routes>
  <Route path='/' element={<Front />}></Route>
  <Route path='/about' element={<About />}></Route>
  {/* <Route path='/front' element={<Front />}></Route> */}
  <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>


  <Route path='/register' element={<Register />}></Route>
  <Route path='/login' element={<Login />}></Route>



</Routes>
</MenuContext.Provider>
</EditContext.Provider>
</DashContext.Provider>
</DatesContext.Provider>
</ToggleContext.Provider>

</VisibleContext.Provider>

</>  

)
}
export function ProtectedRoute(props){
if(localStorage.getItem("user")){
  return props.children
}else{
 return <Navigate to="/login"/>
}
}
export default App