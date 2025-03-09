
import React, { useEffect, useState } from 'react'
import "../component/ecomproduct.css"
import bg from '../image/bg.jpg';
import drone2 from '../image/drone2.jpg';
import cart from "../image/cart.json"
import { FaStar } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Carousell from 'react-elastic-carousel';
import Lottie, { useLottie } from "lottie-react";
export default function Ecomproduct() {
    const [quantity, setQuantity] = useState(1);
    const [visiblePosts, setVisiblePosts] = useState(4); 
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };
    const responsive = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow:3 ,itemsToScroll:1},
        { width: 1200, itemsToShow: 5 }
      ];

      useEffect(() => {
            initializeCart()
            // console.log(JSON.parse(localStorage.getItem("cart")))
             const i=JSON.parse(localStorage.getItem("cart"))
             
            
        
    }, [])
        
    const isCartExisting = (key) => {
        const cart = localStorage.getItem(key);
        return cart !== null; // Returns true if the cart exists, false otherwise
    };
    const initializeCart = () => {
        if (!isCartExisting("cart")) {
            localStorage.setItem("cart", JSON.stringify([])); // Empty array for cart
        }
    };
    
    // Add an item to the cart
    const AddToCart = (item) => {
        initializeCart(); // Ensure the cart exists
        const cart = JSON.parse(localStorage.getItem("cart"));

        // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex((data) => data.name === item.name);
       
    if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // If the item doesn't exist, add it to the cart
        cart.push(item);
    }
        localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart
        setQuantity(1)
        
    };
    
    // Retrieve the cart
    const getCart = () => {
        initializeCart(); // Ensure the cart exists
        return JSON.parse(localStorage.getItem("cart"));
    };
    //   const AddToCart = (name) => {
       
    //     const currentQuantity = parseInt(quantity); // Ensure it's a number
    //    // localStorage.getItem(`drone`)
    //     if (!isNaN(currentQuantity) && currentQuantity > 0) {
    //         localStorage.setItem(`cart${name}`, JSON.stringify(currentQuantity));
    //         alert(`${name} added to cart with quantity: ${currentQuantity}`);
            
    //     } else {
    //         alert('Invalid quantity');
    //     }
    // };
    
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
   
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
           
            <div className='ecom-section'>
                <div className='device-product'>
                    <div className='image-content'>
                        <div className='imagy'>
                            <img src={drone2} alt={`Pic:${drone2} `}/>
                        </div>

                    </div>
                    <div className='about-content'>
                        <div className='title-about'>
                        <h2>SONY Alpha lLCE-6400L APS-C</h2>
                        </div>
                        <div className='rating-about'>
                        <div>
                                                                <span style={{ color: "white", width: "80px", height:"30px",textAlign:"center",display: "flex", alignItems:"center",justifyContent: "center", backgroundColor: "green", borderRadius: "12px" }}>4.3 &nbsp; <FaStar style={{marginTop:"4%"}} /></span>
                                                            </div>
                                                            <div>
                                                                <p style={{  fontWeight: "500" }}>4.3 Ratings and 0 reviews</p>

                                                            </div>

                        </div>
                        <div className='quantity-about'>
                            <div>
                                <p>Quantity</p>
                                <button onClick={decrementQuantity}>-</button>
                                <input disabled value={quantity} onChange={handleQuantityChange}  type='number'  />
                                <button onClick={incrementQuantity}>+</button>
                            </div>

                        </div>
                        <div className='price-about' >
                           
                            <span style={{fontWeight:"bold"}}>₹ 2,111/-</span>
                            <span style={{fontWeight:"500",fontSize:"25px",textDecorationLine:"line-through",textDecorationColor:"red",marginTop:"30px"}}>₹ 4,111/-</span>
                            
                        </div>
                        <div className='category-about'>
                        <span >Category:</span>
                            <span style={{fontWeight:"200"}}>Drone</span>
                            
                        </div>

                    </div>

                </div>
                <div className='speci-product'>
                    <div className='description-content'>
                        <p style={{color:"#8A8A8A"}}>Description</p>
                        <p>Founding and History: BMW, Bayerische Motoren Werke AG, was founded in 1916 in Munich, Germany, initially producing aircraft engines. The company transitioned to motorcycle production in the 1920s and eventually to automobiles in the 1930s.
                        Iconic Logo: The BMW logo, often referred to as the "roundel," consists of a black ring intersecting with four quadrants of blue and white. It represents the company's origins in aviation, with the blue and white symbolizing a spinning propeller against a clear blue sky.</p>

                    </div>
                    <div className='specification-content'>
                    <p style={{color:"#8A8A8A"}}>Specification</p>
                    <ul>
                        <li>APS-C type (23.5 x 15.6 mm) </li>
                        <li>APS-C type (23.5 x 15.6 mm) </li>
                        <li>APS-C type (23.5 x 15.6 mm) </li>
                        <li>APS-C type (23.5 x 15.6 mm) </li>
                    </ul>

                    </div>
                </div>
                <div className='button-product'>
                    <button onClick={()=>AddToCart({ id: 2, name: "Drone", quantity: quantity,price:1011})}>Add to cart</button>
                    <button>Rent Now</button>
                </div>
                <div className="similar-product">
                <h2>Similar Products</h2>
                <Carousell focusOnSelect={true}  itemPadding={[0, 20]}    breakPoints={responsive} showArrows={true} outerSpacing={100} >
                    {Array.from({ length: 20 }).map((_, index) => (
 <div className='postecom' key={index}>
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
</div>                    ))}
                </Carousell>
            </div>                

            </div>

        </div>)
}