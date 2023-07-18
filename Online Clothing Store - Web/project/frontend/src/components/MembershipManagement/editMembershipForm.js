import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MembershipImage from "../../img/mImage.jpg";
import "../../css/membership.css";
import axios from "axios";

export default function EditMembershipForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getMemberById();
  }, []);

  const getMemberById = async () => {
    const response = await axios.get(
      `http://localhost:5050/memberships/membership/${id}`
    );
    setName(response.data.name);
    setEmail(response.data.email);
    setContact(response.data.contact);
    setMembershipType(response.data.membershipType);
    // alert(response.data.name);
  };

  const updateMember = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5050/memberships/updateMembership/${id}`,
        {
          name,
          email,
          contact,
          membershipType,
        }
      );
      navigate("/admin/dashboard/allMembership");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
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
              onSubmit={updateMember}
            >
              <h3 className="fw-normal mb-3 pb-3">Edit Membership Form</h3>

              <div className="form-outline mb-4">
                <label className="form-label">Full Name : </label>
                <input
                  type="text"
                  className="form-control form-control-md"
                  onChange={(e) => setName(e.target.value)}
                  value={name || ""}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Email : </label>
                <input
                  type="email"
                  className="form-control form-control-md"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email || ""}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label">Contact : </label>
                <input
                  type="text"
                  className="form-control form-control-md"
                  onChange={(e) => setContact(e.target.value)}
                  value={contact || ""}
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
                  checked={membershipType === "Gold"}
                />{" "}
                Gold
                <input
                  type="radio"
                  value="Platinum"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                  checked={membershipType === "Platinum"}
                />{" "}
                Platinum
                <input
                  type="radio"
                  value="Silver"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                  checked={membershipType === "Silver"}
                />{" "}
                Silver
                <input
                  type="radio"
                  value="Bronze"
                  name="mType"
                  className="m-Type"
                  onChange={(e) => setMembershipType(e.target.value)}
                  checked={membershipType === "Bronze"}
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
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
