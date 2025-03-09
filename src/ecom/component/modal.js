import React, { useEffect } from 'react'
import "../component/modal.css"
import { GiCancel } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
export default function Modal_ecom({modall, toggleModal,cartt,getCart}) {
  
  
  const DeleteCart=(index,data)=>{
    const updatedCart = cartt.filter((item) =>{
      
      return  item.id !== data.id
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
   
    
    
        
  }
  useEffect(() => {
    
  }, [cartt])
  
  return (
    <div className='modal-ecom'>
        <div onClick={toggleModal} className='overlay'></div>
            <div className='modal-content'>
                    <h2>Cart</h2>
                    <table>
                                    <thead>
                                    <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                        
                                    </thead>
                                    <tbody>
                                        
                                       {cartt.map((data,index)=>(
                                         <tr key={index}>
                                         <td>{data.name} </td>
                                         <td>₹ {new Intl.NumberFormat('en-US').format(data.price)} /-</td>
                                         <td>{data.quantity}</td>
                                         <td>

                                         <MdDeleteForever onClick={()=>DeleteCart(index,data)} style={{color:"red", fontSize:"30px",fontWeight:"bold",cursor:"pointer"}} />
                                         </td>
                                         
                                         </tr>
                                       ))}
                                     
                                        
                                        
                                      
                                    </tbody>
                                </table>
                              <div className='btn-cart'>
                              <button className='view-btn'>View Cart</button>
                              <button className='clear-btn'>Clear All</button>
                              </div>
                                <GiCancel className='close-modal' onClick={toggleModal} />
                                
            </div>
      
    </div>
  )
}
