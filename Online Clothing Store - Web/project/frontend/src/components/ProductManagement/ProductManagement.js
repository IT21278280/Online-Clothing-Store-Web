import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/product.css";
import AddImage from "../../img/addprd.png";

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [query, setQuery] = useState();
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:5050/products/getProducts"
    );
    setProduct(response.data);
    setQuery(response.data);
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/products/delete-product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setProduct(query);
    } else {
      const filterResult = query.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.category.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProduct(filterResult);
    }
    setFilterVal(e.target.value);
  };
  return (
    <div className="container">
      <h2 className="text-center product-main-header my-5">
        Product Management
      </h2>

      <div className="row">
        <div className="col-7 ml-5">
          <h6 className="productmanagement-view-name text-left ml-5">
            <Link to="/button-click">
            <button className="btn" style={{ backgroundColor:"#A78364", color:"#fff" }}>View Analytics</button>
            </Link>
          </h6>
        </div>
        
        <div className="sort-product col d-flex">
          <h6 className="product-search-header m-2">Search images by id </h6>
          
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search"
            value={filterVal}
            onInput={(e) => handleFilter(e)}
            // onChange={(e)=> setQuery(e.target.value)}
          />{" "}
        </div>
        
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
              <h6 className="product-price">RS.{product.price}</h6>
              <Link
                to={`../../updateproduct/${product._id}`}
                className="mr-3 update-product-btn"
              >
                Update
              </Link>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-white remove-product-btn"
              >
                Remove
              </button>
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
export default ProductList;
