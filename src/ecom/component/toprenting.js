import React, { useState } from 'react'
import drone2 from '../image/drone2.jpg';

import { FaStar } from "react-icons/fa";

import "../component/category.css"
export default function Ecom_toprenting() {
    const [search, setsearch] = useState("")
  return (
   
          <div className='categoryecom'>
          <div class="grid-container" style={{display:"grid"}}>
            <div className="grid-item">
            <div className='ecomallpostsc'>
                        <div className='ecompostboxc'>
                            <div>
                                <h2 style={{fontSize:"3.4rem"}}><em>Top Renting</em></h2>
                           
                            </div>
                          
                    
                            <div style={{marginTop:"20px"}}> 
                            <div>
                                <div >
                                    <div style={{justifyContent:"center"}} className='ecomallpost-product'>
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

            </div>
                     
                    </div>
                    </div>
 
  )
}
