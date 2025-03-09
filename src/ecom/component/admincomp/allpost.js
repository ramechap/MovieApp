import React, { useEffect, useState } from 'react';
import "./allpost.css";
import axios from 'axios';

export default function AllPostEcom_post() {
  const [post, setPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setprice] = useState(1);
  const [category, setCategory] = useState('');
  const [idd, setidd] = useState('')
  const [specification, setSpecification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // Fetch all products from the API
  const postAll = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ecom/getall');
      console.log("All product:", response.data.youtube);
      setPost(response.data.youtube);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const Deletehandle = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/ecom/delete/${id}`);
     
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const Edithandle = (data) => {
    setCategory(data.category)
    setTitle(data.title)
    setDescription(data.description)
    setQuantity(data.quantity)
    setprice(data.price)
    setSpecification(data.specification)
    setProductImage(data.photourl)
    setidd(data._id)
    setIsModalOpen(true);
   
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();  // Create FormData object
   
    // Append the fields to FormData
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', productImage);

    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('specification', specification);

    try {
        // Send the request to the backend
        const response = await axios.put(
            `http://localhost:5000/ecom/edit/${idd}`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the content type is set
                },
            }
        );
        setIsModalOpen(false);
      
        postAll();
    } catch (error) {
        alert('Error registering user');
        console.log(error);  // Log any errors for debugging
    }
  
 

  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    // Preview image
  
};
  // Fetch data when component mounts
  useEffect(() => {
    postAll();
  }, []);

  // Filter products based on search term
  const filteredPosts = post.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="adminecomproducts-container">
        <div className="search-bar">
          <form>
            <input
              type="text"
              id="search"
              placeholder="Search products..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <table id="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="product-table-body">
            {filteredPosts.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td> {/* Assuming i+1 for proper ID display */}
                <td>
                  <img
                    src={data.filename?data.filename.trim():""}
                    alt={`Product ${data.title}`}
                    className="product-image"
                  />
                </td>
                <td>{data.title.slice(0,20)}..</td>
                <td>
  {data.categoryy
   
    .map((cat, index) => {
      const trimmedCat = cat.trim();
      return trimmedCat ? <span key={index}>{trimmedCat}{index <  data.categoryy.length - 1 ? ', ' : ''} </span> : null;
    })}
</td>
                <td>Rs {data.price ? data.price : null}</td>
                <td>
                  <button onClick={()=>Edithandle(data)}>Edit</button>
                  <button onClick={()=>Deletehandle(data._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && 
            <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Edit Product</h3>
              <form style={{overflowY:"auto"}} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="photourl">Product Image:</label>
              <input
                type="file"
                id="photourl"
                name="photourl"
                accept="image/*"
                src={URL?.createObjectURL(productImage)}
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
            <button type="submit" className="submit-btn">Edit Product</button>
            </div>
          </form>
            </div>
          </div>
  
      }
    </div>
  );
}
