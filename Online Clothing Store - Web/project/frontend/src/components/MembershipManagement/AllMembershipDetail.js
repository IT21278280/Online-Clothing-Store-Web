import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../css/membership.css'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const MembershipList = () => {
  const [members, setMember] = useState([]);
  const [query, setQuery] = useState();
  const [filterVal, setFilterVal] = useState("");
 

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    const response = await axios.get("http://localhost:5050/memberships/membershipsDetails");
    setMember(response.data);
    setQuery(response.data);
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/memberships/deleteMembership/${id}`);
      getMember();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setMember(query);
    } else {
      const filterResult = query.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.membershipType.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setMember(filterResult);
    }
    setFilterVal(e.target.value);
  };


  //Generate Report
  function downloadReport() {
    // Define the table headers and data
    const tableHeaders = ["Membership Name", "Membership Email", "Membership TYpe"];
    const tableData = members.map((membership) => [
      membership.name,
      membership.email,
      membership.membershipType,
    ]);

    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [10, 0, 0, 10],
      },
    };

    // Create a new document
    const doc = pdfMake.createPdf({
      content: [
        { text: "Membership Details", style: "header" },

        // Add the table to the document
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [tableHeaders, ...tableData],
          },
        },
      ],
      styles: styles,
      pageSize: {
        width: 800,
        // set custom width value
        height: 1000,
        // set custom height value
      },
    });

    // Save the PDF document
    doc.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "membership.pdf";
      link.click();
    });
  }


  return (
    <div className="container mb-5">
    <div className="columns mt-5">
      <h3 className="text-center mb-5 fw-bold">All Memberships</h3>
      <div className="input-group rounded col-md-3 w-25">
        <input
          type="text"
          className="form-control rounded mb-5"
          placeholder="Search"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
          // onChange={(e)=> setQuery(e.target.value)}
        />
      </div>
      <div className="position-ralative report-generate-btn">
       
         

          {/* create download button */}
          <button
            class="btn btn-primary"
            className="my-btn"
            onClick={downloadReport}
          >
            Download Report
          </button>
        
      </div>
      <div className="column is-half">
        <table className="table is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.contact}</td>
                <td>{member.membershipType}</td>

                <td>
                  <Link
                    to={`../editMembership/${member._id}`}
                    className="btn btn mr-3 membership-update-btn-btn"
                  >
                    Edit
                  </Link>
                  {/* <Link className="button is-info is-small mr-1" to={`admin/dashboard/edit-employee/${user._id}`}>Edit</Link> */}
                  <button
                    onClick={() => deleteMember(member._id)}
                    className="btn btn ml-5 membership-delete-btn-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default MembershipList;