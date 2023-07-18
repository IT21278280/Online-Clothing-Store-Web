import React, { useState } from "react";
import "../../css/payment.css";

export default function HomePayment() {
    const [promoCode, setCode] = useState('');
  
    // create random generate code with letters and numbers
    function generateCode() {
      let code = '';
      const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
      for (let i = 0; i < 6; i++) {
        code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
      }
  
      return code;
    }


  function handleGenerateCode() {
    const newCode = generateCode();
    setCode(newCode);
  }

  
  return (
    <div className="container">
      <form>
        {/*Button*/}
         <div className="form-check">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <center>
              <button
                class="btn btn-primary"
                type="button"
                className="my-btn"
                onClick={handleGenerateCode}
              >
                Promotion Code
              </button>
            </center>
            <center>
            <br/>
            <br/>
            <br/>
              {promoCode && <p> Your Promotion Code is : {promoCode}</p>}
            </center>
        </div>
      </form>
    </div>
  );
}