
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import Footer from "../HeaderComponents/Footer";

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [wrongUsername, setWrongUsername] = useState("");
  const [wrongPassword, setWrongPassword] = useState("");

  let navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

   const validateLogin = (e) => {
    e.preventDefault();
    validateUser(loginData.username, loginData.password).then((response) => {
      let role = String(response.data);

      setWrongUsername("");
      setWrongPassword("");

      sessionStorage.setItem("username", loginData.username);
      console.log(loginData.username);
      sessionStorage.setItem("role", role);

      if (role === "Admin") {
        // alert("Admin");
        navigate('/AdminMenu');

      }
      else if (role === "Student") {

        // alert("Student");
        navigate('/StudentMenu');

      }
      else
        // alert("Wrong Userid/Password");
        if (loginData.username.trim() !== "") {
          setWrongUsername("Wrong Username");
        }
        if (loginData.password.trim() !== "") {
          setWrongPassword("Wrong Password");
        }
    });
  }

   const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setLoginData(values => ({ ...values, [name]: value }));

     if (name === "username") setWrongUsername("");
    if (name === "password") setWrongPassword("");

  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    setWrongUsername("");
    setWrongPassword("");

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      validateLogin(event);
    }
  };

  const registerNewUser = (e) => {
    navigate('/Register');
  }

  return (
    <div
      className="container-fluid p-0 m-0 w-100 h-100 d-flex flex-column"
      style={{
        minHeight: "100vh",
        minWidth: "99vw",
        background: "linear-gradient(90deg, #ffe9e9, #eefddf)",
      }}
    >
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
        </div>
      </nav>


      {/* Main Section */}
      <div className="row w-100 m-0 flex-grow-1 mt-3">
        {/* Left Image Section */}
        <div className="col-12 col-lg-7 pe-5 d-flex justify-content-center align-items-center">
          <div className="position-relative w-100">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D"
              alt="Laptop"
              className="img-fluid rounded shadow w-80 "
              style={{ height: "70vh", objectFit: "cover" }}
            />

            {/* Welcome Box */}
            <div
              className="position-absolute top-50 start-50 translate-middle text-white p-4 rounded"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid #fff",
                width: "70%",
              }}
            >
              <h4 className="fw-bold mb-3">
                Welcome to Our Lost and Found Website!
              </h4>
              <p>
                We're excited to help you find and recover lost items easily.
                Report lost belongings, search for found items, and connect with
                others.
              </p>
              <p>Your convenience and safety are our priority.</p>
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="col-12 col-lg-5 p-4 d-flex justify-content-center align-items-center">
          <div
            className="p-4 rounded shadow"
            style={{
              width: "100%",
              maxWidth: "420px",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <h3 className="fw-bold text-center mb-4">Login</h3>

            <label className="fw-semibold">User Name</label>
            <input
              type="text"
              className="form-control mb-3"
              name="username"
              value={loginData.username}
              onChange={onChangeHandler}
              placeholder="Enter user name"

            />
           
             {errors.username && (
              <p className="text-danger">{errors.username}</p>
            )}
            {wrongUsername && (
              <p className="text-danger">{wrongUsername}</p>
            )}

            <label className="fw-semibold">Password</label>
            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Enter password"
              />
        
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
                {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
            {wrongPassword && (
              <p className="text-danger">{wrongPassword}</p>
            )}

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-dark px-4" onClick={handleValidation}>Submit</button>
              <button className="btn btn-outline-dark px-4" onClick={(e) => registerNewUser(e)}>Register New User</button>
            </div>

            <div className="text-center mt-3">
            </div>
          </div>
        </div>
      </div>


      <Footer />

    </div>
  )
}

export default LoginPage