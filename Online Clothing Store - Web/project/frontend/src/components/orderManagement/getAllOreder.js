
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/getorder.css";
import { Link } from "react-router-dom";
//import "../../css/add-employee.css";

import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderList = () => {
  const [orders, setOrder] = useState([]);
  const [query, setQuery] = useState("");
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    getorders();

  }, []);

  const getorders = async () => {
    try {
    const response = await axios.get("http://localhost:5050/api/Order/Allorder");
    setOrder(response.data);
    setQuery(response.data);

    }catch (error) {
        console.log(error);
      }
  };

  const deleteorder = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/Order/orderDelete/${id}`);
      getorders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setOrder(query);
    } else {
      const filterResult = query.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.product.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setOrder(filterResult);
    }
    setFilterVal(e.target.value);
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumns = [
      "ID",
      "Name",
      "Address",
      "Product",
      "Total",
      "Contact",
      "Status",
    ];
    const tableData = orders.map((order, index) => [
      index + 1,
      order.name,
      order.address,
      order.product,
      order.total,
      order.contact,
      order.status,
    ]);
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
    });
    doc.save("orders.pdf");
  };



  console.log("orders:", orders);

  return (
    <div classNameName="columns mt-5">
      
     
      <h3 className="orderTopic" >All orders</h3>

      <div className="input-group rounded">
        <input
          type="text"
          className="form-control orderSearch rounded"
          id="searchBox"
          placeholder="search orders"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        //   onChange={(e)=> setQuery(e.target.value)}
        />
        
      </div>


      <div classNameName="column is-half">
        <table classNameName="table orderTable is-fullwidth mt-2" id="orderTable">
          <thead>
            <tr className="orderTr">
                <th>id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Product</th>
              <th>Total</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.product}</td>
                <td>{order.total}</td>
                <td>{order.contact}</td>
                <td>{order.status}</td>

                <td>
                <Link
                    to={{
                      pathname: `../updateOrders/${order._id}`,
                      state: {order},
                    }}
                    className="editBtn"
                    style={{backgroundColor:"#A78364", border:"1px solid #A78364", color:"#fff" }}
                  >
                    Edit
                  </Link>
                  {/* <Link classNameName="button is-info is-small mr-1" to={`admin/dashboard/edit-employee/${order._id}`}>Edit</Link> */}
                  <button
                    onClick={() => deleteorder(order._id)}
                    className="deleteBtn"
                    style={{backgroundColor:"#fff", border:"1px solid #A78364", color:"#A78364" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         {/* <div className="">
            <button type="button" class="btn btn-dark" id="AddOrderButton"><a href="/addOrder">Add orders</a></button>
          </div> */}

          <div>
              <div className="column mt-5">
                <button className="button is-success mr-2 orderPdfGen" onClick={generatePDF}>
                  Generate PDF
                </button>
            </div>
          </div>     
              
      </div>
    </div>
  );
};

export default OrderList;


