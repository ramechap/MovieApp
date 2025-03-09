import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component/nav.css'
import { MdPhotoCamera } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";

export default function NavEcom(props) {
    const {scrollingDown,atTop  }=props
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle dropdown visibility
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setSearchVisible] = useState(false);
    const navigate = useNavigate();
    
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      if (searchTerm) {
        navigate(`/search/${searchTerm}`);
      }
    };
  
    return (
        <div style={{ position: "fixed", width: "100%",height:"100px",zIndex:"10"}}>
            <nav style={{zIndex:0}} id={`${scrollingDown && !atTop   ? "ecomnavc":"ecomnavt"}`} className='ecomnav' >
           <h1>
           <span style={{color:"#234F34"}}><MdPhotoCamera /></span><span style={{color:"#234F34",fontSize:"25px"}}>AstroWeb</span>
           </h1>
                <ul className='backcolorecom'  style={{height:"75%",border:"none"}}>
                    <li ><Link to="/">HOME</Link></li>
                    <li><Link to="/">CATEGORIES</Link></li>
                    
                    <li><Link to="/chefs">PRODUCTS</Link></li>
                    <li ><Link  to="/">CONTACT</Link></li>
                </ul>
                <div className='bellecom' >
                <button>LOGIN</button>
                </div>
            </nav>
        </div>
    );
}
