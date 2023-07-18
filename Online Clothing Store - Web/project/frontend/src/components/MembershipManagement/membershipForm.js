import React, { useState } from "react";
import MembershipImage from "../../img/mImage.jpg";
import "../../css/membership.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function MembershipForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();

    const data = {
      name: name,
      email: email,
      contact: contact,
      membershipType: membershipType,
    };

    axios
      .post("http://localhost:5050/memberships/registerMembership", data)
      .then((res) => {
        console.log(res);
        navigate("/addPayment");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  }
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-md-6 px-0">
          <img
            src={MembershipImage}
            alt="Login image"
            className=" membershipImage"
          />
        </div>

        <div className="col-md-4 text-black float-right membership-form-container">
          <div className=" px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <form
              className="float-right shadow-lg bg-white rounded m-form-container "
              onSubmit={(e) => handleSubmit(e)}
            >
              <h3 className="fw-normal mb-3 pb-3">Membership Form</h3>

              <div className="form-outline mb-4">
                <label className="form-label">Full Name : </label>
                <input
                  type="text"
                  className="form-control form-control-md"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Email : </label>
                <input
                  type="email"
                  className="form-control form-control-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">Contact : </label>
                <input
                  type="text"
                  className="form-control form-control-md"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">Membership Type : </label>
                <br />
                <br />
                <input
                  type="radio"
                  value="Gold"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                />{" "}
                Gold
                <input
                  type="radio"
                  value="Bronze"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                />{" "}
                Platinum
                <input
                  type="radio"
                  value="Silver"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                />{" "}
                Silver
                <input
                  type="radio"
                  value="Bronze"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                />{" "}
                Bronze
              </div>

              <div className="pt-1 mb-4">
                <p className="small mb-5 pb-lg-2">
                  <input type="checkbox" className="terms" />I agree to the
                  terms and conditions.
                </p>
                <input
                  type="submit"
                  className="membership-form-btn"
                  value="Register"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
