import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';


function TailoringCart() {

    const [tailoringInfo, setTailoringInfo] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [productAdd, setProductAdd] = useState([]);



    function add(name, type, style, size) {
        const obj = { name, type, style, size }
        setProductAdd([...productAdd, obj]);
    }

    const cart = () => {
        let totalItems = productAdd.length;
        setTotalItems(totalItems)
    }
    const clear = () => {
        setTotalItems(0)
        setProductAdd([])
    }

    function print() {
        let x = 100
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, "Receipt")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, ' Items ')
        for (let i = 0; i < productAdd.length; i++) {
            doc.text(25, x, 'Item Code :' + " " + productAdd[i].name + " " + " " + " " + " " + "Item Category : " + productAdd[i].type + " " + " " + " " + " " + "Item Style : " + productAdd[i].style + " " + " " + " " + " " + "Item Size : " + productAdd[i].size)
            x = x + 20
        }
        x = x + 30
        doc.text(25, x, 'Total items :' + " " + totalItems)
        doc.save('Receipt.pdf')

    }

    function book() {
        window.location.href = "/addPayment"; //payemnt url add here
    }

    const getTailoringInfo = async () => {
        try {
            const res = await axios.get("http://localhost:5050" + "/tailoringInfo/alltailoringInfo/");
            setTailoringInfo(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTailoringInfo()
        cart()
    }, [productAdd])


    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
            </div>
            {/* <Navbar /> */}
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-lg-8">
                                    <div className="p-5">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <h1 className="fw-bold mb-0 text-black">Items</h1>
                                        </div>
                                        <div className='col' style={{ paddingRight: "650px" }}>
                                            <button type="button" className="btn btn-dark btn-block "
                                                style={{ backgroundColor: '#A78364', width: '200px',border:'1px solid #A78364' }} onClick={clear}>Clear Order</button>
                                        </div> 
                                        <hr className="my-4" />
                                        {tailoringInfo.map((tailoringInfo, key) => (
                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                    <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + tailoringInfo.picture} className="img-fluid rounded-3"
                                                    />
                                                </div>
                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <h6 className="">{tailoringInfo.code}</h6>
                                                    <h6 className="text-black mb-0">{tailoringInfo.category}</h6>
                                                    <h6 className="text-black mb-0">{tailoringInfo.style}</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h6 className="mb-0">{"Size : "}  {tailoringInfo.size}</h6><h6 className="mb-0">{"Color : "}  {tailoringInfo.color}</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <button size='lg' type="button" className="btn btn-dark" color="dark" style={{ fontWeight: "bold", fontSize: "12px", backgroundColor:"#A78364", border:"1px solid #A78364", color:"#fff" }} onClick={() => add(tailoringInfo.code, tailoringInfo.category, tailoringInfo.style, tailoringInfo.size)} >ADD</button>
                                                </div>

                                            </div>
                                        ))}
                                        <hr className="my-4" />

                                    </div>
                                </div>
                                <div className="col-lg-4 bg-grey">
                                    <div className="p-5">
                                        <h3 className="fw-bold mb-5 mt-2 pt-1">Your Order</h3>
                                        <hr className="my-4" />

                                        <div className="d-flex justify-content-between mb-4">
                                            <h5 className="text-uppercase ">Items </h5>
                                            <h5 className="text-uppercase">Category </h5>
                                        </div>
                                        <hr className="my-4" />

                                        {productAdd.map((productAdd, key) => (
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text">{productAdd.name}</h5>
                                                <h5>{productAdd.type}</h5>
                                            </div>
                                        ))}


                                        <hr className="my-4" />

                                        <div className="d-flex justify-content-between mb-5">
                                            <h5 className="text">Total Items</h5>
                                            <h5>{totalItems}</h5>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <button type="submit" className="btn btn-dark btn-block" onClick={print}
                                                style={{backgroundColor:"#fff", border:"1px solid #A78364", color:"#A78364"}}
                                                >Receipt</button>
                                            </div>
                                            <div className='col'>
                                                <button type="submit" className="btn btn-warning btn-block " onClick={book}
                                                style={{backgroundColor:"#A78364", border:"1px solid #A78364", color:"#fff"}}
                                                >Book</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </center >
            {/* <Footer /> */}
        </div >
    )
};

export default TailoringCart
