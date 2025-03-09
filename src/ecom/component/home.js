import React, { useState } from 'react'
import bg from '../image/bg.jpg';
import cam1 from '../image/cam1.jpg';
import cam2 from '../image/cam2.jpg';
import drone1 from '../image/drone1.jpg';
import drone2 from '../image/drone2.jpg';
import catecamera from '../image/catecamera.jpg';
import cateacce from '../image/cateacce.jpg';
import catelens from '../image/catelens.jpg';
import categopros from '../image/categopros.png';
import catedrone from '../image/catedrone.jpg';
import contact from '../image/contact.png';
import { FaStar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoReturnUpBack } from "react-icons/io5";
import './home.css';
import Footer_ecomturant from './footer';
import { Link } from 'react-router-dom';

export default function Home_ecomturant(props) {
    const categories=[
        {
            "img":catecamera

        },
        {
            "img":catedrone
            
        },
        {
            "img":categopros
            
        },
        {
            "img":catelens
            
        },
        {
            "img":cateacce
            
        }
    ]
    const rentus=[
        {
            "title":"Affordable Prices",
            "icon":<HiOutlineCurrencyRupee />,
            "desc":"Get access to high-end equipment at competitive rental rates."
        },
        {
            "title":"Flexible Rental Periods",
            "icon":<CiClock2 />,
            "desc":"Choose from daily, weekly, or monthly rentals."
        },
        {
            "title":"Expert Support",
            "icon":<TfiHeadphoneAlt />,
            "desc":"Our team is here to help you choose the right gear."
        },
        {
            "title":"Easy Returns",
            "icon":<IoReturnUpBack />,
            "desc":"Convients return options at the end of your rental period."
        }
    ]
    const { contactRef, aboutRef } = props
    const [visiblePosts, setVisiblePosts] = useState(4); // Start with 6 visible posts

    const handleShowMore = () => {
        window.location.href="/top-renting"
    };
    return (
        <div  className='homeecom'>
            <div style={{ display: "grid" }}>
                <div style={{zIndex:0}} className='imgHomeecom'>


                    <div className='etextOverlay'>
                        <div className='textecom'>

                            <div>
                                <h1>Rent the Latest Gadgets & Cameras!</h1>
                            </div>
                            <div>
                                <p>Flexible rentals for professionals, hobbyists, and tech enthusiats.</p>

                            </div>
                            <div>
                                <button>Explore Now</button>
                            </div>
                        </div>
                    </div>
                    <div className='eimageOverlay'>
                        <div className='imageecom' >

                            <div className='container-drone-image' >
                                <div className='drone-image-small' >
                                    <div  >
                                        <img src={cam1} alt='cam1' id='img-drone-1' />
                                    </div>
                                    <div>
                                        <img src={drone1} alt='drone1' id='img-drone'  />
                                    </div>
                                </div>
                                <div className='drone-image-large' >
                                    <img src={cam2} alt='cam2'  id='img-drone'  />

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='postecomt'>
                    <div className='ecomallposts'>
                        <div className='ecompostbox'>
                            <div>
                                <h2 style={{ fontSize: "50px", }}>Top renting</h2>
                                <p style={{ fontSize: "20px" }}>Get in on the trend with our curated selection of best-products.</p>
                            </div>
                            <div>
                                <div>
                                    <div className='ecomallpost'>
                                        {Array.from({ length: 20 }).slice(0, visiblePosts).map((_, index) => ( // Example for creating multiple posts
                                            <div onClick={()=>{window.location.href="/product/drone"}} className='postecom' key={index}>
                                                <div className='ecomimgpost'>
                                                    <img src={drone2} id="ecomimgpost" style={{ height: "100%" }} />
                                                </div>
                                                <div className='ecompost-content'>
                                                    <div className='ecom-postitem'>
                                                        <div style={{ textAlign: "center",marginTop:"10px" }}>
                                                            <p>SONY Alpha lLCE-6400L APS-C</p>
                                                        </div>
                                                        <div  className='ecom-postsection-2'>
                                                            <div>
                                                                <span style={{ color: "white", width: "60px", display: "flex", justifyContent: "center", backgroundColor: "green", borderRadius: "12px" }}>4.3 &nbsp; <FaStar style={{marginTop:"5%"}} /></span>
                                                            </div>
                                                            <div>
                                                                <p style={{ color: "green", fontWeight: "400" }}>Available</p>

                                                            </div>
                                                        </div>
                                                        <div className='ecom-postsection-3'>
                                                            <div>
                                                                <span style={{fontWeight:"bold"}}>₹2,111/-</span>
                                                            </div>
                                                            <div>
                                                                <button>Rent now</button>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>




                                        ))}

                                    </div>



                                    <div className='button-container'>
                                  
                                  <button id="ecomshowmore-btn" onClick={handleShowMore}>See all </button>
                              
                          </div>
                                </div>
                                

                            </div>


                        </div>
                    </div>

                </div>
                <div className='postecomt'>
                    <div className='ecomallposts'>
                        <div className='ecompostbox'>
                            <div>
                                <h2 style={{ fontSize: "50px" }}>Categories</h2>
                            </div>
                            <div>
                                <div className='ecomcatee'>
                                    <div style={{display:"flex"}} className='ecomcatelist'>
                                        {categories.map((name, index) => ( // Example for creating multiple posts
                                            <div className='postecom-cate' key={index}>
                                             
                                                 <button className='catelist-btn' style={{background:"transparent",borderRadius:"50%"}}>
                                                 <img src={name.img} id="ecomimgpost-cate" />
                                                 </button>
                                             
                                            </div>
                                        ))}
                                    </div>
                                </div>                    
                            </div>
                        </div>
                    </div>

                </div>
                <div className='postecomt'>
                    <div className='ecomallposts'>
                        <div className='ecompostbox'>
                            <div>
                                <h2 style={{ fontSize: "50px", }}>Our products</h2>
                                <p style={{ fontSize: "20px" }}>Get in on the trend with our curated selection of best-products.</p>
                            </div>
                            <div>
                                <div>
                                    <div className='ecomallpost-product'>
                                        {Array.from({ length: 6 }).map((_, index) => ( // Example for creating multiple posts
                                            <div onClick={()=>{window.location.href="/product/drone"}} style={{marginTop:"10%"}} className='postecom' key={index}>
                                                <div className='ecomimgpost'>
                                                    <img src={drone2} id="ecomimgpost" style={{ height: "100%" }} />
                                                </div>
                                                <div className='ecompost-content'>
                                                    <div className='ecom-postitem'>
                                                        <div style={{ textAlign: "center",marginTop:"10px" }}>
                                                            <p>SONY Alpha lLCE-6400L APS-C</p>
                                                        </div>
                                                        <div  className='ecom-postsection-2'>
                                                            <div>
                                                                <span style={{ color: "white", width: "60px", display: "flex", justifyContent: "center", backgroundColor: "green", borderRadius: "12px" }}>4.3 &nbsp; <FaStar style={{marginTop:"5%"}} /></span>
                                                            </div>
                                                            <div>
                                                                <p style={{ color: "green", fontWeight: "400" }}>Available</p>

                                                            </div>
                                                        </div>
                                                        <div className='ecom-postsection-3'>
                                                            <div>
                                                                <span style={{fontWeight:"bold"}}>₹2,111/-</span>
                                                            </div>
                                                            <div>
                                                                <button>Rent now</button>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>




                                        ))}

                                    </div>




                                </div>
                               

                            </div>


                        </div>
                    </div>

                </div>
                <div className='postecomt'>
                    <div className='ecomallposts'>
                        <div className='ecompostbox'>
                            <div>
                                <h2 style={{ fontSize: "50px", }}>Why Rent from us?</h2>
                            </div>
                            <div>
                                <div>
                                    <div style={{display:"flex"}} className='ecomallpost-rent'>
                                        {rentus.map((data, index) => ( // Example for creating multiple posts
                                            <div className='postecomrent' key={index}>
                                                <div>
                                                    <div style={{fontSize:"60px"}}>
                                                        {data.icon}
                                                    </div>
                                                    <div>
                                                     <p>   {data.title}</p>
                                                    </div>
                                                    <div>
                                                        <span >{data.desc}</span>
                                                    </div>
                                                    </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
