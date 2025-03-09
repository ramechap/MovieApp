import React, { useRef,useEffect,useState } from 'react'
import { Route, Routes ,BrowserRouter} from 'react-router-dom'
import AllPostEcom_post from '../component/admincomp/allpost'
import AlluserEcom_post from '../component/admincomp/getuser'
import CreateEcom_post from '../component/admincomp/createpost'
import EditPostEcom_post from '../component/admincomp/editpost'
import Logout from '../component/admincomp/logout'
import Sidebar from '../component/admincomp/sidebar'
import NavAdmin from '../component/admincomp/nav'
import Adminecom_home from '../component/admincomp/home'
import EcomAdminlogin from '../component/admincomp/login'
import axios from 'axios'





export default function AdminEcom_route() {
  const [sidebar, setsidebar] = useState(true)
  const [userman, setuserman] = useState("")
  
  const profile=async()=>{
		try {
	  
	  const user= await axios.get(`http://localhost:5000/auth/profile`,{withCredentials:true})
	
		 setuserman(user.data)
     console.log("use",userman)
		 
		 
		} catch (error) {
		 console.log(error)
		}
	}
  useEffect(() => {
 const fetch=async()=>{
  await profile()
 }
 fetch()
  }, [userman])
  
  
  return (
<>
<div style={{background:"#f1e2f9"}}>
        <NavAdmin userman={userman}  setsidebar={setsidebar} sidebar={sidebar} />
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar/>
         
          <div style={{width:"100vw",height:"100%" ,position:"fixed",overflowY:"scroll",flexGrow: 1, paddingLeft: sidebar ? "370px" : "0",paddingTop:"100px", transition: "padding 0.3s" }}>
        <Routes>
        <Route exact path='/home' element={<Adminecom_home setsidebar={setsidebar} sidebar={sidebar} />}/>

            <Route exact path='/create' element={<CreateEcom_post  userman={userman}  setsidebar={setsidebar} sidebar={sidebar} />}/>
            <Route exact path='/user' element={<AlluserEcom_post  userman={userman}  setsidebar={setsidebar} sidebar={sidebar} />}/>
            <Route exact path='/product' element={<AllPostEcom_post  userman={userman}  setsidebar={setsidebar} sidebar={sidebar} />}/>
            <Route exact path='/editpost/:id' element={<AllPostEcom_post  userman={userman}  setsidebar={setsidebar} sidebar={sidebar} />}/>
           
            
          



        </Routes>
      </div>
        </div>
    </div>
  

</>
  )
}
