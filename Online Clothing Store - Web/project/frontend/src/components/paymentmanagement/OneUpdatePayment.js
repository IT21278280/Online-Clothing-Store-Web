import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import "../../css/payment.css";

export default function UpdatePayment() {

    const[paymentMethod,setPaymentMethod]=useState("")
    const[cardNumber,setCardNumber]=useState("")
    const[cvv,setCvv]=useState("")
    const[expDate,setExpDate]=useState("")

    const {id} =useParams();

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


           // update selected payment record
           function UpdatePayment(){

            const updatedData={
                    paymentMethod,
                    cardNumber,
                    cvv,
                    expDate,
            };
                 axios.put("http://localhost:5050/paycustomers/updatePayment/"+id,updatedData).then(()=>{
                     alert("Payment Info Update Successfuly.")
                 }).catch((err)=>{
                     alert(err)
                 })
           }

  
  return (
    <div>

        <div className="container">

            <h5 className='subTitle'> Please Update your Payment Info, </h5>
            <p> </p>
            <p> </p>

            {/* create one upadte payment record form */}
            <form>

                {/*payment Method*/}
                <div className="form-check">
                    <b><label className="form-check-label"> Payment Method : </label> </b>
                    <input type = "text" name = "paymentMethod" className = "form-control" id = "paymeth" placeholder = "Enter Payment Method" onChange = {(e)=>setPaymentMethod(e.target.value)}  value={paymentMethod || ""}/>
                    <div className="invalid-feedback"> Invalid Payment Method </div>
                </div>


                <p> </p>

                
                {/*Card Number*/}
                <div className="form-check">
                    <b><label className="form-check-label"> Card Number : </label></b>
                    <input type = "number" name = "cardNumber" className = "form-control" id = "cnumber" placeholder = "Enter Card Number" onChange = {(e)=>{setCardNumber(e.target.value) ;}}  value={cardNumber || ""} required/>
                    <div className="invalid-feedback"> Invalid Card Number </div>
                </div>


                <p> </p>


                {/*CVV Number*/}
                <div className="form-check">
                    <b><label className="form-check-label"> CVV Number : </label></b>
                    <input type = "number" name = "cvv" className = "form-control" id = "cvv" placeholder = "Enter CVV Number" onChange = {(e)=>{setCvv(e.target.value) ;}}  value={cvv || ""} required/>
                    <div className="invalid-feedback"> Invalid CVV Number </div>
                </div>


                <p> </p>


                {/*Expiration Date*/}
                <div className="form-check">
                    <b><label className="form-check-label"> Expiration Date : </label></b>
                    <input type = "date" name = "ExpDate" className = "form-control" id = "expDate" aria-describedby="emailHelp" onChange = {(e)=>{setExpDate(e.target.value) ;}}  value={expDate || ""} />
                    <div className="invalid-feedback"> Invalid Expiration Date </div>
                </div>


                <p> </p>


                {/*Submit Button*/}
                <div className="form-check">
                    <center>
                        <Link to={'../OnePayment/'+id}><button class="btn btn-primary" className = "my-btn" type="submit" onClick={(e)=>{UpdatePayment()}}> Upade my Payment Info </button></Link> {'  '}
                        <button class="btn btn-primary" className = "my-btn" type="reset"> Clear my Updated Payment Info </button>
                    </center>
                </div>

            </form>



        </div>
      
    </div>
  )
}