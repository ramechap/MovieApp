import React, { useEffect, useState } from 'react'
import "./allpost.css";
import axios from 'axios';

export default function AlluserEcom_post() {
  const [post, setPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products from the API
  const postAll = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/getall');
    
      setPost(response.data.youtube);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    postAll();
  }, []);

  // Filter products based on search term
  const filteredPosts = post.filter(product =>
    product.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
    <div className="adminecomproducts-container">
      <div  className="search-bar">
        <form >
          <input style={{width:"100%"}}
            type="text"
            id="search"
            placeholder="Search users..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <table id="product-table">
        <thead>
          <tr>
            <th>ID</th>
        
            <th>Email</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="product-table-body">
          {filteredPosts.length>0?
           filteredPosts.map((data, i) => (
            <tr key={i}>
              <td>{data._id}</td> {/* Assuming i+1 for proper ID display */}
            
              <td>{data.email.slice(0,20)}</td>
              <td>
                <button>Send</button>
          
              </td>
            </tr>
          ))
        :<span style={{textAlign:"center",justifyItems:"center"}}>No user found</span>
        }
        </tbody>
      </table>
    </div>
  </div>

  )
}
