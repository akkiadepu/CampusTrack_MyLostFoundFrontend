
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMatchItem } from "../../Services/MatchItemService";
import { getRole } from "../../Services/LoginService";
import AdminHeader from "../HeaderComponents/AdminHeader";
import Footer from "../HeaderComponents/Footer";


const MatchItemReport = () => {

    let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  const showAllMatchItems = async () => {
    try {
      const res = await getAllMatchItem();
      setItemList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching match items", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRole();
        const userRole = res.data;
        setRole(userRole);

        // 🔒 ADMIN ONLY
        if (userRole === "Admin") {
          await showAllMatchItems();
        } else {
          navigate("/");
        }

      } catch (error) {
        console.error("Error fetching role", error);
      }
    };
     fetchData();
  }, []);

  const returnBack = () => {
    navigate("/AdminMenu");
  };

  return (
    // <div>MatchItemReport</div>

     <div
      style={{
        background: "linear-gradient(to right, #fde7e7, #e9ffd9)",
        minWidth: "99vw",
        minHeight: "100vh",
      }}
    >

      <AdminHeader />

      <div className="container text-center">

        {/* HEADER */}
        <h2 className="fw-bold mb-3 mt-4" style={{ color: "#b00000" }}>
          Admin Match Item Report
        </h2>

        <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "red" }} />

        {/* CARD GRID */}
        <div className="row g-4 mt-4">
          {itemList.map((item, index) => (
            <div
              key={`${item.found_item_id}-${index}`}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card shadow-sm border-0 h-100 p-2">

                {/* HEADER */}
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-success rounded-circle me-2">
                    ✔
                  </span>
                  <div className="text-start">
                    <strong>{item.item_name}</strong>
                    <br />
                    <small className="text-muted">Matched Item</small>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="mt-1 text-start px-1">
                  <h6 className="fw-bold mb-1">Details</h6>

                  <small className="d-block">
                    <strong>Found Item ID:</strong> {item.matchItemId?.foundItemId}
                  </small>
                  <small className="d-block">
                    <strong>Lost Item ID:</strong> {item.matchItemId?.lostItemId}
                  </small>
                  <small className="d-block">
                    <strong>Item Name:</strong> {item.itemName}
                  </small>
                  <small className="d-block">
                    <strong>Category:</strong> {item.category}
                  </small>
                  <small className="d-block">
                    <strong>Lost User:</strong> {item.lostUsername}
                  </small>
                  <small className="d-block">
                    <strong>Found User:</strong> {item.foundUsername}
                  </small>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* RETURN */}
        <button onClick={returnBack} className="btn btn-success mt-4">
          Return
        </button>

      </div>

      <Footer />
    </div>

  )
}

export default MatchItemReport