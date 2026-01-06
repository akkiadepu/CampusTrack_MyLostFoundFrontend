
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../Services/LoginService";

const StudentHeader = () => {

    let navigate=useNavigate(); 
      const handleLogout = () => { 
        logoutUser() .then(() => { 
          localStorage.clear(); sessionStorage.clear(); navigate('/'); 
        }) 
      };

  return (

     <nav className="navbar navbar-expand-lg navbar-light bg-transparent shadow-sm px-4 py-3">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <strong>I FOUND</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/StudentMenu">Home</a></li>
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/StudentProfile">Student Profile</a></li>
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/chat-msg">Chatting</a></li>
              
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/found-entry">Found Item Form Submission</a></li>
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/found-report">Found Item Report</a></li>
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/lost-entry">Lost Item Form Submission</a></li>
              <li className="nav-item mx-2"><a className="nav-link text-dark" href="/lost-report">Lost Item Report</a></li>
              {/* <li className="nav-item mx-2"><a className="nav-link" href="#">Profile</a></li> */}
            </ul>
            <button className="btn btn-outline-dark ms-3" onClick={handleLogout}>Log Out</button>
          </div>
        </nav>
  )
}

export default StudentHeader