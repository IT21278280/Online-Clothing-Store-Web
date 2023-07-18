import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/add-employee.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UserList = () => {
  const [users, setUser] = useState([]);
  const [query, setQuery] = useState();
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5050/users/users");
    setUser(response.data);
    setQuery(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/users/delete/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setUser(query);
    } else {
      const filterResult = query.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.accountType.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUser(filterResult);
    }
    setFilterVal(e.target.value);
  };

  //Generate Report
  function downloadReport() {
    // Define the table headers and data
    const tableHeaders = ["User Name", "User Email", "Account TYpe"];
    const tableData = users.map((user) => [
      user.name,
      user.email,
      user.accountType,
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
        { text: "User Details", style: "header" },

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
      link.download = "users_details.pdf";
      link.click();
    });
  }

  return (
    <div className="mt-5 ">
      <div className="input-group rounded ">
        <input
          type="text"
          className="form-control rounded mb-5"
          placeholder="Search"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
          // onChange={(e)=> setQuery(e.target.value)}
        />
      </div>
      <div className="text-right">
       
         

          {/* create download button */}
          <button
            class="btn btn-primary"
            className="my-btn"
            onClick={downloadReport}
          >
            Download Report
          </button>
        
      </div>
      <h3 className="text-center mb-5 fw-bold">All Users</h3>
      <div className="column is-half">
        <table className="table is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.accountType}</td>

                <td>
                  <Link
                    to={`../../admin/dashboard/edit-employee/${user._id}`}
                    className="btn btn-primary mr-3 update-btn-btn"
                  >
                    Edit
                  </Link>
                  {/* <Link className="button is-info is-small mr-1" to={`admin/dashboard/edit-employee/${user._id}`}>Edit</Link> */}
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger ml-5 delete-btn-btn"
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
  );
};

export default UserList;
