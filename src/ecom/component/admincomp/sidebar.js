import React from 'react'
import "../admincomp/sidebar.css"
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineLiveTv } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { SlCamrecorder } from "react-icons/sl";
import { TbUserSquare } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { CiBitcoin } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { PiClockCounterClockwise } from "react-icons/pi";
import axios from 'axios';

export default function Sidebar() {
  
    const logout = async () => {
        try {
          const response = await axios.get('http://localhost:5000/auth/logout',{
            withCredentials: true, // Make sure cookies are sent with the request
          });
          localStorage.setItem("isAdmin", "false");  
          window.location.href="/"   
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
  return (
    
                    <div className='adminmain-layout'>
                <aside className='sidebar' >
                    <div className='link-container'>
                        <div className='title'>
                        <RiAdminLine style={{color:"#9D4EDD",fontSize:"50px"}} /> &nbsp;Admin
                        </div>
                        <div className='link-section'>
                            <NavLink to="/admin/create"  activeClassName="active-link" className='link-item'>
                            <MdOutlineQrCodeScanner /> &nbsp; &nbsp; Add
                            </NavLink>
                            <div className='section-separator'></div>
                            <NavLink to="/admin/product"  activeClassName="active-link" className='link-item'>
                            <CiBitcoin />  &nbsp;  &nbsp; Product
                            </NavLink>
                            <div className='section-separator'></div>
                            <NavLink  activeClassName="active-link" to="/admin/user" className='link-item'>
                            <AiOutlineTransaction />&nbsp;  &nbsp; User
                            </NavLink>
                            <div className='section-separator'></div>
                            <NavLink  activeClassName="active-link" to="/admin/home" className='link-item'>
                            <MdOutlinePerson />  &nbsp; &nbsp; Profile
                            </NavLink>
                            <div className='section-separator'></div>
                            <NavLink onClick={logout} activeClassName="active-link" to="/admin/logout" className='link-item'>
                            <BiLogOutCircle /> &nbsp; &nbsp; Log out
                            </NavLink>

                        </div>
                       

                    </div>
                </aside>
            </div>

   
  )
}
