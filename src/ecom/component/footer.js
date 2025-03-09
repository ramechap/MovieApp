import React from 'react'
import './footer.css';
import { MdPhotoCamera } from "react-icons/md";

export default function Footer_ecom(props) {
    const {aboutRef}=props;
    return (
<footer className='ecomfoot'>
<div ref={aboutRef} class=" foot-ecom w-container">
<div style={{display:"flex",justifyContent:"space-around",textAlign:"left"}} className='container-footer'>
<div style={{display:"flex",textAlign:"center",marginTop:"50px"}} className='footer-conten'>
        <span style={{color:"white",fontSize:"40px"}}><MdPhotoCamera /></span><span style={{color:"white",fontSize:"30px",marginTop:"10px"}}>AstroWeb</span>


        </div>
        <div className='footer-content'>
            <div className='footer-instruction'>
            <div className=' title-shop'>
                <ul>
                    <li style={{fontWeight:"bold",fontSize:"24px"}}>SHOP</li>
                    <li>Products</li>
                    <li>Categories</li>
                    <li>Offers</li>
                </ul>
            </div>
            <div className=' title-company'>
                <ul>
                    <li style={{fontWeight:"bold",fontSize:"24px"}}>COMPANY</li>
                    <li>Why Rent From Us?</li>
                    <li>Contact</li>
                 
                </ul>
            </div>
            </div>

        </div>
        <div className='footer-content'>
            <ul style={{display:"grid",gap:"10px"}}>
                <li style={{fontWeight:"bold",fontSize:"24px"}}>STAY UP TO DATE</li>
                <li>
                <form className='search-form'>
                            <input type="text" class="search-input" placeholder="Enter your email" />
                            <button className='nav-button search-button'>
                                SUBMIT
                            </button>
                        </form>
                </li>
            </ul>

        </div>

</div>
<div  style={{display:"flex"}}>
<div className='footer-content'>
<hr id="hr"></hr>
            <ul style={{display:"flex",gap:"10%",justifyContent:"space-between"}}>
                <li style={{fontWeight:"700",color:"white"}}>Terms</li>
                <li style={{fontWeight:"700",color:"white"}}>Privarcy</li>
                <li style={{fontWeight:"700",color:"white"}}>Cookies</li>
            </ul>
            </div>

    </div>       
 </div>

</footer>

    )
}
