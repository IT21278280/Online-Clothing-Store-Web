import React,{useState} from "react";
import axios from "axios" ;
import "../../css/payment.css";
import CryptoJS from "crypto-js";


export default function AddPayment() {

    const [paymentMethod, setPaymentMethod] = useState("") ;
    const [cardNumber, setCardNumber] = useState("") ;
    const [cvv, setCvv] = useState("") ;
    const [ExpDate, setExpDate] = useState("") ;

    // create function of send to data
    function sendData(e) {
        e.preventDefault() ;

        // create object
        const newPayment = {

            paymentMethod,
            cardNumber,
            cvv,
            ExpDate

        }

        console.log(newPayment) ;

        //const encryptedPayment = CryptoJS.AES.encrypt(JSON.stringify(newPayment), "secret key");

        axios.post("http://localhost:5050/paycustomers/addPayment", newPayment).then((response) => {
            const paymentId = response.data.id; 
            //alert(`Payment Added with ID ${paymentId}`); 
            alert(`Your Payment is Succesful.`); 
            window.location.replace(`./OnePayment/${paymentId}`); 
        }).catch((err)=> {
            alert(err)
        })

    }

    return(

        <div className = "container">

            <b><h1 className = "title"> <center> Payment Portal.... </center> </h1></b>

            <b><h5 className="subTitle text-center my-4"> Please Enter your Payment Details, </h5></b>
            <p> </p>

            {/* create payment form */}

            <form onSubmit = {sendData} className ="was-validated">

                <div className="form-check">
                    <b><label className="form-check-label"> Payment Method : </label></b>
                    <input type = "text" name = "paymentMethod" className = "form-control" id = "paymeth" placeholder = "Enter Payment Method" onChange = {(e)=>{setPaymentMethod(e.target.value) ;}} required/>
                    <div className="invalid-feedback"> Invalid Payment Method </div>
                </div>


                <p> </p>

                
                {/*Card Number*/}
                <div className="form-check">
                    <b><label className="form-check-label"> Card Number : </label></b>
                    <input type = "number" name = "cardNumber" className = "form-control" id = "cnumber" placeholder = "Enter Card Number" onChange = {(e)=>{setCardNumber(e.target.value) ;}} required/>
                    <div className="invalid-feedback"> Invalid Card Number </div>
                </div>


                <p> </p>


                {/*CVV Number*/}
                <div className="form-check">
                    <b><label className="form-check-label"> CVV Number : </label></b>
                    <input type = "number" name = "cvv" className = "form-control" id = "cvv" placeholder = "Enter CVV Number" onChange = {(e)=>{setCvv(e.target.value) ;}} required/>
                    <div className="invalid-feedback"> Invalid CVV Number </div>
                </div>


                <p> </p>


                {/*Expiration Date*/}
                <div className="form-check">
                    <b><label className="form-check-label"> Expiration Date : </label></b>
                    <input type = "date" name = "ExpDate" className = "form-control" id = "expDate" onChange = {(e)=>{setExpDate(e.target.value) ;}} required/>
                    <div className="invalid-feedback"> Invalid Expiration Date </div>
                </div>


                <p> </p>


                {/*Submit Button*/}
                <div className="form-check">
                    <center> <b>
                        <button class="btn btn-primary" type="submit/" className = "my-btn"> Submit Payment Details </button> {'  '} 
                        <button class="btn btn-primary" type="reset" className = "my-btn mb-5"> Clear my Payment Info </button>
                    </b></center>
                </div>


            </form>

        </div>

    )
}