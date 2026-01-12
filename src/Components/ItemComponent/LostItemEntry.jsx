
import { useNavigate } from 'react-router-dom';
import { getUserId } from "../../Services/LoginService";
import React, { useState, useEffect } from "react";
import { generateId, saveLostItem } from "../../Services/LostItemService";
import Footer from '../HeaderComponents/Footer';
import StudentHeader from '../HeaderComponents/StudentHeader';

const LostItemEntry = () => {
 
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false
  });

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const setLostItemId = () => {
    generateId().then(response => {
      setNewId(response.data);
    });
  };

  const setUsername = () => { getUserId().then(response => { setUserId(response.data); }); }

  useEffect(() => { setLostItemId(); setUsername(); }, []);

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setLostItem(values => ({ ...values, [name]: value }));
  };

  // const lostItemSubmit = (event) => {
  //   event.preventDefault();
  //   lostItem.lostItemId = newId;
  //   lostItem.username = userId;
  //   lostItem.lostDate = ldate;
  //   saveLostItem(lostItem).then(response => { 
  //     alert("Lost Item Form Submitted Successfully...."); 
  //     navigate('/StudentMenu'); 
  //   });
  // }

  const lostItemSubmit = async (event) => {
    event.preventDefault();
  
    const idRes = await generateId();
    const freshId = idRes.data;
  
    const storedUsername = sessionStorage.getItem("username");
  console.log("USERNAME SENT 👉", storedUsername);
 
    const payload = {
      lostItemId: freshId,
      lostItemName: lostItem.lostItemName,
      color: lostItem.color,
      brand: lostItem.brand,
      category: lostItem.category,
      location: lostItem.location,
      username: storedUsername,   // 🔥 MUST BE HERE
      lostDate: ldate,
      status: false
    };
  
    saveLostItem(payload)
      .then(() => {
        // alert("lost Item Submitted ✅");
        navigate("/StudentMenu");
      })
      .catch(err => console.error(err));
  };

   const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }
    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }
    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    setErrors(tempErrors);
    if (isValid) {
      lostItemSubmit(event);
      setSuccessMessage("lost Item Submitted ✅... ");

    }else {
       setSuccessMessage("");
    }
  };

  const returnBack = () => { 
    navigate("/StudentMenu"); 
}


  return (
     <>
      <div>
      </div>

      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          background: "linear-gradient(90deg, #ffddd9, #f1ffe1)",

          minWidth: "99vw",
          minHeight: "100vh"
        }}
      >
       <StudentHeader/>

        {/* Title */}
        <h1 className="text-center mt-3 mb-4 fw-bold" style={{ color: "#590000" }}>
          Lost Item Form Submission
        </h1>

        {/* Form Card */}
        <div
          className="card p-4 shadow-lg"
          style={{
            width: "80%",
            maxWidth: "400px",
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
          }}
        >
          <form>
            {/* Lost Item ID */}
            <div className="mb-3">
              <label className="form-label fw-bold">Lost Item ID :</label>
              <input
                name="lostItemId"
                className="form-control"
                value={newId}
                readOnly
              />
            </div>

            {/* Item Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Item Name :</label>
              <input
                name="lostItemName"
                className="form-control"
                value={lostItem.lostItemName}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.lostItemName && (
                <p style={{ color: "red" }}>{errors.lostItemName}</p>
              )}
            </div>

            {/* category */}
            <div className="mb-3">
              <label className="form-label fw-bold">category :</label>
              <input
                name="category"
                className="form-control"
                value={lostItem.category}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.category && (
                <p style={{ color: "red" }}>{errors.category}</p>
              )}
            </div>

            {/* color */}
            <div className="mb-3">
              <label className="form-label fw-bold">color :</label>
              <input
                name="color"
                className="form-control"
                value={lostItem.color}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.color && (
                <p style={{ color: "red" }}>{errors.color}</p>
              )}
            </div>

            {/* brand  */}
            <div className="mb-3">
              <label className="form-label fw-bold">brand :</label>
              <input
                name="brand"
                className="form-control"
                value={lostItem.brand}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.brand && (
                <p style={{ color: "red" }}>{errors.brand}</p>
              )}
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label fw-bold">Location :</label>
              <input
                name="location"
                className="form-control"
                value={lostItem.location}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.location && (
                <p style={{ color: "red" }}>{errors.location}</p>
              )}
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label fw-bold">Lost Date :</label>
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                className="form-control"
                value={ldate}
                onChange={(event) => setLdate(event.target.value)}
              />
            </div>

            {/* Submit + Reset */}
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-success px-4" type="submit" onClick={handleValidation}>
                Submit
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="reset"
                className="btn btn-dark px-4"
                onClick={returnBack}
              >
                Return
              </button>
            </div>
          </form>
             {/* <br/>
              <div>
              {flag && <p style={{ color: "blue" }}>Lost Item Form Submitted..... <button className='btn btn-warning' onClick={nextItem}>New Form Submission</button></p>}
              </div> */}
           {successMessage && (
        <div className="alert alert-success mt-3 text-center">
          {successMessage}
        </div>
      )}

        </div>
       <Footer/>

      </div>
    </>

  )
}

export default LostItemEntry