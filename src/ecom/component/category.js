import React, { useEffect, useState } from 'react'
import drone2 from '../image/drone2.jpg';
import catecamera from '../image/catecamera.jpg';
import cateacce from '../image/cateacce.jpg';
import catelens from '../image/catelens.jpg';
import categopros from '../image/categopros.png';
import catedrone from '../image/catedrone.jpg';
import contact from '../image/contact.png';
import { FaStar } from "react-icons/fa";

import "../component/category.css"
import { useNavigate, useParams } from 'react-router-dom';
export default function Ecom_category() {
    const categories=[
        {
            "img":catecamera,
            "title":"camera"

        },
        {
            "img":catedrone,
            "title":"drone"
        },
        {
            "img":categopros,
            "title":"gopros"
        },
        {
            "img":catelens,
            "title":"lens"
        },
        {
            "img":cateacce,
            "title":"accessories"
        }
    ]

    const [search, setsearch] = useState("")
    const navigate=useNavigate()
    const {cate}=useParams()
   
   
    
  return (
   
          <div className='categoryecom'>
          <div class="grid-container" style={{display:"grid"}}>
            <div className="grid-item">
            <div className='ecomallpostsc'>
                        <div className='ecompostboxc'>
                            <div>
                                <h2 style={{fontSize:"3.4rem"}}><em>{cate.charAt(0).toUpperCase()+ cate.slice(1,cate.length)} </em></h2>
                           
                            </div>
                            <div id="searching" style={{marginTop:"20px"}} >
                        
                        <input id="search" name="search" value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder='Search...' />
                  
                       

                    </div>
                    <div style={{marginTop:"10px"}} className='ecomcatee'>
                                    <div style={{display:"flex",margin:"3% auto"}} className='ecomcatelist'>
                                        {categories.map((name, index) => ( // Example for creating multiple posts
                                            <div className='postecom-cate' key={index}>
                                             
                                                 <button onClick={()=>navigate(`/category/${name.title}`)} className='catelist-btn' style={{background:"transparent",borderRadius:"50%"}}>
                                                 <img src={name.img} id="ecomimgpost-cate" />
                                                 </button>
                                             
                                            </div>
                                        ))}
                                          <button onClick={()=>navigate(`/`)} style={{background:"transparent",border:"none",fontSize:"30px"}} >
                                                 All
                                                 </button>
                                    </div>
                                </div>   
                    
                            <div style={{marginTop:"5px"}}> 
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
