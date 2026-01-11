
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLostItems,
  getLostItemsByUsername,

} from "../../Services/LostItemService";

import { getRole } from "../../Services/LoginService";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../HeaderComponents/Footer";
import AdminHeader from "../HeaderComponents/AdminHeader";
import StudentHeader from "../HeaderComponents/StudentHeader";

const LostItemReport = () => {

  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  const showAllLostItems = async () => {
    try {
      const res = await getAllLostItems();
      // setItemList(res.data);
      setItemList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching all items", err);
    }
  };

  // Fetch USER items
  const showLostItems = async () => {
    try {
      const res = await getLostItemsByUsername();
      setItemList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching user items", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRole();
        const cleanRole = res.data?.replace("ROLE_", "");
        setRole(cleanRole);

        if (cleanRole === "Admin") {
          await showAllLostItems();
        } else if (cleanRole === "Student") {
          await showLostItems();
        }

      } catch (error) {
        console.error("Error fetching role", error);
      }
    };

    fetchData();
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else if (role === "Student") navigate("/StudentMenu");
  };

  return (
    <div

      className=""
      style={{
        background: "linear-gradient(to right, #fde7e7, #e9ffd9)",
        minWidth: "99vw",
        minHeight: "100vh"

      }}
    >
      {/* TOP GAP */}
      {role === "Admin" ? <AdminHeader /> : <StudentHeader />}

      <div className="container text-center">

        {/* HEADER */}
        <h2 className="fw-bold mb-3 mt-4" style={{ color: "#b00000" }}>
          {role === "Admin" ? "Admin Lost Item List" : "Student Lost Item List"}
        </h2>

        <hr
          style={{
            height: "3px",
            borderWidth: 0,
            backgroundColor: "red",
          }}
        />

        {/* CARD GRID */}
        <div className="row g-4 mt-4">
          {/* {itemList.map((item) => ( */}
          {Array.isArray(itemList) && itemList.map((item) => (

            <div
              key={item.lostItemId}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card shadow-sm border-0 h-100 p-2">

                {/* HEADER ROW */}
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-secondary rounded-circle me-2">
                    A
                  </span>
                  <div className="text-start">
                    <strong>{item.lostItemName}</strong> <br />
                    <small className="text-muted">{item.lostDate}</small>
                  </div>
                </div>

                <div className="mt-1 text-start px-1">
                  <h6 className="fw-bold mb-1">Details</h6>
                  <small className="d-block">
                    <strong>Lost Item ID:</strong> {item.lostItemId}
                  </small>
                  <small className="d-block">
                    <strong>Lost Item name:</strong> {item.lostItemName}
                  </small>
                  <small className="d-block">
                    <strong>Category:</strong> {item.category}
                  </small>
                  <small className="d-block">
                    <strong>Color:</strong> {item.color}
                  </small>
                  <small className="d-block">
                    <strong>Brand:</strong> {item.brand}
                  </small>
                  <small className="d-block">
                    <strong>Location:</strong> {item.location}
                  </small>
                  <small className="d-block">
                    <strong>User:</strong> {item.username}
                  </small>
                  <small className="d-block">
                    <strong>Status:</strong>{" "}
                    {item.status ? "Found" : "Not Found"}
                  </small>
                </div>

                {/* <div className="text-end mt-3">
                  <button className="btn btn-primary btn-sm px-3">
                    Contact
                  </button>
                </div> */}

                <div className="text-end mt-3">
                  {/* <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/match-search/${item.lostItemId}`)}
                  >
                    Search
                  </button> */}
                  {/* {!item.status && (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/match-search/${item.lostItemId}`)}
                    >
                      Search
                    </button>
                  )}

                  <button className="btn btn-primary btn-sm px-3">
                    Contact
                  </button> */}

                  {role === "Student" && (
                    <>
                      {!item.status && (
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/match-search/${item.lostItemId}`)}
                        >
                          Search
                        </button>
                      )}

                      <button className="btn btn-primary btn-sm px-3"
                         onClick={() => navigate(`/chat-msg`)}
                      >
                        Contact
                      </button>
                    </>
                  )}

                </div>


              </div>
            </div>
          ))}
        </div>

        {/* RETURN BUTTON */}
        <button onClick={returnBack} className="btn btn-success mt-4">
          Return
        </button>

      </div>

      <Footer />
    </div>

  )
}

export default LostItemReport