

import React from 'react'
import { useNavigate } from 'react-router-dom';

import StudentHeader from "../HeaderComponents/StudentHeader";

const StudentMenu = () => {

    const navigate = useNavigate();

  return (
      <>
      <div
        className=" vh-100 vw-100"
        style={{

          background: "linear-gradient(90deg, #ffe9e9, #eefddf)",
        }}
      >
        {/* ===== NAVBAR ===== */}
        <StudentHeader />

        {/* ===== HERO SECTION ===== */}
        <div
          className="container-fluid d-flex align-items-center justify-content-center text-center p-5"
          style={{
            minHeight: "80vh",

          }}
        >
          <div className="row w-100 align-items-center">
            <div className="col-md-6 text-md-start text-center px-4">

              <h1 className="display-4 fw-bold">Find & Recover</h1>
              <h1 className="display-4 fw-bold text-success">With Ease</h1>
              <p className="mt-3 text-muted">
                Experience effortless recovery with our dedicated lost and found service.
              </p>

              <div className="d-flex gap-3 justify-content-md-start justify-content-center mt-4">
                <button className="btn btn-danger btn-lg px-5 py-3" onClick={() => navigate("/lost-report")}>Lost List</button>
                <button className="btn btn-success btn-lg px-5 py-3" onClick={() => navigate("/found-report")}>Found List</button>
              </div>
            </div>

            <div className="col-md-6 text-center mt-5 mt-md-0">
              <div className="d-flex justify-content-center flex-wrap gap-3">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D" alt="img1" className="rounded shadow" style={{ width: "180px", height: "120px", objectFit: "cover" }} />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFsDn-AY8iUQYG29I24NkyaUw6gp8O_Md9YQ&s" alt="img2" className="rounded shadow" style={{ width: "180px", height: "120px", objectFit: "cover" }} />
                <img src="https://images.pexels.com/photos/8828681/pexels-photo-8828681.jpeg" alt="img3" className="rounded shadow" style={{ width: "180px", height: "120px", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default StudentMenu