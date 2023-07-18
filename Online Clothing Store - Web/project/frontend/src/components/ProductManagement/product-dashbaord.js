import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/product.css";
import AddImage from "../../img/addprd.png";

const ProductDashboard = () => {
  const [products, setProduct] = useState([]);


  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:5050/products/getProducts"
    );
    setProduct(response.data);
  };
  
 
  return (
    <div className="container">
      <h2 className="text-center product-main-header my-5">
        Product Analysis
      </h2>
<div className="row">
     
        
      </div>
      <div className="columns mt-3">
        

        <div className="row  justify-content-center">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="col-md-2 image-container mt-4 m-2"
            >
              <img
                src={product.image}
                alt="FirstImage"
                className="product-image-container"
              />
              <h6 className="product-header">{product.name}</h6>
              <h6 className="product-price">Item Clicks : {product.clickCount}</h6>
              
             
              <p>{product.available}</p>
            </div>
          ))}
          <Link to="../addproduct" className="addImgBtn">
            <img className="addImgBtn mb-4" src={AddImage} alt=""></img>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductDashboard;
