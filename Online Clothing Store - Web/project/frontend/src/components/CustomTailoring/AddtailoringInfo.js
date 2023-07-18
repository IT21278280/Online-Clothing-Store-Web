import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardImage,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function AddtailoringInfo() {
  const [ecode, setECode] = useState("");
  const [style, setStyle] = useState("");
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [neckSize, setNeckSize] = useState("");
  const [chest, setChest] = useState("");
  const [west, setWest] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [length, setLength] = useState("");
  const [stomach, setStomach] = useState("");
  const [shoulderLength, setShoulderLength] = useState("");
  const [imageSelected, setimageSelected] = useState("");
  const [submit, setSubmit] = useState(true);
  const [editBtn, setEditBtn] = useState(false);
  const code = "C" + generateId();
  const [disableBtn, setDisabletn] = useState(true);
  const [tailoringInfo, setTailoringInfo] = useState([]);

  function generateId() {
    let id = "";
    for (let i = 0; i < 9; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  }

  useEffect(() => {
    valid();
    editValid();
    getTailoringInfo();
  }, [
    style,
    category,
    season,
    size,
    color,
    neckSize,
    chest,
    west,
    shoulder,
    length,
    stomach,
    shoulderLength,
    imageSelected,
  ]);

  const valid = () => {
    if (
      style !== "" &&
      category !== "" &&
      season !== "" &&
      size !== "" &&
      color !== "" &&
      neckSize !== "" &&
      chest !== "" &&
      west !== "" &&
      shoulder !== "" &&
      length !== "" &&
      stomach !== "" &&
      shoulderLength !== "" &&
      imageSelected !== ""
    ) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  };
  const editValid = () => {
    if (
      style !== "" &&
      category !== "" &&
      season !== "" &&
      size !== "" &&
      color !== "" &&
      neckSize !== "" &&
      chest !== "" &&
      west !== "" &&
      shoulder !== "" &&
      length !== "" &&
      stomach !== "" &&
      shoulderLength !== "" &&
      imageSelected !== ""
    ) {
      setDisabletn(false);
    } else {
      setDisabletn(true);
    }
  };

  function remove(code) {
    axios
      .delete(
        "http://localhost:5050" + "/tailoringInfo/deletetailoringInfo/" + code
      )
      .then(() => {
        window.location.href = "/AddtailoringInfo";
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Not Delete",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  const getTailoringInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5050" + "/tailoringInfo/alltailoringInfo/"
      );
      setTailoringInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // save
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ml_default");

    const responses = await axios.post(
      "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
      formData
    );
    const picture = imageSelected.name;
    const tailoringInfo = {
      code,
      style,
      category,
      season,
      size,
      color,
      neckSize,
      chest,
      west,
      shoulder,
      length,
      stomach,
      shoulderLength,
      picture,
    };
    try {
      const response = await axios.post(
        "http://localhost:5050" + "/tailoringInfo/addtailoringInfo",
        tailoringInfo
      );
      console.log(response.data);
      Swal.fire({
        title: "Success!",
        text: "Successfully Added",
        icon: "success",
        confirmButtonText: "OK",
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "/AddtailoringInfo";
      }, 1000);
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: "Error!",
        text: "Not Added",
        icon: "error",
        confirmButtonText: "OK",
        type: "success",
      });
      window.location.href = "/AddtailoringInfo";
    }
  };

  const preedit = (
    code,
    style,
    category,
    season,
    size,
    color,
    neckSize,
    chest,
    west,
    shoulder,
    length,
    stomach,
    shoulderLength
  ) => {
    setECode(code);
    setStyle(style);
    setCategory(category);
    setSeason(season);
    setSize(size);
    setColor(color);
    setNeckSize(neckSize);
    setChest(chest);
    setWest(west);
    setShoulder(shoulder);
    setLength(length);
    setStomach(stomach);
    setShoulderLength(shoulderLength);
    setEditBtn(true);
  };

  const edit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ml_default");

    const responses = await axios.post(
      "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
      formData
    );
    const picture = imageSelected.name;
    const code = ecode;
    const tailoringInfo = {
      code,
      style,
      category,
      season,
      size,
      color,
      neckSize,
      chest,
      west,
      shoulder,
      length,
      stomach,
      shoulderLength,
      picture,
    };
    try {
      const response = await axios.put(
        "http://localhost:5050" + "/tailoringInfo/updatetailoringInfo",
        tailoringInfo
      );
      console.log(response.data);
      Swal.fire({
        title: "Success!",
        text: "Successfully Edited",
        icon: "success",
        confirmButtonText: "OK",
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "/AddtailoringInfo";
      }, 1000);
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: "Error!",
        text: "Not Edited",
        icon: "error",
        confirmButtonText: "OK",
        type: "success",
      });
      window.location.href = "/AddtailoringInfo";
    }
  };

  return (
    <div className="dashboard-main-wrapper">
      {/* <Navbar /> */}
      <div className="dashboard-wrapper">
        <div style={{ paddingTop: "3%", paddingLeft: "2%", width: "98%" }}>
          <hr />
          <div
            className="container-fluid bg-white"
            style={{
              paddingLeft: "5%",
              paddingTop: "2%",
              paddingBottom: "2%",
              paddingRight: "5%",
            }}
          >
            <center>
              <MDBRow className="mt-3">
                <MDBCol sm="5">
                  <MDBCard className="shadow-0">
                    <MDBCardBody id="divToPrint">
                      <MDBCardImage
                        style={{ width: "95%", marginTop: "15%" }}
                        position="top"
                        alt="..."
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="1"></MDBCol>
                <MDBCol sm="6">
                  <MDBCard className="shadow-0">
                    <MDBCardBody className="bg-light">
                      <center>
                        {editBtn ? (
                          <h4>Edit Tailoring Form</h4>
                        ) : (
                          <h4>Tailoring Form</h4>
                        )}
                      </center>
                      <br />
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                              style={{ textAlign: "left" }}
                            >
                              Style
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Style"
                              onChange={(e) => {
                                setStyle(e.target.value);
                              }}
                              value={style}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                              style={{ textAlign: "left" }}
                            >
                              Category
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Category"
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                              value={category}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                              style={{ textAlign: "left" }}
                            >
                              Season
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Season (Spring/Summer)"
                              onChange={(e) => {
                                setSeason(e.target.value);
                              }}
                              value={season}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                              style={{ textAlign: "left" }}
                            >
                              Size
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Size (S/M/L)"
                              onChange={(e) => {
                                setSize(e.target.value);
                              }}
                              value={size}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                              style={{ textAlign: "left" }}
                            >
                              Color
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Color"
                              onChange={(e) => {
                                setColor(e.target.value);
                              }}
                              value={color}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <h5>Measurement Info</h5>
                      <hr />

                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              NeckSize
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter NeckSize"
                              onChange={(e) => {
                                setNeckSize(e.target.value);
                              }}
                              value={neckSize}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              Chest
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Chest"
                              onChange={(e) => {
                                setChest(e.target.value);
                              }}
                              value={chest}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              West
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter West"
                              onChange={(e) => {
                                setWest(e.target.value);
                              }}
                              value={west}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              Shoulder
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Shoulder"
                              onChange={(e) => {
                                setShoulder(e.target.value);
                              }}
                              value={shoulder}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              Length
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Length"
                              onChange={(e) => {
                                setLength(e.target.value);
                              }}
                              value={length}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              Stomach
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Stomach"
                              onChange={(e) => {
                                setStomach(e.target.value);
                              }}
                              value={stomach}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              Shoulder Length
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Shoulder Length"
                              onChange={(e) => {
                                setShoulderLength(e.target.value);
                              }}
                              value={shoulderLength}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label h6"
                            >
                              Picture
                            </label>
                            <input
                              type="file"
                              onChange={(e) => {
                                setimageSelected(e.target.files[0]);
                              }}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        {editBtn ? (
                          <button
                            type="button"
                            className="btn btn-warning d-letter-spacing "
                            onClick={edit}
                            disabled={disableBtn}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-warning d-letter-spacing "
                            onClick={handleSubmit}
                            disabled={submit}
                            style={{ backgroundColor:"#A78364", border:"1px solid #A78364", color:"#fff" }}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </center>
            <br />
            <br />
            <center>
              <h1
                className="mt-5"
                id="#current"
                style={{ color: "#606060FF", paddingBottom: "1%" }}
              >
                <u> Item List</u>
              </h1>
              <hr />
              <div
                className="card"
                style={{
                  backgroundColor: "",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  width: "95%",
                }}
              >
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {tailoringInfo.map((tailoringInfo, key) => (
                    <div className="col">
                      <div className="card h-100">
                        <img
                          src={
                            "https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" +
                            tailoringInfo.picture
                          }
                          className="card-img-top"
                          style={{
                            width: "85%",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />

                        <div className="card-body">
                          <h5 className="card-title"> {tailoringInfo.code}</h5>
                          <h6 className="card-title"> {tailoringInfo.style}</h6>
                          <h6 className="card-title">
                            {" "}
                            {tailoringInfo.category}
                          </h6>
                          <h6 className="card-title">
                            {" "}
                            {tailoringInfo.season}
                          </h6>
                          <p className="card-text">
                            Size : {tailoringInfo.size}
                          </p>
                          <p className="card-text">
                            Color :{tailoringInfo.color}
                          </p>
                          <div className="row">
                            <div className="col">
                              <button
                                type="submit"
                                className="btn btn-dark"
                                onClick={() =>
                                  preedit(
                                    tailoringInfo.code,
                                    tailoringInfo.style,
                                    tailoringInfo.category,
                                    tailoringInfo.season,
                                    tailoringInfo.size,
                                    tailoringInfo.color,
                                    tailoringInfo.neckSize,
                                    tailoringInfo.chest,
                                    tailoringInfo.west,
                                    tailoringInfo.shoulder,
                                    tailoringInfo.length,
                                    tailoringInfo.stomach,
                                    tailoringInfo.shoulderLength
                                  )
                                }
                                style={{ backgroundColor:"#A78364", border:"1px solid #A78364", color:"#fff" }}
                              >
                                Edit
                              </button>
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => remove(tailoringInfo.code)}
                                style={{ backgroundColor:"#fff", border:"1px solid #A78364", color:"#A78364" }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </center>
          </div>
          <div className="text-center">
          <Link to="/TailoringCart">
            <button
              style={{
                background: "#A78364",
                color: "#fff",
                height: "60px",
                width: "200px",
                fontSize: "25px",
              }}
              className="btn fw-bold"
            >
              Procceed
            </button>
          </Link>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default AddtailoringInfo;
