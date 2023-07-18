import React, { useState } from "react";
import axios from 'axios';
import "../../css/AddOrder.css";
import  {useNavigate, Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddOrder() {

  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [product, setproduct] = useState("");
  const [total, settotal] = useState("");
  const [contact, setcontact] = useState("");
  const [status, setstatus] = useState("");

  // const [subImage1, setSubImage1] = useState("");
  // const [subImage2, setSubImage2] = useState("");
  // const [subImage3, setSubImage3] = useState("");

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();

    const data = {
      name: name,
      address: address,
      product: product,
      total: total,
      contact: contact,
      status: status
    };

    axios
      .post(" http://localhost:5050/api/Order/order/new", data)
      .then((res) => {
        console.log(res);
        navigate('/admin/dashboard/getOrders')
        toast.success("Order added successfully! ");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add order.");
      });
  }

  
  return (

    <div classNameName='container' id="divDetail">
      <form onSubmit={(e) => handleSubmit(e)} className="addOderborder" id="addOderborder">
      <h3 classNameName='text-center mb-5' id="addOrderHead">--Add Order--</h3>
        <div className="row mb-4 mt-5  orderFlex" >
          
          <div className="col">

            <div className="form-outline" >
              <label className="form-label addOrdertextlable" id="textForTextBox" for="form3Example1 ">Customer Name</label>
              <input type="text" id="form3Example1 orderInput " className="form-control orderInput " placeholder="Enter customer Name" onChange={(e) => setName(e.target.value)} required/>
            </div>
          </div>
          <div className="col"  style={{ marginLeft: "40px" }}>
            <div className="form-outline">
              <label className="form-label addOrdertextlable" id="textForTextBox" for="form3Example2">Address</label>
              <input type="text" id="form3Example2 orderInput" className="form-control orderInput" placeholder="Enter Address" onChange={(e) => setaddress(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label addOrdertextlable " id="textForTextBox" for="form3Example1">Product</label>
              <input type="text" id="form3Example1 orderInput" className="form-control orderInput" placeholder="Enter product name" onChange={(e) => setproduct(e.target.value)} required/>
            </div>
          </div>
          <div className="col">
            <div className="form-outline addOrdertextlable" style={{ marginLeft: "40px" }}>
              <label className="form-label" id="textForTextBox" for="form3Example2">Total</label>
              <input type="text" id="form3Example2 orderInput" className="form-control orderInput" placeholder="Enter Total" onChange={(e) => settotal(e.target.value)} required/>
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label addOrdertextlable" id="textForTextBox" for="form3Example1">Contact</label>
              <input type="text" id="form3Example1 orderInput" className="form-control orderInput" placeholder="Enter contact" onChange={(e) => setcontact(e.target.value)}  required/>
            </div>
          </div>
          <div className="col" style={{ marginLeft: "40px" }}>
            <div className="form-outline">
              <label className="form-label addOrdertextlable" id="textForTextBox" placeholder="Select status" for="form3Example2">Shipping</label>
              <input id="form3Example1" className="form-control orderInput" placeholder="Shipping type" onChange={(e) => setstatus(e.target.value)}/>
                   
            </div>
          </div>
        </div>
        <br/>

        <div className="px-5 py-4">
          
          <input type="submit" className="btn btn-primary btn-lg add-product-btn" id="addOrderbtn" value="Add Order" />
          
        </div>

      </form>
      <ToastContainer />
    </div>
  )
}
