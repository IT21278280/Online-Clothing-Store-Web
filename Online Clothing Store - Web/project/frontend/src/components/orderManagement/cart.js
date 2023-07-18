
import React, { useState, useEffect } from "react";
import "../../css/cart.css";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import cartLogo from "../../img/cartlogo3.png"
import backBtn from "../../img/back_btn.png"

import  {Link} from 'react-router-dom'


function Cart(){

    const [cartData, setCartData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);


const { id } = useParams();

const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:5050/api/cart/Allcart')
          .then(response => {
            setCartData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);


      const handleSelectAll = (event) => {
        setSelectAll(event.target.checked);
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.id !== 'flexCheckDefault' && checkbox.checked !== event.target.checked) {
                checkbox.click();
            }
        });
    };


      const handleDelete = (itemId) => {
        axios.delete(`http://localhost:5050/api/cart/cartItemDelete/${itemId}`)
            .then(response => {
                // Update the cart data in the state
                setCartData(cartData.filter(item => item._id !== itemId));
            })
            .catch(error => {
                console.log(error);
            });
    };


    const totalPrice = cartData.reduce((total, item) => {
        return total + item.product.price;
      }, 0);
      
      const itemCount = cartData.length;

      const productNames = cartData.map(item => item.product.name);
      const productNamesString = productNames.join(", ");


      const handleCheckout = () => {
        navigate('/checkout', { state: { total: totalPrice, itemCount: itemCount, productNames: productNamesString } });
    };

    const handleCartloyalty = () =>{
        navigate('/membership-category')
    }




    return(
        <div className="Initialcontainer">
            <div className="headingNlogo">
                <div className="cartHeading">
                    <h1 className="headText">My Cart</h1>
                </div>
                <div>
                    <img
                    src={cartLogo}
                    alt={"product1"}
                    className="cartLogo"
                /> 
                </div>
            </div>

            <div className="form-check form-check-cart ">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"   checked={selectAll} onChange={handleSelectAll}/>
            <label className="form-check-label" for="flexCheckDefault">
                Select all
            </label>



            </div>

            <hr className="hr_hr-blurry"/>


            <div className="partsCart">

            <div className="cartProductContainer">

            {cartData.map(item => (

                <div className="productSelectedDisplay" key={item._id}>
                
                        <hr class="productBorder" />

                        <div className="productContainer">

                            <div class="form-check imgCheckBox">
                                <input class="form-check-input" type="checkbox" value="" id={`flexCheckDefault-${item._id}`}/>
                                <label class="form-check-label" htmlFor={`flexCheckDefault-${item._id}`}>
                                    
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="imgCart1"
                                    />  
                                    
                                </label>


                            </div>
                            <div className="picDeatils">
                                
                                <div className="productName">
                                    Product Name: <span className="cartProduct_details">{item.product.name}</span>
                                    <br/><br/>
                                </div>
                                <div className="productSize">
                                    Price:<span className="cartProduct_details"> {item.product.price}/-</span>
                                    <br/><br/>
                                </div>
                                <div className="productQuantity">
                                    Quantity: <span className="cartProduct_details">1 </span>
                                </div>
                            </div>

                            <div>
                                <button type="button" onClick={() => handleDelete(item._id)} className="closeIcon" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div>
                                <div className="d-flex vrDfelx">
                                <div class="vr"></div>
                                </div>
                            </div>

                        </div>
                    </div>


                    ))}


                </div>


                    <div className="CartSummary">

                        <button type="button" onClick={()=>handleCartloyalty()} className="btn btn-outline-secondary" id="CoopunButton">Check your Loyalty offers!!</button>

                        <div className="OrderSummary">

                            <h3 className="orderSum">Order summary</h3>
                            <div>

                                     <div className="summInfo">
                                        product names:<span className="prodDetails">[ {productNamesString} ]</span>
                                    </div>
                                    
                                    <div className="summInfo">
                                        no of items:<span className="prodDetails"> {itemCount}</span>
                                    </div>

                                    <div className="summInfo">
                                        Total: <span className="prodDetails">{totalPrice} /-</span>
                                    </div>

                                    <div className="summInfo" id="continuShop-txt">
                                        Cointinue shopping!!
                                    </div>

                                   
                                
                              
                                    <div className="checkoutButton">
                                            <button type="button" onClick={()=>handleCheckout()} className="btn btn-dark checkoutBtn" id="checkout_button">Checkout</button>
                                    </div>


                                    <Link to="/products" >
                                        <div className="checkoutButton">
                                        <button type="button" class="btn btn-dark shopmoreBtn" id="chekout_button">Shop more</button>
                                        </div>
                                    </Link>

                            </div>

                        </div>

                    </div>

                </div>
               
        </div>
    )

    
}
export default Cart;

