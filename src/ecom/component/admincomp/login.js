import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import "../admincomp/adminlogin.css"
import axios from 'axios';


export default function EcomAdminlogin() {
   


    const navigate=useNavigate()
    //const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
   

    const handleSubmit = async(e) => {
       
       
            e.preventDefault();
            if (email === "admin@gmail.com" && password === "admin123") {
                try {
                    const response = await axios.post('http://localhost:5000/auth/login', {
                        email:email,
                        password:password,
                    }, {
                      withCredentials: true, // Make sure cookies are sent with the request
                    });
                    localStorage.setItem("isAdmin", "true");
               
                window.location.href = "/admin/home";
                    
                } catch (error) {
                    alert('Error registering user');
                }
               
              } else {
                // Handle non-admin login
                alert("Invalid credentials");
              }
           
           
        
      };
    
  return (
   <div >
     <div className='adminlogincontainerr'>
    <form id="form" onSubmit={handleSubmit} >
    <div id="div1">
    <h1>Cookbook administration </h1>
    </div>
     
       <div id="div2">
       <div id="div3">
        <label>Username:</label>
        <input
          type="email" 
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />        </div>
        <div id="div4">
        <label>Password:</label>
        <input type="password" id="username" name="password" value={password} onChange={(e)=> setpassword(e.target.value)} />
        </div>
        <div id="but">
        <input className='button' type='submit' value="Log in" />

        </div>
       </div>
    </form>
      
    </div>
   </div>
  )
}
