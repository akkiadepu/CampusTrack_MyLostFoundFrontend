
import React, { useState, useEffect } from 'react'

import { getLostItemById } from '../../Services/LostItemService'
import { getFoundItemByLostItem, getAllFoundItems } from '../../Services/FoundItemService'

import { useNavigate, useParams, Link } from 'react-router-dom'
import { saveMatchItem, getMatchedFoundItems } from '../../Services/MatchItemService'
import StudentHeader from '../HeaderComponents/StudentHeader'
import Footer from '../HeaderComponents/Footer'
import AdminHeader from '../HeaderComponents/AdminHeader'


// const MatchItemSearch = () => {


//     let navigate = useNavigate();
//     const param = useParams();

//     const [lostItem, setLostItem] = useState({

//         lostItemId: "",
//         lostItemName: "",
//         color: "",
//         brand: "",
//         category: "",
//         location: "",
//         username: "",
//         lostDate: "",
//         status: false,

//     });

//     const [foundItemDTOList, setfoundItemDTOList] = useState([]);

//     const showFoundItems = () => {
//         getLostItemById(param.pid).then((response) => {
//             setLostItem(response.data);
//         });
//         getFoundItemByLostItem(param.pid).then((response) => {
//             setfoundItemDTOList(response.data);
//         });
//     }

//     useEffect(() => {
//         showFoundItems();
//     }, []);

//     const returnBack = () => {
//         navigate('/lost-report')
//     }



//     return (

//         <div>
//             MatchItemSearch

//         </div>
//     )
// }

// export default MatchItemSearch


const MatchItemSearch = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [lostItem, setLostItem] = useState(null);
  const [matchedFoundItems, setMatchedFoundItems] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  // const normalize = (str) => str?.trim().toLowerCase();
  //   const loadData = async () => {
  //     // const lostRes = await getLostItemById(pid);
  //     // const foundRes = await getAllFoundItems();

  //     // setLostItem(lostRes.data);
  //      const lostRes = await getLostItemById(pid);
  //   const matchRes = await getMatchedFoundItems(pid);

  //   setLostItem(lostRes.data);
  //   setMatchedFoundItems(matchRes.data);

  //     // 🔍 FRONTEND MATCHING LOGIC
  //     // const matches = foundRes.data.filter(found =>
  //     //   found.category === lostRes.data.category &&
  //     //   found.itemName?.toLowerCase() === lostRes.data.lostItemName?.toLowerCase() &&
  //     //   !found.status
  //     // );

  //     console.log("LOST ITEM:", lostRes.data);
  // console.log("FOUND ITEMS:", foundRes.data);

  //     // const normalize = (str) => str?.trim().toLowerCase();


  // // const matches = foundRes.data.filter(found =>
  // //   normalize(found.category) === normalize(lostRes.data.category) &&
  // //   normalize(found.itemName || found.foundItemName)
  // //     .includes(normalize(lostRes.data.lostItemName)) &&
  // //   found.status === false

  // // );
  //     // setMatchedFoundItems(matches);

  //     const matches = foundRes.data.filter(found => {
  //     let matchCount = 0;

  //     if (
  //       normalize(found.itemName || found.foundItemName)
  //         ?.includes(normalize(lostRes.data.lostItemName))
  //     ) matchCount++;

  //     if (normalize(found.category) === normalize(lostRes.data.category))
  //       matchCount++;

  //     if (normalize(found.color) === normalize(lostRes.data.color))
  //       matchCount++;

  //     if (normalize(found.brand) === normalize(lostRes.data.brand))
  //       matchCount++;

  //     if (normalize(found.location) === normalize(lostRes.data.location))
  //       matchCount++;

  //     return matchCount >= 3 && found.status === false;
  //   });

  //   console.log("SMART MATCH RESULTS:", matches);
  //   setMatchedFoundItems(matches);


  //   };

  const loadData = async () => {
    try {
      const lostRes = await getLostItemById(pid);
      const matchRes = await getMatchedFoundItems(pid);

      console.log("LOST ITEM:", lostRes.data);
      console.log("MATCHED FOUND ITEMS:", matchRes.data);

      setLostItem(lostRes.data);
      setMatchedFoundItems(matchRes.data);
    } catch (err) {
      console.error("Error loading match data", err);
    }
  };


  const collectItem = (foundItem) => {
    const matchItemDTO = {
      lostItemId: lostItem.lostItemId,
      foundItemId: foundItem.foundItemId,
      itemName: lostItem.lostItemName,
      category: lostItem.category,
      lostUserName: lostItem.username,
      foundUserName: foundItem.username
    };

    saveMatchItem(matchItemDTO).then(() => {
      alert("Item Matched Successfully ✅");
      navigate("/lost-report");
    });
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #fde7e7, #e9ffd9)",
      minWidth: "99vw",
      minHeight: "100vh"

    }}>
      <StudentHeader />
      <div className="container mt-4"
      >

        <h3 className="text-danger fw-bold">Matching Found Items</h3>


        {matchedFoundItems.length === 0 && (
          <p className="text-muted mt-3">No matching found items available.</p>
        )}

        <div className="row mt-3">
          {/* {matchedFoundItems.map(found => ( */}
          {Array.isArray(matchedFoundItems) && matchedFoundItems.map(found => (
            <div key={found.foundItemId} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h6 className="fw-bold">FoundItem: {found.foundItemName}</h6>

                <small>Category: {found.category}</small>
                <small>Color: {found.color}</small>
                <small>Brand: {found.brand}</small>
                <small>Location: {found.location}</small>
                <small>User: {found.username}</small>

                {/* <button
                className="btn btn-success btn-sm mt-3"
                onClick={() => collectItem(found)}
              >
                Collect
              </button> */}
                <button
                  disabled={found.status === true}
                  className="btn btn-success btn-sm mt-3"
                  onClick={() => collectItem(found)}
                >
                  {found.status ? "Collected" : "Collect"}
                </button>

              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          Back
        </button>


      </div>
      <Footer />
    </div>
  );
};

export default MatchItemSearch;
