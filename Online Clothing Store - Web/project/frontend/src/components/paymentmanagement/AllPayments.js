import { useState,useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import "../../css/payment.css";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function AllPayments () {
    const[allData,setAlldata]=useState([])

    useEffect(()=>{

        // get all data
        function showAlldata(){
              axios.get('http://localhost:5050/paycustomers/payment').then((res)=>{
                setAlldata(res.data)
              
              }).catch((err)=>{
                alert(err)
              })
        }

        showAlldata()
    },[])


    // function of delete selected payment record
    function deletePayment(id){
        try{
            axios.delete('http://localhost:5050/paycustomers/deletePayment/'+id)
            window.location.reload();
        }catch(err){
           alert(err)
        }
    }

    const styles = {
        header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
        }
     };


     // function of downloard payment report
    function downloadReport() { 

        // Define the table headers and data 
        const tableHeaders = ['Payment Method', 'Card Number', 'CVV Number', 'Expiration Date']; 
        const tableData = allData.map(item => [item.paymentMethod, item.cardNumber, item.cvv, item.expDate]); 

        // Create a new document 
        const doc = pdfMake.createPdf({ content: [ 
            { text: "Payment Record Details", style: "header" },

            // Add the table to the document
             { table: { 
                headerRows: 1, 
                widths: ['*', '*', '*', '*'], 
                body: [ tableHeaders, ...tableData, ], 
            }, }, ], 
            styles:styles,
            pageSize: { width: 800, 
                // set custom width value 
                height: 1000, 
                // set custom height value
             },
            });

             // Save the PDF document 
             doc.getBlob((blob) => { 
                const url = URL.createObjectURL(blob); 
                const link = document.createElement('a'); 
                link.href = url; 
                link.download = 'payment_report.pdf'; 
                link.click();   
            }); 
        }

   return(
       <div className="container">

        <center><h1 className="title"> Payment Records...</h1></center>
        <p> </p>

        <center> <h5 className="subTitle my-5"> Here your are payment details are shown and this also gives you the ability to update and delete your payment details. </h5></center>
        <p> </p>
        
        {/* create table of consist all payment details */}
        <table class="table table-dark" className="table">
            <thead>

            {/* create table headers     */}
            <tr>
                <th className="table-header">
                    Payment Method
                </th>
                <th className="table-header">
                    Card Number
                </th>
                <th className="table-header">
                    CVV Number
                </th>
                <th className="table-header">
                    Expiration Date
                </th>
                <th className="table-header">
                    Update Action
                </th>
                <th className="table-header">
                    Delete Action
                </th>
            </tr>
            </thead>

            {/* craete table body */}
            <tbody>
                {allData.map((item,index)=>(
                    <tr key={index}>
                        <td>{item.paymentMethod}</td>
                        <td>{item.cardNumber}</td>
                        <td>{item.cvv}</td>
                        <td>{item.expDate}</td>
                        <td>
                            {/* create update button */}
                            <Link to={'/admin/dashboard/updatePayment/'+item._id}>
                            <center><button class="btn btn-warning" className="my-btn">Edit</button></center>
                            </Link>
                            </td>

                            {/* craete delete button */}
                        <td><button className="btn btn-danger payment-delete-btn" onClick={(e)=>{deletePayment(item._id)}}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div> 
            <center>
                <p> </p>

                {/* create download button */}
                <button class="btn btn-primary" className="my-btn" onClick={downloadReport}>Download Report</button>
            </center>
        </div>

        <div> 
            <center>
                <p> </p>
                <Link to = '/homePayment'>

                    {/* navigate home page */}
                   <button class="btn btn-primary" className = "my-btn mb-5"> Go Home Page </button>
                </Link>
            </center>
        </div>
        
        </div>

        
    )
}