
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/editOrder.css";
import  {Link, useNavigate} from 'react-router-dom'
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
  const { id } = useParams();

 
  const getOrderById = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/Order/order/${id}`);
      setName(response.data.name);
      setaddress(response.data.address);
      setproduct(response.data.product);
      settotal(response.data.total);
      setcontact(response.data.contact);
      setstatus(response.data.status);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch order details.");
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);

  console.log(contact)

  const updateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5050/api/Order/order/${id}`, {
        name,
        address,
        product,
        total,
        contact

      });
      navigate('/admin/dashboard/getOrders')
      toast.success("Order Updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update order.");
    }
  };


  return (

    <div classNameName='container' id="divDetail">
      <form onSubmit={updateOrder} className="addOderborder">
      <h3 classNameName='text-center mb-5' id="addOrderHead">Update Order</h3>
        <div className="row mb-4 mt-5" >
          
          <div className="col">

            <div className="form-outline" >
              <label className="form-label " id="textForTextBox" for="form3Example1">Customer Name</label>
              <input type="text" id="form3Example1 orderInput" className="form-control Order-form-control" onChange={(e) => setName(e.target.value)} value={name || ""} />
            </div>
          </div>
          <div className="col" style={{ marginLeft: "40px" }}>
            <div className="form-outline">
              <label className="form-label" id="textForTextBox" for="form3Example2">Address</label>
              <input type="text" id="form3Example2 orderInput" className="form-control" onChange={(e) => setaddress(e.target.value)} value={address || ""} />
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label " id="textForTextBox" for="form3Example1">Product</label>
              <input type="text" id="form3Example1 orderInput" className="form-control" onChange={(e) => setproduct(e.target.value)} value={product || ""}/>
            </div>
          </div>
          <div className="col" style={{ marginLeft: "40px" }}>
            <div className="form-outline">
              <label className="form-label" id="textForTextBox" for="form3Example2">Total</label>
              <input type="text" id="form3Example2 orderInput" className="form-control" onChange={(e) => settotal(e.target.value)} value={total || ""}/>
            </div>
          </div>
        </div>
        <div className="row mb-4 mt-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label " id="textForTextBox" for="form3Example1">Contact</label>
              <input type="text" id="form3Example1 orderInput" className="form-control" onChange={(e) => setcontact(e.target.value)} value={contact || ""} />
            </div>
          </div>
          <div className="col">
            <div className="form-outline" style={{ marginLeft: "40px" }}>
            <label className="form-label addOrdertextlable" id="textForTextBox" for="form3Example2">Shipping</label>
              <input id="form3Example1"  className="form-control" placeholder="Shipping type" onChange={(e) => setstatus(e.target.value)} value={status || ""} />
                    
            </div>
          </div>
        </div>

        <br/>

        <div className="px-5 py-4">
          <input type="submit" className="btn btn-primary btn-lg  btn-orderUpdate"  value="Update Product" />
        </div>

        <div className="text-center ">
             <Link to="/getOrders" className="btn btn-danger ml-4 orderCancel">
               Cancel
            </Link>
        </div>

      </form>
      <ToastContainer/>
    </div>
  )
}
