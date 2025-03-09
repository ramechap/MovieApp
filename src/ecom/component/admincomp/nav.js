import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css'
import bg from '../admincomp/bg.jpg';
import { AiFillAudio } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { RiNotificationLine } from "react-icons/ri";
import { FiMoon } from "react-icons/fi";
import axios from 'axios';
export default function NavAdmin(props) {
    const { setsidebar, sidebar,userman } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [data, setdata] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        
    }, [data])

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
        }
    };


    return (
        <div className='admin-container ' style={{   flexDirection: "column" }}>
            <header style={{ background: "transparent", position: "sticky", maxHeight: "100vh", display: "flex", flexDirection: "column", zIndex: "10" }}>
                <nav className='navbar' >
                    <div className='nav-section nav-left'>
                     
                        <Link to="" className='nav-logo'>
                     
                            <h2 className='logo-text' >
                                Welcome {userman.email},
                            </h2>
                        </Link>

                    </div>
                    <div className='nav-section nav-center'>
                        <form className='search-form'>
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" class="search-input" placeholder="Search" />
                        
                        </form>
                        
                    </div>

                    <div className='nav-section nav-right'>

                       
                        <button className='nav-button notify-button'>
                        <RiNotificationLine />
                        </button>
                        <button className='nav-button theme-button'>
                        <FiMoon />
                        </button>
                       <img src={bg} className='user-image' />
                              
                        
                    </div>

                </nav>
            </header>
        </div>
    );
}
