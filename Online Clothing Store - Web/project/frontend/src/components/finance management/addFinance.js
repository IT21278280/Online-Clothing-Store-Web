import React, { useEffect, useState } from "react";
import "../../css/client.css";
import axios from "axios";
import ClientValidation from "../finance management/ClientValidation"
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';



const Service = () => {

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [reference, setReference] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { amount, category, type, date, reference, description };
        axios.post('http://localhost:5050/api/finance/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        setAmount('');
        setCategory('');
        setType('');
        setDate('');
        setReference('');
        setDescription('');

    };



    const handleClear = () => {
        //  clear input value
        setAmount('');
        setCategory('');
        setType('');
        setDate('');
        setReference('');
        setDescription('');
    };

    useEffect(() => {
        axios.get('http://localhost:5050/api/finance/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);








    return (
        <div>
            <div className="container main_finance_container">
                <br />
                <br />
                <div className="item fw-bold text-center">Finance Management</div>


                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-9">
                        <div className="col">
                            <h1 className="text-center">Add New Finance</h1>
                            <div className="row mt-5 px-3">



                                <form id="clientForm" onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col d-flex justify-content-end align-items-center">
                                            <div className="col d-flex justify-content-end">

                                                <div>

                                                    <button
                                                        hidden
                                                        className="btn btnEditImg"
                                                        id="btnEditImg"
                                                        type="button"
                                                    >
                                                        <i className="fa-solid fa-pen text-white" />
                                                    </button>
                                                    <button
                                                        hidden
                                                        className="btn btnImgDelete"
                                                        id="btnImgDelete"
                                                        type="button"
                                                    >
                                                        <i className="fa-solid fa-trash-can d-inline text-white" />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>




                                    <div className="row mt-4">
                                        <div className="col">

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Amount"
                                                value={amount}
                                                onChange={(event) => setAmount(event.target.value)}

                                            />
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Category"
                                                value={category}
                                                onChange={(event) => setCategory(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter type"
                                                value={type}
                                                onChange={(event) => setType(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Enter Date"
                                                value={date}
                                                onChange={(event) => setDate(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Reference"
                                                value={reference}
                                                onChange={(event) => setReference(event.target.value)}
                                            />
                                        </div>

                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Description"
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)}
                                            />
                                        </div>
                                    </div>




                                    <div className="row my-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary finance-btn-add-submit"

                                            >
                                                Submit
                                            </button>
                                            <button

                                                type="button"
                                                className="btn btn-danger finance-btn-clear-submit"

                                                onClick={handleClear}
                                            >
                                                Clear
                                            </button>
                                            <Link to="/finance/chart">
                                                <button
                                                    type="button"
                                                   
                                                    className="btn btn-success finance-btn-view-submit"

                                                    onClick={() => { }}
                                                >
                                                    View
                                                </button>
                                            </Link>

                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>





                </div>
            </div>


        </div>
    );
};

export default Service;
