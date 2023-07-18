import React, { useState } from "react";
import axios from 'axios';
import '../../css/product.css'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Test2() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [subImage1, setSubImage1] = useState("");
  const [subImage2, setSubImage2] = useState("");
  const [subImage3, setSubImage3] = useState("");

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();

    const data = {
      name: name,
      price: price,
      description: description,
      category: category,
      image: mainImage,
      image1: subImage1,
      image2: subImage2,
      image3: subImage3,
    };

    axios
      .post(" http://localhost:5050/products/addProduct", data)
      .then((res) => {
        console.log(res);
        navigate('../management')
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  }
  return (

    <div classNameName='container'>
      <form onSubmit={(e) => handleSubmit(e)}>
      <h3 classNameName='text-center mb-5'>Add Product</h3>
        <div className="row mb-4 mt-5">
          
          <div className="col">

            <div className="form-outline">
              <label className="form-label " for="form3Example1">Product name</label>
              <input type="text" id="form3Example1" className="form-control" onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label" for="form3Example2">Price</label>
              <input type="text" id="form3Example2" className="form-control" onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label " for="form3Example1">Description</label>
              <input type="text" id="form3Example1" className="form-control" onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label" for="form3Example2">Category</label>
              <input type="text" id="form3Example2" className="form-control" onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label " for="form3Example1">Main Image</label>
              <input type="text" id="form3Example1" className="form-control" onChange={(e) => setMainImage(e.target.value)} />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label" for="form3Example2">Sub Image 1</label>
              <input type="text" id="form3Example2" className="form-control" onChange={(e) => setSubImage1(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label " for="form3Example1">Sub Image 2</label>
              <input type="text" id="form3Example1" className="form-control" onChange={(e) => setSubImage2(e.target.value)} />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label" for="form3Example2">Sub Image 3</label>
              <input type="text" id="form3Example2" className="form-control" onChange={(e) => setSubImage3(e.target.value)} />
            </div>
          </div>
        </div>



        <div className="px-5 py-4">
          <input type="submit" className="btn btn-primary btn-lg add-product-btn" value="Add Product" />
        </div>

      </form>
      <ToastContainer/>
    </div>
  )
}
