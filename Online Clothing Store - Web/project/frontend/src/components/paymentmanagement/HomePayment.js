import {Link } from "react-router-dom";
import "../../css/payment.css";

export default function HomePayment() {

  return (
    <div className="container">
      <form>
        {/*Button*/}
         <div className="form-check">
         <center>
            <b>
              <br />
              <br />
              <br />
      
           

              {/* navigate add payment page */}
              <Link to="../addPayment">
                <button class="btn btn-primary" type="button" className="my-btn home-paymemt-btn">
                  Go to Payment Details
                </button>{" "}
                {"  "}
              </Link>
              <br />
              <br /> 

              {/* navigate all payment page */}
               <Link to="../AllPayments.js">
                <button class="btn btn-primary" type="button" className="my-btn home-paymemt-btn">
                  Go to All Payment Records
                </button>{" "}
              </Link>
              <br />
              <br />

              {/* navigate promotion code page */}
              <Link to="../promotionPayment">
                <button
                    class="btn btn-primary"
                    type="button"
                    className="my-btn home-paymemt-btn"
                >
                    Get Promotion Code
                </button>
              </Link>
              <br />
              <br />

              {/* navigate downloard report page */}
              <Link to="../AllPayments.js">
                <button class="btn btn-primary" type="button" className="my-btn mb-5 home-paymemt-btn">
                  Download Payment Report
                </button>{" "}
              </Link>
              
            </b>
          </center>
        </div>
      </form>
    </div>
  );
}