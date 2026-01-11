
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllFoundItems, getFoundItemsByUsername } from "../../Services/FoundItemService";

import { getRole } from "../../Services/LoginService";

import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../HeaderComponents/Footer";
import AdminHeader from "../HeaderComponents/AdminHeader";
import StudentHeader from "../HeaderComponents/StudentHeader";

const FoundItemReport = () => {

    let navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [role, setRole] = useState("");

    const showAllFoundItems = async () => {
        try {
            const res = await getAllFoundItems();
            setItemList(res.data);
        } catch (err) {
            console.error("Error fetching all items", err);
        }
    };

    // const showStudentFoundItems = async () => {
    //     try {
    //         const res = await getActiveFoundItemsByUser();
    //         setItemList(res.data);
    //     } catch (err) {
    //         console.error("Error fetching student active found items", err);
    //     }
    // };


    // Fetch USER items
    const showFoundItems = async () => {
        try {
            const res = await getFoundItemsByUsername();
            setItemList(res.data);
        } catch (err) {
            console.error("Error fetching user items", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRole();
                const userRole = res.data;
                setRole(userRole);

                if (userRole === "Admin") {
                    await showAllFoundItems();
                } else if (userRole === "Student") {
                    await showFoundItems();
                    // await showStudentFoundItems();
                }
            } catch (error) {
                console.error("Error fetching role", error);
            }
        };

        fetchData();
    }, []);

    const returnBack = () => {
        if (role === 'Admin') {
            navigate('/AdminMenu');
        }
        else if (role === 'Student') {
            navigate('/StudentMenu');
        }

    }

    return (
        <div
            className=""
            style={{
                background: "linear-gradient(to right, #fde7e7, #e9ffd9)",
                minWidth: "99vw",
                minHeight: "100vh"

            }}
        >

            {role === "Admin" ? <AdminHeader /> : <StudentHeader />}

            <div className="container text-center">

                {/* HEADER */}
                <h2 className="fw-bold mb-3 mt-4" style={{ color: "#b00000" }}>
                    {role === "Admin" ? "Admin Found Item List" : "Student Found Item List"}
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
                    {itemList.map((item) => (
                        <div
                            key={item.foundItemId}
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                        >
                            <div className="card shadow-sm border-0 h-100 p-2">

                                {/* HEADER ROW */}
                                <div className="d-flex align-items-center mb-2">
                                    <span className="badge bg-secondary rounded-circle me-2">
                                        A
                                    </span>
                                    <div className="text-start">
                                        <strong>{item.foundItemName}</strong> <br />
                                        <small className="text-muted">{item.foundDate}</small>
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div className="mt-1 text-start px-1">
                                    <h6 className="fw-bold mb-1">Details</h6>
                                    <small className="d-block">
                                        <strong>Found Item ID:</strong> {item.foundItemId}
                                    </small>
                                    <small className="d-block">
                                        <strong>Found Item name:</strong> {item.foundItemName}
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
                                        {/* <strong>Status:</strong>{" "}
                                        {item.status ? "Found" : "Not Found"} */}
                                        <strong>Status:</strong>{" "}
                                        {item.status ? "Returned" : "Not Returned"}
                                    </small>
                                </div>

                                <div className="text-end mt-3">
                                    {/* <button className="btn btn-primary btn-sm px-3">
                                        Contact
                                    </button> */}

                                    {role === "Student" && (
                                        <>
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

            {/* BOTTOM GAP */}
            <Footer />
        </div>

    )
}

export default FoundItemReport