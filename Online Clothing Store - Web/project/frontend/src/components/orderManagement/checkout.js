
import "../../css/checkout.css";
import { Modal, Button } from 'react-bootstrap';

import { useLocation, Link } from 'react-router-dom';
import React, { useState} from "react";


function Checkout(){


    const location = useLocation();
  const { itemCount, total, productNames } = location.state;


//   const twilio = require('twilio');
//   const accountSid = '3466625626tf';
//   const authToken = '653auth';
//   const client = twilio(accountSid, authToken);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fullTotalPrice = total + 300 + 200;

    const [reminderDate, setReminderDate] = useState("");
    const [reminderContact, setReminderContact] = useState("");
    const [reminderDetails, setReminderDetails] = useState(`Number of items: ${itemCount}\nTotal amount: ${fullTotalPrice}\nProduct names: ${productNames}\nvisit your cart: www.fashionfiesta.com`);



    // const handleReminderSubmit = () => {
    //     const messageBody = reminderDetails;
      
    //     client.messages
    //       .create({
    //         body: messageBody,
    //         from: '07666777',
    //         to: reminderContact
    //       })
    //       .then(() => {
    //         handleClose();
    //         window.alert('SMS sent successfully!');
    //       })
    //       .catch((error) => {
    //         console.error('Error sending SMS:', error);
    //         window.alert('Failed to send SMS. Please try again.');
    //       });
    //   };



    const handleReminderSubmit = () => {
        // Do something with the reminder details
        console.log(reminderDate, reminderContact, reminderDetails);
        // Close the modal
        handleClose();

        window.alert("SMS sent successfully!");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('textBoxName_input');
        const nameValue = nameInput.value;
        window.alert(`${nameValue} Your details are valid successfully!`);
    }


    return(
        <div className="checkoutDiv1">
            <h1 className="checkoutHead">Checkout</h1>

            <hr className="hr_hr-blurry" />

            <div className="BuyerNorderInfo">

                <div className=" buyerInfoSec">
                <div className="bInfo">
                    Buyer Information
                </div>

                <hr className="buyerLine" id=""/>

                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="col buyerName">
                            <label className="textForTextBox ">Name</label>
                            <input type="text" class="form-control textBoxCheckout" id="textBoxName_input" placeholder="Name" required/>
                            <br/>
                        </div>
                        <div class="col buyerEmail" style={{ marginLeft: "40px" }}>
                            <label className="textForTextBox">Email</label>
                            <input type="email" class="form-control textBoxCheckout" id="textBox" placeholder="Email" required/>
                            <br/>
                        </div>
                    </div>

                    <div className="row">

                        <div class="col">
                            <br/>
                            <label className="textForTextBox">Address</label>
                            <select className="form-control textBoxCheckout" id="citySelect" placeholder="Select city" required>
                            <option value="" disabled selected>Select City</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Galle">Galle</option>
                                <option value="Jaffna">Jaffna</option>
                                </select>
                            <br/>
                            <input type="text" className="form-control textBoxCheckout" id="textBox" placeholder="Street name" required/>
                            <br/>
                            <input type="text" class="form-control textBoxCheckout" id="textBox" placeholder="House Number"/>

                            
                            <br/>
                            <label className="textForTextBox">product names</label>
                            <input type="text" className="form-control textBoxCheckout" id="textBox" value={productNames} />
                            <br/>
                            
                        
                             
                             
                             <button type="button" class="btn btn-warning" id="remBtn" onClick={handleShow}></button>
                             <p className="bellTitle">Set Reminder</p>
                        </div>

                        <div className="col" style={{ marginLeft: "40px" }}>

                            <br/>
                            <label className="textForTextBox">Contact No.</label>
                            <input type="number" className="form-control textBoxCheckout" id="textBox" placeholder="07-xxxxxxx" required />

                            <br/><br/>
                            <label className="textForTextBox">Shipping Type</label>
                            <select className="form-control textBoxCheckout" id="textBox" required>
                                <option value="">Select shipping type</option>
                                <option value="Express">Express Delivery</option>
                                <option value="Normal Delivery">Normal Delivery</option>
                            </select>
                            <br/>

                            <br/>
                            <label className="textForTextBox">Voucher & promotion</label>
                            <input type="text" className="form-control textBoxCheckout" id="textBox" placeholder="Enter code XXXX" maxlength="4" minLength="4"/>
                            <br/><br/>

                            <p className="discTitle">Check above entered details</p>

                            <input type="submit" class="btn btn-secondary btn-lg" id="negoBtn" value="Check Details" />

                        </div>



                        <Modal show={show} onHide={handleClose}>
                        <Modal.Title className="reminderTitle">Set Reminder</Modal.Title>
                        <Modal.Header/>
                        <Modal.Body className="reminderTab">
                            <label className="textForTextBox">Reminder Date</label>
                            <input type="date" className="form-control" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)}/>
                            <br/>
                            <label className="textForTextBox">Reminder Contact</label>
                            <input type="text" className="form-control" placeholder="Phone number or Email" value={reminderContact} onChange={(e) => setReminderContact(e.target.value)} required/>
                            <br/>
                            <label className="textForTextBox">Reminder Details</label>
                            <textarea className="form-control" rows="5" placeholder="Details of the reminder" value={reminderDetails} onChange={(e) => setReminderDetails(e.target.value)}/>
                        </Modal.Body>
                        <Modal.Footer className="reminderFooter">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleReminderSubmit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    </div>
                    
   
                </form>

                </div>

                <div className="orderSummary">

                <div className="bInfo">
                    product Information
                </div>

                <hr className="productBorder" />

                <div className="OrderSum">

                            <h3 className="orderSum">Order summary</h3>
                            <div>
                                    
                                    <div className="summInfo">
                                        no of items: {itemCount}
                                    </div>

                                    <div className="summInfo">
                                        Subtotal: {total}
                                    </div>

                                    <div className="summInfo">
                                        Shipping: 300 Rs
                                    </div>

                                    <div className="summInfo">
                                        Tax: 200 Rs.
                                    </div>

                                    <div className="summInfo">
                                        Total: {fullTotalPrice}
                                    </div>

                                    <div className="summInfo" id="continueShop-txt">
                                        Cointinue shopping!!
                                    </div>

                                    <div className="checkoutButton">
                                        <Link to="/addPayment">
                                    <button type="button" class="btn btn-dark" id="chekout_button">confirm</button>
                                    </Link>
                                    </div>

                            </div>

                        </div>


                </div>

            </div>

           

           

        </div>

        
    )

    
}

export default Checkout;