
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUserId } from "../../Services/LoginService";

import { generateId, saveFoundItem } from "../../Services/FoundItemService";

import Footer from "../HeaderComponents/Footer";
import StudentHeader from "../HeaderComponents/StudentHeader";

const FoundItemEntry = () => {

     let navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [foundItem, setFoundItem] = useState({
        foundItemId: "",
        foundItemName: "",
        color: "",
        brand: "",
        category: "",
        location: "",
        username: "",
        foundDate: new Date(),
        status: false
    });

    const [newId, setNewId] = useState("");
    const [fdate, setFdate] = useState(new Date());
    const [userId, setUserId] = useState("");

    const setFoundItemId = () => {
        generateId().then(response => {
            setNewId(response.data);
        });
    };

     const setUsername = () => {
        getUserId().then(response => {
            setUserId(response.data);
        });
    }

    useEffect(() => {
        setFoundItemId(); setUsername();
    }, []);

    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setFoundItem(values => ({ ...values, [name]: value }));
    };

    // const foundItemSubmit = (event) => {
    //     event.preventDefault(); 
    //     foundItem.foundItemId = newId; foundItem.username = userId; foundItem.lostDate = fdate;

    //     saveFoundItem(foundItem).then(response => {
    //         alert("found Item Form Submitted Successfully....");
    //         navigate('/StudentMenu');
    //     });
    // }


//     const foundItemSubmit = async (event) => {
//   event.preventDefault();

//   // 🔥 ALWAYS GET A FRESH ID BEFORE SAVE
//   const idRes = await generateId();
//   const freshId = idRes.data;

//   const payload = {
//     ...foundItem,
//     foundItemId: freshId,
//     username: userId,
//     foundDate: fdate,
//     status: false
//   };

//   saveFoundItem(payload).then(() => {
//     alert("Found Item Form Submitted Successfully ✅");

//     // Reset form
//     setFoundItem({
//       foundItemId: "",
//       foundItemName: "",
//       color: "",
//       brand: "",
//       category: "",
//       location: "",
//       username: "",
//       foundDate: new Date(),
//       status: false
//     });

//     navigate("/StudentMenu");
//   });
// };

// const foundItemSubmit = async (event) => {
//   event.preventDefault();

//   // 🔥 Get fresh ID
//   const idRes = await generateId();
//   const freshId = idRes.data;

//   // 🔥 Get the logged-in username from localStorage
//   const username = localStorage.getItem("username"); // set this at login

//   // 🔥 Build payload
//  const payload = {
//   ...foundItem,
//   foundItemId: freshId,
//   username: localStorage.getItem("username"),
//   foundDate: fdate,
//   status: false
// };

// saveFoundItem(payload)
//     .then(() => {
//       alert("Found Item Form Submitted Successfully ✅");

//       // Reset form
//       setFoundItem({
//         foundItemId: "",
//         foundItemName: "",
//         color: "",
//         brand: "",
//         category: "",
//         location: "",
//         username: "",
//         foundDate: new Date(),
//         status: false
//       });

//       navigate("/StudentMenu");
//     })
//     .catch(err => {
//       console.error("Error saving item", err);
//     });
// };

const foundItemSubmit = async (event) => {
  event.preventDefault();

  const idRes = await generateId();
  const freshId = idRes.data;

  const storedUsername = sessionStorage.getItem("username");
console.log("USERNAME SENT 👉", storedUsername);

  const payload = {
    foundItemId: freshId,
    foundItemName: foundItem.foundItemName,
    color: foundItem.color,
    brand: foundItem.brand,
    category: foundItem.category,
    location: foundItem.location,
    username: storedUsername,   // 🔥 MUST BE HERE
    foundDate: fdate,
    status: false
  };

  saveFoundItem(payload)
    .then(() => {
      alert("Found Item Submitted ✅");
      navigate("/StudentMenu");
    })
    .catch(err => console.error(err));
};



    const handleValidation = (event) => {
        event.preventDefault(); 
        let tempErrors = {}; 
        let isValid = true;
        if (!foundItem.foundItemName.trim()) { 
            tempErrors.foundItemName = "Item Name is required"; isValid = false; 
        }
        if (!foundItem.color.trim()) { 
            tempErrors.color = "Item color is required"; isValid = false; 
        }
        if (!foundItem.brand.trim()) { 
            tempErrors.brand = "Item brand is required"; isValid = false; 
        }
        if (!foundItem.category.trim()) {
             tempErrors.category = "Item category is required"; isValid = false; 
            }
        if (!foundItem.location.trim()) {
             tempErrors.location = "Lost Location is required"; isValid = false; 
            }
        setErrors(tempErrors);
        if (isValid) { foundItemSubmit(event); }
    };

    const returnBack = () => { 
        navigate("/StudentMenu"); 
    }


  return (
    <>
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
          Found Item Form Submission
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
          <form >
            {/* Lost Item ID */}
            <div className="mb-3">
              <label className="form-label fw-bold">Found Item ID :</label>
              <input
                name="foundItemId"
                className="form-control"
                value={newId}
                readOnly
              />
            </div>

            {/* Item Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Item Name :</label>
              <input
                name="foundItemName"
                className="form-control"
                value={foundItem.foundItemName}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.foundItemName && (
                <p style={{ color: "red" }}>{errors.foundItemName}</p>
              )}
            </div>

            {/* category */}
            <div className="mb-3">
              <label className="form-label fw-bold">category :</label>
              <input
                name="category"
                className="form-control"
                value={foundItem.category}
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
                value={foundItem.color}
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
                value={foundItem.brand}
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
                value={foundItem.location}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.location && (
                <p style={{ color: "red" }}>{errors.location}</p>
              )}
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label fw-bold">Found Date :</label>
              <input
                type="date"
                placeholder="yyyy-mm-dd"
                className="form-control"
                value={fdate}
                onChange={(event) => setFdate(event.target.value)}
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
        </div>

        <Footer/>
      </div>
    </>

  )
}

export default FoundItemEntry