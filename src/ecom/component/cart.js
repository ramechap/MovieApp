import React, { useCallback, useEffect, useState } from 'react'
import { GiCancel } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import "../component/cart.css"
import drone2 from '../image/drone2.jpg';
import axios from 'axios';
export default function Ecom_cart(modall) {
    const [cart, setcart] = useState([])
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [inputValue, setInputValue] = useState('');

  
    const DeleteCart = (index, data) => {
        const updatedCart = cart.filter((item) => {

            return item.id !== data.id
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setcart(updatedCart)

    }
    const incrementQuantity = (data) => {

        const updatedCart = cart.map((item) =>
            item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setcart(updatedCart)
    };

    const decrementQuantity = (data) => {
        const updatedCart = cart.map((item) =>
            item.id === data.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setcart(updatedCart)
    };
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
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const sortedCountries = response.data.sort((a, b) => {
                    const nameA = a.name.common.toLowerCase();
                    const nameB = b.name.common.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });

                setCountries(sortedCountries);

                // setCountries(response.data); // Store country data
            } catch (error) {
                console.error('Error fetching countries', error);
            }
        };

        fetchCountries();
    }, []);
    useEffect(() => {
        const fetchCities = async () => {
            if (selectedCountry) {
                try {
                    const response = await axios.get(
                        `https://cors-anywhere.herokuapp.com/https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${selectedCountry}`,
                        {
                            headers: {
                                'X-RapidAPI-Key': 'b0292751bbmshb2f327a15a6a706p127035jsna842e7a2207f',
                                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                                'Origin': 'http://localhost:3000',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        }
                    );
                    console.log("city", response.data)
                    setCities(response.data.data); // Store city data
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            }
        };


        fetchCities();
    }, [selectedCountry]);

    // Handle the change of selected country


    // Handle the change of selected city
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedCity('');
    };
    var map1 = null;
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
const discountedAmount = totalAmount - (totalAmount * 0.05);

    useEffect(() => {
        const cartt = getCart()
        setcart(cartt)
        map1=cartt?.map((x) => x.price * x.quantity);
       

        
        
    }, [])
    function myFunc(total, num) {
        return total + num;
      }
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh",height:"100%" }}>
            <div className='item-cartss' style={{ marginTop: "100px", flexGrow: 1 }}>
                <div className='item1'>
                    <div className='item1-name'>
                        <h2>Shopping Bag</h2>
                        <p>{cart.length} items in your bag.</p>

                    </div>
                    <div className='item1-table'>
                        <table style={{ width: "100%", fontSize: "20px" }}>
                            <thead>
                                <th style={{ width: "35%" }} >Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>

                            </thead>
                            <tbody>
                                {cart?.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <div style={{ display: "flex" }} >
                                                    <img src={drone2} id="ecomimgpost" height={100} width={150} style={{ height: "100%", borderRadius: "10px" }} />

                                                </div>
                                                <div >
                                                    <p style={{ fontWeight: "500", margin: "30% 10px" }}>{data.name}</p>
                                                </div>

                                            </div>
                                        </td>
                                        <td>₹ {new Intl.NumberFormat('en-US').format(data.price)} /-</td>
                                        <td style={{ gap: "2", alignContent: "center" }}>
                                            <button style={{ width: "25px", border: "1px solid black", textAlign: "center", borderRadius: "10px" }} onClick={() => decrementQuantity(data)}>-</button>
                                            <input style={{ width: "60px", textAlign: "center", border: "none" }} disabled value={data.quantity} type='number' />
                                            <button style={{ width: "25px", border: "1px solid black", textAlign: "center", borderRadius: "10px" }} onClick={() => incrementQuantity(data)}>+</button>
                                        </td>
                                        <td style={{ color: "#ffc76f", fontWeight: "600" }}>₹ {new Intl.NumberFormat('en-US').format(data.price * data.quantity)} /-</td>
                                        <td>

                                            <MdDeleteForever onClick={() => DeleteCart(index, data)} style={{ color: "red", fontSize: "30px", fontWeight: "bold", cursor: "pointer" }} />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>



                    </div>



                </div>
                <div className='item2'>
                    <div className='shiping'>
                        <div className='cal-shiping'>
                            <div className='shiping-title'>
                                <h2>Calculated Shipping</h2>

                            </div>
                            <div className='shiping-country'>
                                <select value={selectedCountry} onChange={handleSelectChange}>
                                    <option value="">Country</option>
                                    {countries.map((country) => (
                                        <option key={country.cca3} value={country.name.common}>
                                            {country.name.common}
                                        </option>
                                    ))}
                                </select>



                            </div>
                            <div className='shiping-states'>
                                <div className='shiping-state'>
                                    <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedCountry}>
                                        <option value="">City/State</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>


                                </div>
                                <div className='shiping-state'>
                                    <input type='number' placeholder='ZIP Code' />

                                </div>

                            </div>
                            <div className='shiping-btn'>
                                <button id="shipbtn">Update</button>

                            </div>
                            <hr id="hrr" />



                        </div>
                        <div className='coupon-shiping'>
                            <div className='shiping-title'>
                                <h2>Coupon Code</h2>

                            </div>
                            <div className='shiping-p'>
                                <p>This approach ensures that the update profile route works seamlessly while maintaining security and data integrity. Let me know if you need further clarification or enhancements!</p>



                            </div>
                            <div className='shiping-code'>


                                <input type='number' placeholder='Coupon Code' />



                            </div>
                            <div className='shiping-btn'>
                                <button id="shipbtn">Apply</button>

                            </div>




                        </div>

                        <div className='carttot-shiping'>
                            <div className='carttot-title'>
                                <h2>Cart Total</h2>

                            </div>
                            <div className='carttot-p'>
                               <div className='allcarttot'>
                                <p>Cart Subtotal</p>
                                <span>₹ {new Intl.NumberFormat('en-US').format(totalAmount)} /-</span>
                               </div>
                               <div className='allcarttot'>
                                <p>Discount</p>
                                <span style={{color:"white"}}>5%</span>
                               </div>
                               <div className='allcarttot'>
                                <p>Cart Total</p>
                                <span>₹ {new Intl.NumberFormat('en-US').format(discountedAmount)} /-</span>
                               </div>



                            </div>
                     
                            <div className='carttot-btn'>
                                <button id="shipbtn">Apply</button>

                            </div>




                        </div>



                    </div>

                </div>
            </div>
        </div>
    )
}
