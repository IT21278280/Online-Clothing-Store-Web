import { useState,useEffect } from "react";
import axios from "axios";
import {Link,useParams} from 'react-router-dom'
import "../../css/payment.css";

export default function OnePayment () {
    // const[allData,setAlldata]=useState([])
    const { id } = useParams();

    const[paymentMethod,setPaymentMethod]=useState("")
    const[cardNumber,setCardNumber]=useState("")
    const[cvv,setCvv]=useState("")
    const[expDate,setExpDate]=useState("")

    useEffect(()=>{

        // get selected payment record
        function getData(){

            axios.get("http://localhost:5050/paycustomers/getPayment/"+id).then((res)=>{
                setPaymentMethod(res.data.paymentMethod)
                setCardNumber(res.data.cardNumber, Link)
                setCvv(res.data.cvv)
                setExpDate(res.data.expDate)
            }).catch((err)=>{
               alert(err)
            })                
        }
         getData();
       },[id])

    
    // delete selected payment record
    function deletePayment(id){
        try{
            axios.delete('http://localhost:5050/paycustomers/deletePayment/'+id)
            window.location.reload();
        }catch(err){
           alert(err)
        }
    }

   return(
       <div>

        <center><h1 className="title"> Payment Records...</h1></center>
        <p> </p>

        <center> <h5 className="subTitle"> Here your are payment details are shown and this also gives you the ability to update and delete your payment details. </h5></center>
        <p> </p>
        
        {/* craete table for one payment detail */}
        <table class="table table-dark" className="table">
            <thead>
            <tr>
                {/* craete table headers */}
                <th className="table-header">
                    Payment Method
                </th>
                <th className="table-header">
                    Card Number
                </th>
                <th className="table-header">
                    CVV Number
                </th>
                <th className="table-header">
                    Expiration Date
                </th>
                <th className="table-header">
                    Update Action
                </th>
                <th className="table-header">
                    Delete Action
                </th>
            </tr>
            </thead>

            {/* craete table body */}
            <tbody>
                    <tr>
                        <td>{paymentMethod}</td>
                        <td>{cardNumber}</td>
                        <td>{cvv}</td>
                        <td>{expDate}</td>
                        <td>
                            <Link to={'/OneUpdatePayment/'+id}>
                            <center><button class="btn btn-warning" className="my-btn">Edit</button></center>
                            </Link>
                            </td>
                        <td><button class="btn btn-danger" className="my-btn" onClick={(e)=>{deletePayment(id)}}>Delete</button></td>
                    </tr>
                
            </tbody>
        </table>

        <div> 
            <center>
                <p> </p>

                {/* navigate promotion code page */}
                <Link to = '/promotionPayment'>
                    <button class="btn btn-primary" className = "my-btn" id="my-button"> Get Promotion Code </button>
                </Link>
            </center>
        </div>

        <div> 
            <center>
                <p> </p>

                {/* navigate home page */}
                <Link to = '/homePayment'>
                   <button class="btn btn-primary" className = "my-btn" id="my-button"> Go Home Page </button>
                </Link>
            </center>
        </div>
        
        </div>

        
    )
}