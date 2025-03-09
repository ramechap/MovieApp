import React, { useEffect, useRef, useState } from 'react'
import Navb from '../component/nav'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NavEcom from '../component/nav';
import Home_ecomturant from '../component/home';
import Footer_ecom from '../component/footer';
import Ecomproduct from '../component/ecomproduct';
import Ecom_category from '../component/category';
import Adminecom_home from '../component/admincomp/home';
import AdminEcom_route from './admin_route';
import Ecom_toprenting from '../component/toprenting';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Lottie, { useLottie } from "lottie-react";
import "../component/modal.css"
import cart from "../image/cart.json"
import Modal_ecom from '../component/modal';
import Ecom_cart from '../component/cart';


export default function Ecom_route() {
    const [modall, setmodall] = useState(false)
    const contactRef = useRef(null);
    const aboutRef = useRef(null); // Create a ref for the target div
    const [scrollingDown, setScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [atTop, setAtTop] = useState(true);
    const toggleModal=()=>{
        setmodall(!modall);
    }
    useEffect(() => {
        if (modall) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }, [modall]);
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setAtTop(currentScrollY === 0);
        // Check if scrolling down
        if (currentScrollY > lastScrollY) {
            setScrollingDown(true);
        } else if (atTop) {
            setScrollingDown(false);
        }

        // Update last scroll position
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);
    const scrollToContact = () => {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const style = {
        height: 90,
        width:92
      };
      const carticon={
        
            display: "flex",
        
            position: "fixed",
            zIndex: 2,
            bottom: "5%",
            right: "0.5%",
            background: "none", 
            border: "none"
        
      }
      const badgestyle={
      
        fontWeight: "bold",
        position: "absolute",
        right: "15%",
        top: "20%",
       
        fontSize: "15px",
        
         background: "black", 
        color: "white",
      }
      const isCartExisting = (key) => {
        const cart = localStorage.getItem(key);
        return cart !== null; // Returns true if the cart exists, false otherwise
    };
    const initializeCart = () => {
        if (!isCartExisting("cart")) {
            localStorage.setItem("cart", JSON.stringify([])); // Empty array for cart
        }
    };
      const getCart = () => {
        initializeCart(); // Ensure the cart exists
        return JSON.parse(localStorage.getItem("cart"));
    };
    const cartt=getCart();
    useEffect(() => {
     
    }, [])
    
    return (
        <div>
            <NavEcom scrollingDown={scrollingDown} atTop={atTop} scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />

            <Routes>
                <Route exact path='/' element={<Home_ecomturant aboutRef={aboutRef} contactRef={contactRef} />} />
                <Route exact path="/product/drone" element={<Ecomproduct />} />
                <Route exact path="/top-renting" element={<Ecom_toprenting />} />

                <Route exact path="/category/:cate" element={<Ecom_category />} />
                <Route exact path="/productcart" element={<Ecom_cart getCart={getCart} modall={modall} cartt={cartt} />} />


                {/* <Route exact path="/post/name='Nodeel-kema'" element={<Resturantreceipepost />}/>
            <Route exact path="/category='grill-receipes'" element={<Resturant_category />}/> */}

            </Routes>
            {modall && <div>
                <Modal_ecom getCart={getCart} modall={modall} cartt={cartt} toggleModal={toggleModal} />
            </div>}
           {!modall &&  <button id="cart-icon"  style={carticon}>

<Lottie onClick={toggleModal} animationData={cart} loop={true} style={style} />

<Badge style={badgestyle} id="badge-robo" bg="danger">{cartt.length} </Badge>
</button>}
            <div >
                <Footer_ecom />
            </div>


        </div>
    )
}
