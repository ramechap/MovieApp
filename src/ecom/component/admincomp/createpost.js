import React, { useEffect, useState } from 'react';
import './createpost.css';
import axios from 'axios';

export default function CreateEcom_post(props) {
  const {userman}=props;
  // State for each form input field
  const [productImage, setProductImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setprice] = useState(1);
  const [category, setCategory] = useState('');
  const [specification, setSpecification] = useState('');
  const [currentuser, setcurrentuser] = useState("")


  // Handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();  // Create FormData object
   
    // Append the fields to FormData
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', productImage);
    formData.append('author', userman.id);
    formData.append('quantity', quantity);
    
    formData.append('price', price);
    formData.append('specification', specification);

    try {
        // Send the request to the backend
        const response = await axios.post(
            'http://localhost:5000/ecom/create',
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the content type is set
                },
            }
        );
        window.location.href = "/admin/post";
    } catch (error) {
        alert('Error registering user');
        console.log(error);  // Log any errors for debugging
    }
  
 

  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    // Preview image
  
};
 
  useEffect(() => {
    console.log("j",userman.id)

  }, [])
  

  return (
    <>
      <div className="ecomadminmain-content">
        <h1>Create New Product</h1>

        <form style={{overflowY:"auto"}} onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="photourl">Product Image:</label>
            <input
              type="file"
              id="photourl"
              name="photourl"
              accept="image/*"
              required
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update state on change
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update state on change
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))} // Ensure the value is a number
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="1"
              value={price}
              onChange={(e) => setprice(Number(e.target.value))} // Ensure the value is a number
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              required
              placeholder="Enter categories (comma separated)"
              value={category}
              onChange={(e) => setCategory(e.target.value)} // Update state on change
            />
          </div>

          <div className="form-group">
            <label htmlFor="specification">Specification:</label>
            <input
              type="text"
              id="specification"
              name="specification"
              required
              placeholder="Enter specifications (comma separated)"
              value={specification}
              onChange={(e) => setSpecification(e.target.value)} // Update state on change
            />
          </div>
          <div className="form-group">
          <button type="submit" className="submit-btn">Create Product</button>
          </div>
        </form>
      </div>
    </>
  );
}
